const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore();

module.exports = {
  async getIndex(req, res) {
    const query = datastore.createQuery('User');
    const [users] = await datastore.runQuery(query);

    res.send(users);
  },
};
