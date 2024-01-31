// src/utils/Gescel.js

import axios from 'axios';

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
    sumar,
    obtenerCursosCapacitacion
};

async function obtenerCursosCapacitacion(cNumeroCapacitacion) {
  const cURL = `${oGescel.cServidor}/obtenerCursosCapacitacion`; // Usar oGescel.cServidor

  try {
    const response = await axios.get(cURL, { params: { cNumeroCapacitacion } });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}

oGescel.obtenerCursosCapacitacion = obtenerCursosCapacitacion;

export default oGescel;