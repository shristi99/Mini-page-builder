import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { BlocksContext } from "../element/BlockElement";
import { BlockView } from "./BlockView";
import "../styles/DrawElementOnCanvas.css"; // Import the external styles

export default function DrawElementOnCanvas({
  block,
  selectedBlockUUID,
  setSelectedBlockUUID,
}) {
  const { title, X, Y, labelText, id } = block;
  const viewportH = window.innerHeight || document.documentElement.clientHeight;
  const viewportW = window.innerWidth || document.documentElement.clientWidth;

  const { blocksData, setBlocksData } = useContext(BlocksContext);

  const [openModal, setOpenModal] = useState(
    selectedBlockUUID && selectedBlockUUID.openModal
  );
  const [isSelected, setIsSelected] = useState(
    selectedBlockUUID && id === selectedBlockUUID.id
  );

  const divFocus = useRef(null);

  useEffect(() => {
    setIsSelected(selectedBlockUUID && id === selectedBlockUUID.id);
  }, [id, selectedBlockUUID]);

  function handleKeyDown(e) {
    if (isSelected) {
      if (e.key === "Enter") {
        setOpenModal(true);
      } else if (e.key === "Delete") {
        setSelectedBlockUUID(undefined);
        setBlocksData({
          ...blocksData,
          undoObject: [...blocksData.undoObject, block],
          blocks: blocksData.blocks.filter((item) => {
            return !(item.id === id);
          }),
        });
      }
    }
  }

  function handleDragStart() {
    setBlocksData({
      ...blocksData,
      currDragBlock: id,
    });
  }

  function handleModal(isOpen) {
    setOpenModal(isOpen);
    if (isSelected) {
      divFocus.current.focus();
    }
  }

  return (
    <>
      {openModal && <Modal block={block} setOpenModal={handleModal} />}
      <div
        ref={divFocus}
        tabIndex={0}
        role="button"
        onKeyDown={handleKeyDown}
        onDragStart={handleDragStart}
        onClick={() => {
          if (selectedBlockUUID && selectedBlockUUID.id === id) {
            setSelectedBlockUUID(undefined);
          } else setSelectedBlockUUID({ id, openModal: false });
        }}
        className={`draw-element
          ${isSelected ? "draw-element-selected" : ""}
          ${title === "Label" || title === "Button" ? `draw-element-${title.toLowerCase()}` : ""}`}
        style={{
          left: `${(X / viewportW) * 100}vw`,
          top: `${(Y / viewportH) * 100}vh`,
          outline: "none",
        }}
        draggable
      >
        <BlockView block={block} />
      </div>
    </>
  );
}
