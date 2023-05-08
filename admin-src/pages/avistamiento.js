import AvistamientoManager from "@/components/avistamiento/manager";
import Layout from "@/components/layout";
import {verificacion} from "@/verificacion";
import { useEffect } from "react";

export default function PaginaAvistamiento(){
  useEffect(() => {
    verificacion();
  });

  return(
    <>
        <Layout>
          <AvistamientoManager />
        </Layout>
    </>
  );
}