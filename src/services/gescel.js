// src/utils/Gescel.js

export function cObtenerNombreArchivo(rutaCompleta) {
    const partes = rutaCompleta.split('/');
    const nombreArchivo = partes[partes.length - 1];
    return nombreArchivo;
  }
  
export function saludar(nombre) {
    return `Hola, ${nombre}!`;
}

export function sumar(a, b) {
    return a + b;
}