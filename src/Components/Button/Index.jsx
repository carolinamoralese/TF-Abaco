import React from 'react';

export function CreateButton({ colorClass, selected, onClick, text }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg p-2 ${colorClass} ${selected ? 'font-bold text-xl' : 'font-normal'}`}
    >
      {text}
    </button>
  );
}
