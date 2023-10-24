import { useState } from "react";
import Layout from "../Components/Layout/Index";
import { CreateButton } from "../Components/Button/Index";
import { DonationInformation } from "../Components/DonationInformation/Index";
import Group from "../assets/Group.png";


export function Certificate() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  //Peticion a la api para mostrar los documentos


  const certificateStyle = {
    backgroundImage: `url(${Group})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "80%",
    marginTop: "-10%",
    height: "400px"
  };
  

  return (

      <div style={certificateStyle} className="relative mt-0 flex flex-col items-center ml-40">
        <div className="flex justify-center"> {/* Usa flex y justify-center para centrar horizontalmente */}
          <div className="mr-4">
            <CreateButton
              colorClass="bg-naranja h-20"
              selected={selectedOption === "Pendientes"}
              onClick={() => handleButtonClick("Pendientes")}
              text="Pendientes"
            ></CreateButton>
          </div>
          <div className="mr-4">
            <CreateButton
              colorClass="bg-verde-claro h-20"
              selected={selectedOption === "Aceptadas"}
              onClick={() => handleButtonClick("Aceptadas")}
              text="Aceptadas"
            ></CreateButton>
          </div>
          <div className="mr-4">
            <CreateButton
              colorClass="bg-amarillo h-20"
              selected={selectedOption === "Firmadas"}
              onClick={() => handleButtonClick("Firmadas")}
              text="Firmadas"
            ></CreateButton>
          </div>
          <div className="mr-4">
            <CreateButton
              colorClass="bg-gris-oscuro h-20"
              selected={selectedOption === "Rechazadas"}
              onClick={() => handleButtonClick("Rechazadas")}
              text="Rechazadas"
            ></CreateButton>
          </div>
        </div>
        <div>
          <DonationInformation></DonationInformation>
        </div>
      </div>
    
  );
}
