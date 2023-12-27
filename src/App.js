import SideToolbar from "./components/SideToolbar";
import DropOverCanvas from "./components/DropOverCanvas";
import { BlocksContextProvider } from "./element/BlockElement";
import "./App.css"

function App() {
  return (
    <div className="container">
      <BlocksContextProvider>
        <>
          <DropOverCanvas />
          <SideToolbar />
        </>
      </BlocksContextProvider>
    </div>
  );
}

export default App;