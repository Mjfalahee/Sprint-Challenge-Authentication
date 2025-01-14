const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const model = require('./model');
const { authenticate } = require('../auth/authenticate');
const secret = require('./secret');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let info = req.body;
  const hash = bcrypt.hashSync(info.password, 8)
  info.password = hash;

  model.addUser(info)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

function login(req, res) {
  // implement user login

  let {username, password} = req.body;

  model.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}, here's a token for your troubles!`,
          token
        })
      } else {
        res.status(401).json({
          message: 'Invalid Credentials.'
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error logging in.'
      })
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}


//generating a token

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
    }
    const options = {
      expiresIn: '1d'
    }
    return jwt.sign(payload, secret.jwtSecret, options);
}