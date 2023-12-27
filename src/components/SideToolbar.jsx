import React, { useContext } from "react";
import { draggableBtnList } from "../utils/static";
import DraggableButton from "./DraggableButton";
import { BlocksContext } from "../element/BlockElement";
import "../styles/SideToolbar.css"; // Import the external styles

export default function SideToolbar() {
  const { blocksData, setBlocksData } = useContext(BlocksContext);

  function handleExport() {
    const jsonData = JSON.stringify(blocksData.blocks);

    const url = URL.createObjectURL(
      new Blob([jsonData], { type: "application/json" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "mini-page-builder.json";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <div className="side-toolbar">
      <span className="side-toolbar-title">BLOCKS</span>
      <div className="mt-4 flex flex-col gap-2 w-full">
        {draggableBtnList.map((item, index) => {
          return (
            <DraggableButton
              title={item.title}
              onDragStart={(e) => {
                setBlocksData({ ...blocksData, currDragTitle: item.title });
              }}
              key={index}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 grid-rows-2 xl:grid-rows-1 gap-3 mt-4">
        <button
          className="toolbar-button"
          onClick={() => {
            localStorage.removeItem("blocks");
            setBlocksData({ ...blocksData, blocks: [] });
          }}
        >
          Clear Screen
        </button>
        <button className="toolbar-button" onClick={handleExport}>
          Export
        </button>
      </div>
    </div>
  );
}
