import { Datastore } from '@google-cloud/datastore';
const datastore = new Datastore();

class Auth {
  constructor() {
    this.kind = 'User';
  }

  async findByEmail(email) {
    const query = datastore.createQuery(this.kind).filter('email', '=', email);
    const [user] = await datastore.runQuery(query);
    return user;
  }

  async create(email, password) {
    const key = datastore.key(this.kind);
    const entity = {
      key,
      data: {
        email,
        password
      }
    };
    await datastore.save(entity);
    return key;
  }
}

export default Auth;
