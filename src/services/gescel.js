// src/utils/Gescel.js

export function cObtenerNombreArchivo(rutaCompleta) {
    const partes = rutaCompleta.split('/');
    const nombreArchivo = partes[partes.length - 1];
    return nombreArchivo;    
  }

  export function funcionConsole(cString) {
    console.log(cString);
  }

  export function sanitizeText(inputText) {
    // Utilizamos una expresión regular para reemplazar cualquier carácter que no sea alfanumérico, espacio, "()", "-", "_" o "*"
    const sanitizedText = inputText.replace(/[^A-Za-z0-9\s()\-_*]/g, ' ');
  
    return sanitizedText;
  }  
  
export function saludar(nombre) {
    return `Hola, ${nombre}!`;
}

export function sumar(a, b) {
    return a + b;
}

const oGescel = {
    cObtenerNombreArchivo,
    funcionConsole,
    cServidor: import.meta.env.VITE_API_URL,
    sanitizeText,
    saludar,
    sumar
};

export default oGescel;