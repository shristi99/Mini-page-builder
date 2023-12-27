import { createContext, useEffect, useState } from "react";

export const BlocksContext = createContext();

export function BlocksContextProvider({ children }) {
  const [blocksData, setBlocksData] = useState({
    currDragTitle: undefined,
    currDragBlock: undefined,
    undoObject: [],
    blocks: [],
  });

  useEffect(() => {
    const blocks = localStorage.getItem("blocks");
    if (blocks !== null) {
      setBlocksData({
        currDragTitle: undefined,
        currDragBlock: undefined,
        blocks: JSON.parse(blocks),
        undoObject: [],
      });
    }
  }, []);

  useEffect(() => {
    if (blocksData.blocks.length > 0)
      localStorage.setItem("blocks", JSON.stringify(blocksData.blocks));
  }, [blocksData]);

  return (
    <BlocksContext.Provider value={{ blocksData, setBlocksData }}>
      {children}
    </BlocksContext.Provider>
  );
}