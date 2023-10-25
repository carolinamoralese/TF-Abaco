import React from 'react';

export function CreateButton({ colorClass, selected, onClick, text }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl p-2 ${colorClass} ${selected ? 'font-bold text-xl' : 'font-normal'}`}
    >
      {text}
    </button>
  );
}
