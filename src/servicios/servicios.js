const urlObtenerCertificado = "https://script.google.com/macros/s/AKfycbxmQumJ0w8u2ayAhKBw5HXg7h6MTc3KXvr-pVP1t068Dr8jri053TF3B-SOJ6kgGp3qJA/exec"
const urlObtenerConstancias = "https://script.google.com/macros/s/AKfycbw0cAAO5dOZk-_6xcBOn-YAvZ6vvybdh6CXJCnIExBEOocEMviIdOOPZox_TXT7Gll1JA/exec"+"?key=bHwZeeAfPgwLdtr"
const urlModificarEstadoCertificadoLogistica = "https://script.google.com/macros/s/AKfycbyg0mNGq1bw9OGOyWHPnoye53ug0xx50tI88LvoflJwVs0RLk8K8pCqimyYZCAapUU6Dw/exec"
const urlModificarEstadoCertificadoContabildiad = "https://script.google.com/macros/s/AKfycbzeuTgj1As-3HRRAM9Y6ksrmAfc1wjTxF8RFhwpUsuhGgCh4BRaJzvyU_bKmS5Z6ank/exec"
const urlModificarEstadoCertificadoRevisorFiscal = "https://script.google.com/macros/s/AKfycbyBgknV6wgTng8Cxnom0x_St8vSO3Y2v9DR9296HAdsYnBAPESIFswj06sOCvF38oepWw/exec"
const urlModificarEstadoConstanciaLogistica = "https://script.google.com/macros/s/AKfycbw1T9V7gNxw44NwjrBr0H9GauRZHp75EktXM_7w6I_jhmZkKr1JyWi4E5XulXqGTKkOvA/exec"


export const obtenerCertificados = () => {
    return fetch(urlObtenerCertificado)
    .then((respuesta) => respuesta.json())
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}

export const obtenerConstancias = () => {
    return fetch(urlObtenerConstancias, {method:"POST"})
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
        authKey: 'PfUqVKmLHpZdIIe',
        dataToAdd: nuevoEstado,
        consecutivo,

    })
    return fetch(urlModificarEstadoCertificadoLogistica+parametros, opciones)
    .then((respuesta) => respuesta.json())
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
        authKey: '7NAeZxmbchLEfdn',
        dataToAdd: nuevoEstado,
        consecutivo,

    })
    return fetch(urlModificarEstadoCertificadoContabildiad+parametros, opciones)
    .then((respuesta) => respuesta.json())
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
        authKey: 'iqIfqmjX5Sxv4SS',
        dataToAdd: nuevoEstado,
        consecutivo,

    })
    return fetch(urlModificarEstadoCertificadoRevisorFiscal+parametros, opciones)
    .then((respuesta) => respuesta.json())
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}

export const modificarEstadoConstaciaLogistica = (nuevoEstado, consecutivo) => {
    let opciones = {
        method: "POST",
        
      };
    let parametros =  new URLSearchParams({
        authKey: '7NAeZxmbchLEfdn',
        dataToAdd: nuevoEstado,
        consecutivo,

    })
    return fetch(urlModificarEstadoConstanciaLogistica+parametros, opciones)
    .then((respuesta) => respuesta.json())
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}