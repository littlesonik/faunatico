import { useEffect, useState } from "react"

export default function AvistamientoListado({avistamientos, setAvistamientos}) {
  const cargarDatos = async () => {
    try {
      const baseUrl = 'http://localhost:3000';
      const url = baseUrl + '/avistamiento';
      const respuesta = await fetch(url);

      if(!respuesta.ok) throw new Error ("Problemas al recuperar las avistamientos!")
      const observaciones = await respuesta.json();
      setAvistamientos( observaciones);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(()=> {
    cargarDatos();
  }, []);
  
  const eliminar = async (avistamiento) => {
    try {
        const baseUrl = 'http://localhost:3000';
        const url = baseUrl + '/avistamiento?id='+ avistamiento.id;
        const respuesta = await fetch(url, {
          method: 'DELETE'
        });
        if(!respuesta.ok) throw new Error("No se pudo borrar su avistamiento!")
        const resultado = await respuesta.json;
        console.log("Avistamiento borrado de manera exitosa");

        //actualizar el listado despues de eliminado
        cargarDatos();
    } catch (error) {
        console.error({error: error.message});
    }
  };

  return (
    <>
      <h2>Listado de Avistamientos</h2>

      <table border={1}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Ubicacion</th>
            <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
          {avistamientos.map( avistamiento => (
            <tr key={avistamiento.id}>
              <td>{avistamiento.nombre}</td>
              <td>{avistamiento.cantidad}</td>
              <td>{avistamiento.fecha}</td>
              <td>{avistamiento.hora}</td>
              <td>{avistamiento.ubicacion}</td>

              <td>
                <button>Editar</button>
                <button onClick={() => eliminar(avistamiento)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}