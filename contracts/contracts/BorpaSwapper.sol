// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BorpaSwapper is IXReceiver {
    IConnext public immutable connext;
    IERC20 public immutable token;

    uint256 public immutable slippage = 10000;

    string public greeting;

    constructor(address _connext, address _token) {
        connext = IConnext(_connext);
        token = IERC20(_token);
    }

    /** @notice Updates a greeting variable on the DestinationGreeter contract.
     * @param target Address of the DestinationGreeter contract.
     * @param destinationDomain The destination domain ID.
     * @param newGreeting New greeting to update to.
     * @param relayerFee The fee offered to relayers.
     */
    function xUpdateGreeting(
        address target,
        uint32 destinationDomain,
        string memory newGreeting,
        uint256 amount,
        uint256 relayerFee
    ) external payable {
        require(
            token.allowance(msg.sender, address(this)) >= amount,
            "User must approve amount"
        );

        // User sends funds to this contract
        token.transferFrom(msg.sender, address(this), amount);

        // This contract approves transfer to Connext
        token.approve(address(connext), amount);

        // Encode calldata for the target contract call
        bytes memory callData = abi.encode(newGreeting);

        connext.xcall{value: relayerFee}(
            destinationDomain, // _destination: Domain ID of the destination chain
            target, // _to: address of the target contract
            address(token), // _asset: address of the token contract
            msg.sender, // _delegate: address that can revert or forceLocal on destination
            amount, // _amount: amount of tokens to transfer
            slippage, // _slippage: max slippage the user will accept in BPS (e.g. 300 = 3%)
            callData // _callData: the encoded calldata to send
        );
    }

    /** @notice The receiver function as required by the IXReceiver interface.
     * @dev The Connext bridge contract will call this function.
     */
    function xReceive(
        bytes32 _transferId,
        uint256 _amount,
        address _asset,
        address _originSender,
        uint32 _origin,
        bytes memory _callData
    ) external returns (bytes memory) {
        // Check for the right token
        require(_asset == address(token), "Wrong asset received");
        // Enforce a cost to update the greeting
        require(_amount > 0, "Must pay at least 1 wei");

        // Unpack the _callData
        string memory newGreeting = abi.decode(_callData, (string));

        _updateGreeting(newGreeting);
    }

    /** @notice Internal function to update the greeting.
     * @param newGreeting The new greeting.
     */
    function _updateGreeting(string memory newGreeting) internal {
        greeting = newGreeting;
    }
}
