const {admin} = require('./firebase');

module.exports = async (req, res) => {
  const {email, password} = req.body;

  try {
    const nuevoUsuario = await admin.auth().createUser({
      email: email, 
      password: password,
    });
    return nuevoUsuario;

  } catch (error) {
    res.code(500).send({error: 'Ocurrió un error al crear un usuario'});
  }
}