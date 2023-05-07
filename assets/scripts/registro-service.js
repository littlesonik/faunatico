const form = document.querySelector("form");
    form.addEventListener("submit", async (submitEvent) =>{
      submitEvent.preventDefault();
      const formElement = submitEvent.currentTarget;
      const formData = new FormData(formElement);
      const usuario = formData.get("usuario");
      const nombre = formData.get("nombre");
      const apellido1 = formData.get("apellido1");
      const apellido2 = formData.get("apellido2");
      const email = formData.get("email");
      const rut = formData.get("rut");
      const password = formData.get("password");

      const nuevoUsuario = {
        usuario,
        nombre,
        apellido1,
        apellido2,
        email,
        rut,
        password
      }

      //console.dir(nuevoUsuario);

      const baseUrl = getBaseUrl();
      const url = baseUrl + '/registro';

      const fetchConfig = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(nuevoUsuario)
      };

      try {
        const respuesta = await fetch(url, fetchConfig);
        
          //si la respuesta no es OK
          if ( !respuesta.ok){
            //gestionar error o mensajes recibidos
            console.error("La respuesta no esta OK");
            return;
          }
          // en caso de exito
          const objetoJson = await respuesta.json();
          console.dir(objetoJson);
        
      } catch (error) {
        //gestion errores
        //console.error( error.code );
        //console.error( error.message );
      }

    });