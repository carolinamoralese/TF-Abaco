import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import { auth, provider } from "../firebase";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { obtenerUsuarios } from "../servicios/servicios";
import LoginPhoto from "../assets/loginPhoto.png";
import AbacoLogo from "../assets/Abaco_logo.png";
import GFBLogo from "../assets/GFBLogo.png";
// import LogosAsociados from "../assets/LogosAsociados.png";

export function Login() {
  const [isLogged, setIsLogged] = useState(false);


  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // El usuario ha iniciado sesión con éxito con Google
      const user = result.user;
      console.log('Inicio de sesión exitoso con Google:', user);
    } catch (error) {
      // Maneja los errores de inicio de sesión con Google
      console.error('Error de inicio de sesión con Google:', error);
    }
  };

  return (
    <main className="text-[1.25rem] flex flex-col">
      <section id="seccionImagen" className="mb-[100px] ">
        <img src={LoginPhoto} alt="LoginPhoto" className="w-[100%] h-[25vh]" />
        <div className="flex place-content-around flex items-center">
          <img src={GFBLogo} alt="LoginPhoto" className="w-[20%] h-[auto]" />
          <p className="text-gris-oscuro font-bold">Plataforma ABACO</p>
          <img
            src={AbacoLogo}
            alt="abacoLogo"
            className="w-[20%] h-[20%]"
          ></img>
        </div>
      </section>
      <section id="seccionContenido" className="flex items-center flex-col">
        <p className="text-gris-oscuro font-bold text-left">Autenticación</p>
        <div id="linea" className="w-[90%] h-[2px] mb-[20px] bg-negro"></div>
        
        <button
        className="bg-verde-claro h-[100px] w-[300px] rounded-lg"
        onClick={signInWithGoogle}
        
      >
          Login
        </button>
        {/* <img src={LogosAsociados} alt="logos Asociados"></img> */}
      </section>
    </main>
  );
}
