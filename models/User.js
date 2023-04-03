import { Datastore } from '@google-cloud/datastore';
const datastore = new Datastore();

class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  async save() {
    const key = datastore.key(['User']);
    const entity = {
      key: key,
      data: {
        id: this.id,
        email: this.email,
        password: this.password,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
    };
    await datastore.save(entity);
    return entity;
  }

  static async findByEmail(email) {
    const query = datastore.createQuery('User').filter('email', '=', email);
    const [users] = await datastore.runQuery(query);
    return users[0];
  }
}

export default User;
