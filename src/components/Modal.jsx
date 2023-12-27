import React, { useContext, useState } from "react";
import { BlocksContext } from "../element/BlockElement";
import "../styles/Modal.css"; // Import the external styles

export default function Modal({ block, setOpenModal }) {
  const { blocksData, setBlocksData } = useContext(BlocksContext);

  const [formData, setFormData] = useState(block);

  function handleSubmit(e) {
    e.preventDefault();
    setBlocksData({
      ...blocksData,
      blocks: blocksData.blocks.map((item) => {
        if (item.id === block.id) {
          return formData;
        }
        return item;
      }),
    });
    setOpenModal(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <span>Edit {block.title}</span>
          <div
            onClick={() => {
              setOpenModal(false);
            }}
            className="cursor-pointer"
          >
            <img src="/ic_cross.svg" alt="Close Form" />
          </div>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label className="form-label">Text:</label>
            <input
              className="form-input"
              onChange={handleChange}
              type="text"
              value={formData.labelText}
              name="labelText"
            />

            <label className="form-label">X:</label>
            <input
              className="form-input"
              onChange={handleChange}
              type="number"
              value={formData.X}
              name="X"
            />

            <label className="form-label">Y:</label>
            <input
              className="form-input"
              onChange={handleChange}
              type="number"
              value={formData.Y}
              name="Y"
            />

            <label className="form-label">Font Size:</label>
            <input
              className="form-input"
              onChange={handleChange}
              type="number"
              value={formData.fontSize}
              name="fontSize"
            />

            <label className="form-label">Font Weight:</label>
            <input
              className="form-input"
              onChange={handleChange}
              type="number"
              value={formData.fontWeight}
              name="fontWeight"
            />

            <button className="form-button" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
