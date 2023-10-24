// export function CreateButton({ text, onClick, colorClass }) {
//   return (
//     <button
//       className={` ${colorClass} text-black font-bold py-2 px-4 rounded`}
//       onClick={onClick}
//     >
//       {text}
//     </button>
//   );
// }

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
