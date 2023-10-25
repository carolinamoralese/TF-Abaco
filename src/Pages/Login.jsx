import { CreateButton } from "../Components/Button/Button"
import LoginPhoto from "../assets/loginPhoto.png";
import AbacoLogo from "../assets/Abaco_logo.png";
import GFBLogo from "../assets/GFBLogo.png";
import LogosAsociados from "../assets/LogosAsociados.png";

export function Login() {
  return (
    <main className="text-[1.25rem] flex flex-col">
      <section id="seccionImagen" className="mb-[100px] ">
        <img src={LoginPhoto} alt="LoginPhoto" className="w-[100%] h-[25vh]" />
        <div className="flex place-content-around flex items-center">
        <img src={GFBLogo} alt="LoginPhoto" className="w-[20%] h-[auto]" />
        <p className="text-gris-oscuro font-bold">Plataforma ABACO</p>
        <img  src={AbacoLogo} alt="abacoLogo" className="w-[20%] h-[20%]"
        ></img>
        </div>
      </section>
      <section id="seccionContenido" className="flex items-center flex-col">
        <p className="text-gris-oscuro font-bold text-left">Autenticación</p>
        <div id="linea" className="w-[90%] h-[2px] mb-[20px] bg-negro"></div>
        <div className="bg-grisMuyClaro px-[84px] h-[250px] w-[80%] md:w-[50%] rounded-[150px] m-[5px] flex justify-center items-center grid grid-cols-5 grid-rows-3 gap-y-[5px] gap-x-[10px]">
          <div id="celda1">
            <p className="mr-[10px] text-verde-oscuro font-bold">Usuario:</p>
          </div>
          <div className="col-span-2" id="celda2">
            <input type="text" placeholder="Juaniata Pérez" />
          </div>
          <div className="col-span-2 " id="celda3"></div>
          <div id="celda4" className="text-verde-oscuro font-bold">
            <p>Clave:</p>
          </div>
          <div className="col-span-2" id="celda5">
          <input type="password" placeholder="Contraseña" />
          </div>
          <div className="col-span-2" id="celda6">
            <p>¿Olvidó su clave?</p>
          </div>
          <div id="celda7"></div>
          <div className="col-span-2" id="celda8">
            <p>Registrarse como empresa</p>
          </div>
          <div className="col-span-2" id="celda9">
            <p>Registrarse como independiente</p>
          </div>
        </div>
        <CreateButton
              colorClass="bg-verde-claro  h-[100px] w-[300px]"
              text="Login"
            ></CreateButton>
        <img src={LogosAsociados} alt="logos Asociados"></img>
      </section>
    </main>
  );
}