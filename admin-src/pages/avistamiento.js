import AvistamientoManager from "@/components/avistamiento/manager";
import Layout from "@/components/layout";
import { verificacionUsuario } from "@/verificacion";
import { useEffect } from "react";

export default function PaginaAvistamiento(){
  useEffect(() => {
    verificacionUsuario();
  });

  return(
    <>
        <Layout>
          <AvistamientoManager />
        </Layout>
    </>
  );
}