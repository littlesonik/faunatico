import { useState } from "react";
import Configuracion from '../libreria/config'

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
    
        const baseUrl = Configuracion.getBaseUrl();
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
      <h1>Registra aquí tus avistamientos de la fauna chilena</h1>
      <form action="form" method="post" onSubmit={procesarFormulario}>
        <fieldset className="form-avistamiento">
          <label htmlFor= "nombre" className="label-avistamiento">Nombre de la especie:</label>
          <input type="text" id="nombre" value={nombre} className="input-avistamiento" onChange={(e) => setNombre(e.target.value)}/>
        </fieldset>

        <fieldset className="form-avistamiento">
          <label htmlFor= "cantidad" className="label-avistamiento">Cantidad de animales:</label>
          <input type="text" id="cantidad" value={cantidad} className="input-avistamiento" onChange={(e) => setCantidad(e.target.value)}/>
        </fieldset>

        <fieldset className="form-avistamiento">
          <label htmlFor= "fecha" className="label-avistamiento">Día del avistamiento:</label>
          <input type="date" id="fecha" value={fecha} className="input-avistamiento" onChange={(e) => setFecha(e.target.value)}/>
        </fieldset>

        <fieldset className="form-avistamiento">
          <label htmlFor= "hora" className="label-avistamiento">Hora aproximada de avistamiento:</label>
          <input type="time" id="hora" value={hora} className="input-avistamiento" onChange={(e) => setHora(e.target.value)}/>
        </fieldset>

        <fieldset className="form-avistamiento">
          <label htmlFor= "ubicacion" className="label-avistamiento">Ubicación:</label>
          <input type="text" id="ubicacion" value={ubicacion} className="input-avistamiento" onChange={(e) => setUbicacion(e.target.value)}/>
        </fieldset>
        <button type="submit" className="btn-guardar">Guardar</button>
      </form>
    </>
  );
}