import { VARIABLES_ENTORNO } from "../../env";

export const obtenerCertificados = () => {
    let parametros = new URLSearchParams({
        key: VARIABLES_ENTORNO.REACT_APP_KEY_OBTENER_CERTIFICADOS,
    })
    return fetch(VARIABLES_ENTORNO.REACT_APP_URL_OBTENER_CERTIFICADOS+"?"+parametros)
    .then((respuesta) => respuesta.json())
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}

export const obtenerConstancias = () => {
    let parametros =  new URLSearchParams({
        key: VARIABLES_ENTORNO.REACT_APP_KEY_OBTENER_CONSTANCIAS,
    })
    return fetch(VARIABLES_ENTORNO.REACT_APP_URL_OBTENER_CONSTANCIAS+"?"+parametros, {method:"POST"})
    .then((respuesta) => respuesta.json())
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}

export const modificarEstadoCertificadoLogistica = (nuevoEstado, consecutivo) => {
    let opciones = {
        method: "POST",
        
      };
    let parametros =  new URLSearchParams({
        authKey: VARIABLES_ENTORNO.REACT_APP_AUTHKEY_MODIFICAR_ESTADOS_CERTIFICADOS_LOGISTICA,
        consecutivo,
        dataToAdd: nuevoEstado,
    })
    return fetch(VARIABLES_ENTORNO.REACT_APP_URL_MODIFICAR_ESTADOS_CERTIFICADOS_LOGISTICA+"?"+parametros, opciones)
    .then((respuesta) => respuesta)
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}

export const modificarEstadoCertificadoContabilidad = (nuevoEstado, consecutivo) => {
    let opciones = {
        method: "POST",
        
      };
    let parametros =  new URLSearchParams({
        authKey: VARIABLES_ENTORNO.REACT_APP_AUTHKEY_MODIFICAR_ESTADOS_CERTIFICADOS_CONTABILIDAD,
        dataToAdd: nuevoEstado,
        consecutivo,

    })
    return fetch(VARIABLES_ENTORNO.REACT_APP_URL_MODIFICAR_ESTADOS_CERTIFICADOS_CONTABILIDAD+"?"+parametros, opciones)
    .then((respuesta) => respuesta)
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}

export const modificarEstadoCertificadoRevisorFiscal = (nuevoEstado, consecutivo) => {
    let opciones = {
        method: "POST",
        
      };
    let parametros =  new URLSearchParams({
        authKey: VARIABLES_ENTORNO.REACT_APP_AUTHKEY_MODIFICAR_ESTADOS_CERTIFICADOS_REVISOR_FISCAL,
        dataToAdd: nuevoEstado,
        consecutivo,

    })
    return fetch(VARIABLES_ENTORNO.REACT_APP_URL_MODIFICAR_ESTADOS_CERTIFICADOS_REVISOR_FISCAL+"?"+parametros, opciones)
    .then((respuesta) => respuesta)
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}

export const modificarEstadoConstanciaLogistica = (nuevoEstado, consecutivo) => {
    let opciones = {
        method: "POST",
        
      };
    let parametros =  new URLSearchParams({
        authKey: VARIABLES_ENTORNO.REACT_APP_AUTHKEY_MODIFICAR_ESTADOS_CONSTANCIA_LOGISTICA,
        dataToAdd: nuevoEstado,
        consecutivo,

    })
    return fetch(VARIABLES_ENTORNO.REACT_APP_URL_MODIFICAR_ESTADOS_CONSTANCIAS_LOGISTICA+"?"+parametros, opciones)
    .then((respuesta) => console.log(respuesta))
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}