import Image from 'next/image';

export default function Cabecera(props) {
  return (
    <>
      <header>
        <Image src="/assets/images/faunatico-logo.png" alt="Logo Faunatico" id="logo" width={20} height={20}/>
        
        <nav className="nav-header">
          <a href="./index.html" className="navigation">Inicio</a>
          <a href="#" className="navigation">Saber más</a>
          <a href="#" className="navigation">Comunidad</a>
          <a href="#" className="navigation">Nosotros</a>
        </nav>

        <nav className="nav-header2">
          <a href="./registro.html" className="navigation nav-2" id="register">
            Regístrate
          </a>
          <a href="./login.html" className="navigation nav-2" id="login">
            Iniciar sesión
          </a>
        </nav>
      </header>
    </>
  )
}