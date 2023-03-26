import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
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
