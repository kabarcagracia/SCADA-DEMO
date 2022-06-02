var express = require('express');
var router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/signin', (req, res) => {

    const { email, password } = req.body;
    console.log(req.body);
    User.findOne({ email: email }, "email password name lastnames")
    .then((response) =>{ 
        console.log(response);
        if(response) {
            // se encontro un usuario
            
            if(response.password == password) {
                //la contraseña coincide

                const payload = {
                  id: response._id,
                  user: response.name
                }

                const token = jwt.sign(payload, "miclaveultrasecreta123", { expiresIn: 1440 });
                res.json({msg: "Bienvenido: " + response.name + " " + response.lastnames + ".", token: token });
            } else {
                res.status(401).json({msg: "el correo o contraseña ingresados no son validos o no existen."});
            }
        } else {
            res.status(401).json({msg: "el correo o contraseña ingresados no son validos o no existen."});
        }
    })
    .catch((err) =>{ res.json(err);});
});

router.post('/validateToken', (req, res) => {
  const { token } = req.body;
 
  if (token) {
    jwt.verify(token, "miclaveultrasecreta123", (err, decoded) => {      
      if (err) {
        res.status(401).json({ mensaje: 'Token inválida' });    
      } else {
        res.json({ mensaje: 'Token válido' }); 
      }
    });
  } else {
    res.status(401).json({ 
        mensaje: 'Token no proveído.' 
    });
  }
});

module.exports = router;
