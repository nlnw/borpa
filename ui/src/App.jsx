import { Auth } from "@polybase/auth";
import { Polybase } from "@polybase/client";
import {
  AuthProvider,
  PolybaseProvider,
  useAuth,
  useDocument,
  useIsAuthenticated,
  usePolybase,
} from "@polybase/react";
import {
  ConnectKitButton,
  ConnectKitProvider,
  getDefaultClient,
} from "connectkit";
import { WagmiConfig, createClient } from "wagmi";
import { arbitrumGoerli, goerli, optimismGoerli } from "wagmi/chains";
import "./App.css";
import arbitrumLogo from "./assets/arb.svg";
import borpa from "./assets/borpa.gif";
import optimismLogo from "./assets/op.svg";

export const scrollTestnet = {
  id: 534_353,
  name: "Scroll Testnet",
  network: "scroll-testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://alpha-rpc.scroll.io/l2"],
      webSocket: ["wss://alpha-rpc.scroll.io/l2/ws"],
    },
    public: {
      http: ["https://alpha-rpc.scroll.io/l2"],
      webSocket: ["wss://alpha-rpc.scroll.io/l2/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.scroll.io",
    },
  },
  testnet: true,
};

export const Component = () => {
  const polybase = usePolybase();
  const { data, error, loading } = useDocument(
    polybase.collection("City").record("boston")
  );
  console.log(data?.data?.name);
  return (
    <>
      <table className="book">
        <tr>
          <th>Amount</th>
          <th>Rate</th>
          <th>Total</th>
          <th>Seller</th>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
      </table>
      <p>{data?.data?.name}</p>
    </>
  );
};

export const ComponentAuth = () => {
  const { auth, state, loading } = useAuth();
  console.log("auth", auth);

  return (
    <div>
      {!auth.state && <button onClick={() => auth.signIn()}>Sign In</button>}
      {auth.state?.type === "metamask" && (
        <>
          <button onClick={() => auth.signOut()}>Sign Out</button>
          <br />
          <div>Signed in as: {auth.state.userId}</div>
        </>
      )}
    </div>
  );
};

export const ComponentAuthState = () => {
  const [isLoggedIn, loading] = useIsAuthenticated();
  console.log("logged in", isLoggedIn);
  return <div>Is logged in: {isLoggedIn}</div>;
};

function App() {
  const chains = [goerli, optimismGoerli, arbitrumGoerli, scrollTestnet];
  const client = createClient(
    getDefaultClient({
      appName: "borpa",
      alchemyId: "_R8N0vy4fR3dCF3VtZ9ZDrQ3gDRRVktv",
      chains,
    })
  );
  const polybase = new Polybase({
    defaultNamespace: "borpaz",
  });
  const auth = new Auth();
  return (
    <PolybaseProvider polybase={polybase}>
      <AuthProvider auth={auth} polybase={polybase}>
        <WagmiConfig client={client}>
          <ConnectKitProvider theme="retro" mode="dark">
            <div className="App">
              <div>
                <img src={optimismLogo} className="logo" alt="Optimism logo" />
                <img src={borpa} className="logo" alt="borpa" />
                <img src={arbitrumLogo} className="logo" alt="Arbitrum logo" />
              </div>
              <h1>
                <span style={{ color: "lightskyblue" }}>b</span>
                <span style={{ color: "red" }}>O</span>
                <span style={{ color: "lightskyblue" }}>r</span>
                <span style={{ color: "red" }}>P</span>
                <span style={{ color: "lightskyblue" }}>a</span>
              </h1>
              <h2>
                Trade <span style={{ color: "lightskyblue" }}>ARB</span> and{" "}
                <span style={{ color: "red" }}>OP</span> across L2's
              </h2>
              <ComponentAuth />
              <Component />

              <div style={{ position: "absolute", top: "20px", right: "20px" }}>
                <ConnectKitButton />
              </div>
            </div>
          </ConnectKitProvider>
        </WagmiConfig>
      </AuthProvider>
    </PolybaseProvider>
  );
}

export default App;
