import React, { useState } from 'react';
import Layout from "../Components/Layout/Index";
import { CreateButton } from "../Components/Button/Index";

export function Certificate() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Layout>
      <p>Certificados</p>
      <div className="flex">
        <div className="mr-4">
          <CreateButton
            colorClass="bg-f58634 bg-orange-600 h-20"
            selected={selectedOption === 'Pendientes'}
            onClick={() => handleButtonClick('Pendientes')}
            text="Pendientes"
          ></CreateButton>
        </div>
        <div className="mr-4">
          <CreateButton
            colorClass="bg-8cc63f bg-green-600 h-20"
            selected={selectedOption === 'Aceptadas'}
            onClick={() => handleButtonClick('Aceptadas')}
            text="Aceptadas"
          ></CreateButton>
        </div>
        <div>
          <CreateButton
            colorClass="bg-d2de38 bg-lime-600 h-20"
            selected={selectedOption === 'Firmadas'}
            onClick={() => handleButtonClick('Firmadas')}
            text="Firmadas"
          ></CreateButton>
        </div>
      </div>
    </Layout>
  );
}
