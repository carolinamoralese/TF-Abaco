export const obtenerCertificados = () => {
    return fetch("https://script.google.com/macros/s/AKfycbxmQumJ0w8u2ayAhKBw5HXg7h6MTc3KXvr-pVP1t068Dr8jri053TF3B-SOJ6kgGp3qJA/exec")
    .then((respuesta) => respuesta.json())
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}

export const obtenerConstancias = () => {
    return fetch("https://script.google.com/macros/s/AKfycbw0cAAO5dOZk-_6xcBOn-YAvZ6vvybdh6CXJCnIExBEOocEMviIdOOPZox_TXT7Gll1JA/exec"+"?key=bHwZeeAfPgwLdtr", {method:"POST"})
    .then((respuesta) => respuesta.json())
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}