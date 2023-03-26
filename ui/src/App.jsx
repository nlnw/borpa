import { useState } from "react";
import optimismLogo from "./assets/op.svg";
import arbitrumLogo from "./assets/arb.svg";
import borpa from "./assets/borpa.gif";
import "./App.css";
import { Polybase } from "@polybase/client";
import { PolybaseProvider, useDocument, usePolybase } from "@polybase/react";

export const Component = () => {
  const polybase = usePolybase();
  const { data, error, loading } = useDocument(
    polybase.collection("City").record("boston")
  );
  console.log(data?.data?.name);
  return <div>{data?.data?.name}</div>;
};

function App() {
  const [count, setCount] = useState(0);
  const polybase = new Polybase({
    defaultNamespace: "borpaz",
  });
  return (
    <PolybaseProvider polybase={polybase}>
      <div className="App">
        <div>
          <img src={optimismLogo} className="logo" alt="Optimism logo" />
          <img src={borpa} className="logo" alt="Borpa" />
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
          Seamless trade <span style={{ color: "lightskyblue" }}>ARB</span> or{" "}
          <span style={{ color: "red" }}>OP</span> across L2's
        </h2>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <Component />
      </div>
    </PolybaseProvider>
  );
}

export default App;
