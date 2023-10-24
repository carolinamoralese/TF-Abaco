import LoginPhoto from "../assets/loginPhoto.png";

export function Login() {
  return (
    <main>
      <section id="section1">
        {/* <img src={LoginPhoto} alt="banner" /> */}
        <p>Plataforma ABACO</p>
        {/* <img src={} alt="" ></img>
            <img src={} alt="" ></img> */}
      </section>
      <section id="section2">
        <p className="loginText">Autenticación</p>
        <div className="loginInfo">
          {" "}
          {/* área redonda gris */}
          {/* use grid */}
          <p>Usuario:</p>
          <input type="text" placeholder="Juaniata Pérez" />
          <p>Clave:</p>
          <input type="text" placeholder="********" />
          <p>¿Olvidó su clave?</p>
          <p>Registrarse como empresa</p>
          <p>Registrarse como independiente</p>
        </div>
        <button>Login</button>
        <div className="companiesLogo">
       {/* add logos */}
        </div>
      </section>
    </main>
  );
}

//        <section class="Auth">
//           <p>auth</p>
//           linea?
//           <div gris>
//              <div usuario>
//                  <p>usuario</p>
//                  <input type="text" />
//                  <input type="text" />
//              <div usuario>
//           <div clave>
//           <p>Clave</p>
//           <input type="text" />
//           <p>olvido su clave?</p>
//           <div clave>
//              <div registro>
//                  <p>registro como empresa</p>
//                  <p>registro como independiente</p>
//              <div registro>
//          </div gris>
//          <div logos donantes>
//              logos!
//          <div logos donantes>
//        </section>

//  )
// )
