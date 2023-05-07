const {admin} = require('./firebase');

module.exports = async (req, res) => {
  const {email, password} = req.body;

  try {
    const usuario = await admin.auth().createUser({
      email: email, 
      password: password,
    });
    return usuario;

  } catch (error) {
    res.code(500).send({error: 'Ocurrió un error al crear un usuario'});
  }
}