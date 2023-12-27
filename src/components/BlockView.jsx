// BlockView.js
import React from 'react';
import '../styles/BlockView.css'; // Import the external styles

export function BlockView({ block }) {
  const { title, labelText, fontSize, fontWeight } = block;

  switch (title) {
    case 'Input':
      return (
        <input
          className={`block input-block`}
          style={{ fontSize: `${fontSize / 16}rem`, fontWeight: `${fontWeight}` }}
          type="text"
          placeholder={labelText}
        />
      );
    case 'Button':
      return (
        <div className={`block button-block`} style={{ fontSize: `${fontSize / 16}rem`, fontWeight: `${fontWeight}` }}>
          {labelText}
        </div>
      );
    default:
      return (
        <span className={`block default-block`} style={{ fontSize: `${fontSize / 16}rem`, fontWeight: `${fontWeight}` }}>
          {labelText}
        </span>
      );
  }
}
