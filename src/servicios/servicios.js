export function obtenerOpcionesDeSolicitud(metodo){
    let opcionesDeSolicitud = {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
        }
    }
    return opcionesDeSolicitud
}

export const obtenerDocumentos = () => {
    return fetch("https://script.google.com/macros/s/AKfycbxmQumJ0w8u2ayAhKBw5HXg7h6MTc3KXvr-pVP1t068Dr8jri053TF3B-SOJ6kgGp3qJA/exec")
    .then((respuesta) => respuesta.json())
    .catch((error) => {
        console.log(error)
        throw error.mensaje;
    })
}