import {
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import LoginPhoto from "../assets/BREAKPONIT.png";
import AbacoLogo from "../assets/Abaco_logo.png";
import GFBLogo from "../assets/GFBLogo.png";
import LogosAsociados from "../assets/LogosAsociados.png";
import { obtenerUsuarios } from "../servicios/servicios";

export function Login() {
  const [usuarioCorreo, setUsuarioCorreo] = useState("")
  const [usuarioRol, setUsuarioRol] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('usuarioRol');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión', error);
      });
  };
  

  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      obtenerUsuarios()
      .then((usuarios) => {
        let usuarioLogueado = usuarios.filter(usuario => usuario.Correo === user.email)
        if(usuarioLogueado.length >= 1){
          console.log("ingreso")
          setUsuarioCorreo(usuarioLogueado[0].Correo)
          setUsuarioRol(usuarioLogueado[0].DescripcionRol)
          localStorage.setItem('usuarioRol', usuarioLogueado[0].DescripcionRol);
          localStorage.setItem('userEmail', user.email);
          setIsLoggedIn(true); 
        }else{
          handleLogout()
          console.log("salio")
        }
      })
      .catch((error) => {
        console.error(error);
      });
    } catch (error) {
      console.error('Error de inicio de sesión con Google:', error);
    }
  };

  return (
<main className="text-[1.25rem] flex flex-col">
  <div className="mx-auto max-w-screen-xl">
    <section id="seccionImagen" className="mb-[100px] ml-14 mr-14">
      <img src={LoginPhoto} alt="LoginPhoto" className="w-screen" />
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
      <img src={LogosAsociados} alt="logos Asociados"></img>
    </section>
  </div>
</main>
  );
}
