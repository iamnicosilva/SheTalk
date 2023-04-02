const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();

// Handler function for GET /users/:userId
async function getUser(req, res) {
  const userKey = datastore.key(['User', Number(req.params.userId)]);
  const user = await datastore.get(userKey);

  if (user[0]) {
    res.status(200).json(user[0]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

// Handler function for POST /users
async function createUser(req, res) {
  const { name, email, password } = req.body;

  const user = {
    name,
    email,
    password
  };

  const userKey = datastore.key('User');
  await datastore.save({
    key: userKey,
    data: user
  });

  res.status(201).json({
    id: userKey.id,
    ...user
  });
}

// Handler function for PUT /users/:userId
async function updateUser(req, res) {
  const userKey = datastore.key(['User', Number(req.params.userId)]);
  const user = await datastore.get(userKey);

  if (user[0]) {
    const { name, email, password } = req.body;

    const updatedUser = {
      name: name || user[0].name,
      email: email || user[0].email,
      password: password || user[0].password
    };

    await datastore.update({
      key: userKey,
      data: updatedUser
    });

    res.status(200).json({
      id: userKey.id,
      ...updatedUser
    });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

// Handler function for DELETE /users/:userId
async function deleteUser(req, res) {
  const userKey = datastore.key(['User', Number(req.params.userId)]);
  const user = await datastore.get(userKey);

  if (user[0]) {
    await datastore.delete(userKey);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
};
