const formulario = document.getElementById('formulario'); //con esto ingreso a los elementos del id="formulario"
const inputs = document.querySelectorAll('#formulario input'); //acá alamcenaremos todos los inputs del formulario a través del querySelectorAll

const expresiones = { //objeto con las distintas propiedades con sus EXPRESIONES REGULARES
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,16}$/, // Letras y espacios, pueden llevar acentos.
	apellido1: /^[a-zA-ZÀ-ÿ\s]{1,16}$/,
  apellido2: /^[a-zA-ZÀ-ÿ\s]{1,16}$/,
  password: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, // 8 a 16 digitos.
  password2: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  rut: /^[0-9]{8,9}[-|‐]{1}[0-9kK]{1}$/ //formato rut
}

const campos = {
  usuario: false,
  nombre: false,
  apellido1: false,
  apellido2: false,
  password: false,
  email: false,
  rut: false
}

const validarFormulario = (e) => {
  switch (e.target.name) { 
    case "usuario": //en caso de que nuestro campo sea "usuario" salimos del switch (con el break)
      validarCampo(expresiones.usuario, e.target, e.target.name);
    break;

    case "nombre":
      validarCampo(expresiones.nombre, e.target, e.target.name);
    break;

    case "apellido1":
      validarCampo(expresiones.apellido1, e.target, e.target.name);
    break;

    case "apellido2":
      validarCampo(expresiones.apellido2, e.target, e.target.name);
    break;

    case "rut":
      validarCampo(expresiones.rut, e.target, e.target.name);
    break;

    case "email":
      validarCampo(expresiones.email, e.target, e.target.name);
    break;

    case "password":
      validarCampo(expresiones.password, e.target, e.target.name);
      validarContraseña2();
      break;

    case "password2":
      validarContraseña2();
    break;
  };
}

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)){/*con el .test estoy validando si la EXPRESION para cada propiedad es verdadera*/
    document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');//Busco por el ID dentro del form 'grupo_${campo}' y le añado la clase escrita, con esto puede ingresar a los estilos CSS que remarcan en verde la validacion
    document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');  //en caso de no pasar la validación, se debe actualizar y remover la clase para eliminar el estilo CSS para la validación incorrecta
    document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
    campos[campo] = true;
  } else{
    document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto'); //si no pasa la validacion, se le añade la clase para el estilo CSS de incorrecto.
    document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
    document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
    campos[campo] = false;
  }
}

const validarContraseña2 = () => {
  const inputContraseña1 = document.getElementById('password');
  const inputContraseña2 = document.getElementById('password2');

  if(inputContraseña1.value !== inputContraseña2.value){
    document.getElementById(`grupo_password2`).classList.add('formulario_grupo-incorrecto'); //si no pasa la validacion, se le añade la clase para el estilo CSS de incorrecto.
    document.getElementById(`grupo_password2`).classList.remove('formulario_grupo-correcto');
    document.querySelector(`#grupo_password2 .formulario_input-error`).classList.add('formulario_input-error-activo');
    campos['password'] = false;
  } else {
    document.getElementById(`grupo_password2`).classList.remove('formulario_grupo-incorrecto'); //si no pasa la validacion, se le añade la clase para el estilo CSS de incorrecto.
    document.getElementById(`grupo_password2`).classList.add('formulario_grupo-correcto'); 
    document.querySelector(`#grupo_password2 .formulario_input-error`).classList.remove('formulario_input-error-activo');
    campos['password'] = true;
  }
}

//addEventListener = se activa cada vez que se ingresa un carácter a la página
inputs.forEach((input) =>{ //por cada input ingresado voy a ejecutar el addEventlistener
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e)=>  { //Cuando presione 'submit' quiero que se validen los campos reinicie la página para que qeude vacía
  e.preventDefault();

  const terminos = document.getElementById('terminos');
  if (campos.usuario && campos.nombre && campos.password && campos.email && campos.rut && terminos.checked){
    formulario.reset();

    document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
    setTimeout(() => {
      document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo');
    }, 5000);
    
    document.querySelectorAll('.formulario_grupo-correcto').forEach((icono) => {
      icono.classList.remove('formulario_grupo-correcto');
    });

  } else {
    document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
  }

});
