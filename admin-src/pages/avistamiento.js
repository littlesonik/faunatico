import AvistamientoManager from "@/components/avistamiento/manager";
import Layout from "@/components/layout";
import {verificacion} from "@/verificacion";

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