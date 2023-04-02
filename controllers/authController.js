const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {};

authController.register = async (req, res) => {


const user = {
  email: req.body.email,
  password: req.body.password
};

datastore
  .save(user)
  .then(() => {
    res.status(201).send("User created successfully");
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error creating user");
  });

}

authController.login = async (req, res) => {
  // implement login functionality here

// Get user input
const { email, password } = req.body;

// Find user by email
const user = await datastore.get(email);

// Check if user exists
if (!user) {
  return res.status(400).send({ message: "Invalid email or password" });
}

// Check if password matches
if (password !== user.password) {
  return res.status(400).send({ message: "Invalid email or password" });
}

// Generate access token
const accessToken = generateAccessToken(user.email);

// Return access token
res.status(200).send({ accessToken });

}

module.exports = authController;
