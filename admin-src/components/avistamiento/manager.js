import { useState } from "react";
import AvistamientoForm from "./form";
import AvistamientoListado from "./listado";

export default function AvistamientoManager(props){
  const[avistamientos, setAvistamientos] = useState([]);

  return(
    <>
      <main>
        <AvistamientoForm 
          avistamientos={avistamientos}
          setAvistamientos={setAvistamientos}
        />
        <hr/>
        <AvistamientoListado 
          avistamientos={avistamientos}
          setAvistamientos={setAvistamientos}
        />
      </main>
    </>
  )
}