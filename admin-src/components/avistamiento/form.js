import { useState } from "react";

export default function AvistamientoForm({avistamientos, setAvistamientos}) {
  
  const [nombre, setNombre] =           useState('');
  const [cantidad, setCantidad] = useState('');
  const [hora, setHora] = useState('');
  const [fecha, setFecha] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  
  const procesarFormulario = async(eventoSubmit) => {

    try {
        eventoSubmit.preventDefault();
    
        const avistamiento = {
          nombre, cantidad, fecha, hora, ubicacion
        };
    
        const baseUrl = 'http://localhost:3000';
        const url = baseUrl + '/avistamiento';
    
        const respuesta = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(avistamiento)
        });
        if (!respuesta.ok) throw new Error ("No se pudo cargar su avistamiento...");
        
        const avistamientoGuardada = await respuesta.json();
        console.dir(avistamientoGuardada);
        
        //actualiza la variable de estado
        //que contiene las avistamientos que muestra la tabla
        setAvistamientos(
          [...avistamientos, avistamientoGuardada]
        );
    } catch (error) {
        console.error( error );
    }
  }

  return (
    <>
      <h1>Registra aquí tus avistamientos de la fauna chilen</h1>
      <form action="form" method="post" onSubmit={procesarFormulario}>
        <label htmlFor= "nombre">Nombre de la especie:</label>
        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>

        <label htmlFor= "cantidad">Cantidad de animales:</label>
        <input type="text" id="cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)}/>

        <label htmlFor= "fecha">Día del avistamiento:</label>
        <input type="date" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)}/>

        <label htmlFor= "hora">Hora aproximada de avistamiento:</label>
        <input type="time" id="hora" value={hora} onChange={(e) => setHora(e.target.value)}/>

        <label htmlFor= "ubicacion">Ubicación:</label>
        <input type="text" id="ubicacion" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}/>

        <button type="submit">Guardar</button>
      </form>

      Nombre: {nombre} | Cantidad: {cantidad} |Fecha: {fecha}| Hora: {hora} | ubicacion {ubicacion}
    </>
  );
}