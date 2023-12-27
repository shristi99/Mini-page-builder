import React, { useState } from "react";
import "../styles/DraggableButton.css"; // Import the external styles

export default function DraggableButton({ title, onDragStart }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className={`my-custom-class ${isDragging ? 'grabbing' : 'grab'}`} draggable onDragStart={(e) => {
        setIsDragging(true);
        onDragStart(title);
      }} onDragEnd={() => setIsDragging(false)}>
      <img
        src="/ic_grip_vertical.svg"
        alt="Drag"
        className="w-4 h-7"
        draggable="false"
      />
      <span className="font-normal text-base ml-3">{title}</span>
    </div>
  );
}
