const {admin} = require('./firebase');

module.exports = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return procesarGET(req,res);
    
    case 'POST':
      return procesarPOST(req,res);
    
    case 'PUT':
      return procesarPUT(req,res);
    
    case 'DELETE':
      return procesarDELETE(req,res);
    
    default:
      res.code(500).send({error: 'Metodo HTTP no soportado'});
  }
};

function getColeccion(){
  return admin.firestore().collection('avistamientos');
}

async function procesarGET(req, res) {
  try {
      const querySnapshot = await getColeccion().get();
      const documentos = querySnapshot.docs.map( d => {
        return d.data();
      });
      return documentos;
  } catch (error) {
      res.code(500).send({error: error.message});
  }
}

async function procesarPOST(req, res) {
  try {
    //EDITAR EL OBJETO MAS ADELANTEE
      const {nombre, cantidad, fecha, hora, ubicacion} = req.body;
      const avistamiento = {
        nombre,
        cantidad,
        fecha,
        hora,
        ubicacion
      }
      const documento = await getColeccion().doc(); //crea un documento vacio y autogenera un id
      const id = documento.id;
      documento.set(avistamiento);
      // paso para tener el id dentro del mismo objeto JSON
      avistamiento.id = id;
      return avistamiento;
  } catch (error) {
      res.code(500).send({error: error.message});
  }
}

async function procesarPUT(req, res) {
  //Para editar una categoria
  try {
      const {nombre, cantidad, id, fecha, hora, ubicacion} = req.body;
      const avistamiento = {
        nombre,
        cantidad,
        fecha,
        hora,
        ubicacion
      }
      const documento = await getColeccion().doc(id);
      documento.update(avistamiento);
      return avistamiento;
  } catch (error) {
      res.code(500).send({error: error.message});
  }
}

async function procesarDELETE(req, res) {
  try {
      const id = req.query.id;
      const docRef = await getColeccion().doc(id);
      await docRef.delete();
      return {borrado: true};
  } catch (error) {
      return {borrado: false, mensaje: error.message};
  }
}