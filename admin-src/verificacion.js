//recuperar el token
export const storageUsuario = localStorage.getItem("usuario"); //viene como string
if( storageUsuario == null){
  //si no esta autenticado, lo envio a la pagina de login
  window.location = "login.html"
}

const objetoUsuario = JSON.parse(storageUsuario); //lo convierto a formato json
const token = objetoUsuario.user.stsTokenManager.accessToken; //esta ruta es para obtener el token, se recomienda revisar la ruta para no equivocarse

console.log(token);

const baseUrl = getBaseUrl();
const url = baseUrl + '/usuario/checktoken';
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
}).then( respuesta => {
  if(!respuesta.ok){
    throw new Error("Token no valido")
  }
  respuesta.json();
}).catch (error =>{
  window.location = 'login.html';
});