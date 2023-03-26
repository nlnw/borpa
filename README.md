# bOrPa: Trade ARB and OP across L2's

## Overview

This demo app uses [Connext xCall](https://docs.connext.network) and [Polybase](https://polybase.xyz) to offer simple non-1:1 trading of different tokens across different chains.

## How it works

**Example**: User 1 wants is on [Arbitrum](https://arbitrum.foundation/) and wants to trade their airdropped [$ARB](https://www.coingecko.com/en/coins/arbitrum) tokens for [$OP](https://www.coingecko.com/en/coins/optimism) tokens on the [Optimism](https://www.optimism.io/) chain.

1. User 1 posts an offer on to trade ARB for OP (chain 1 to chain 2). This is published on Polybase.
2. User 1 interacts with the smart contract on chain 1 and locks ARB tokens into it.
3. User 2 sees the list and wants to make the trade.
4. User 2 interacts with the smart contract on chain 2 and locks OP tokens into it. The contract does a Connext xcall and unlocks ARB tokens on chain 1 and sends them to User 2.
5. User 1 interacts with the smart contract on chain 1, which does a Connext xcall and unlocks the OP tokens on chain 2 and sends them to User 1.
6. The trade is closed and removed from Polybase.

## Deployment

This app is deployed on the following chains:

- Goerli (0x8fc527bb75b0E3F2e0C0fE0114C912F4bF26C714)
- Optimism-Goerli (0x72Ed34752d85e172c241F00928b194A6B31e7Caa)
- Arbitrum-Goerli (0x1A9f9374F3f56e60B6CadEeEb2C34f991E5A507B)
- Scroll-Testnet (0x1A9f9374F3f56e60B6CadEeEb2C34f991E5A507B) ([Connext](https://docs.connext.network/resources/supported-chains) supported to be added)
