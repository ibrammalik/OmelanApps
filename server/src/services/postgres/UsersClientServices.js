const { nanoid } = require('nanoid');
const { badRequest, unauthorized } = require('@hapi/boom');

const bycrypt = require('bcrypt');

const ConnectPool = require('./ConnectPool');

class UsersClientServices {
  constructor() {
    this._pool = ConnectPool();
  }

  async addUser({ username, password, fullname }) {
    const id = `user_client-${nanoid(16)}`;
    const hashedPassword = await bycrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users_client VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, fullname, hashedPassword]
    };

    const result = await this._pool.query(query).catch((err) => err);
    if (!result.rows || !result.rows.length) {
      throw badRequest('Failed to add user client');
    }

    return result.rows[0].id;
  }

  async verifyUserRegister({ username }) {
    const query = {
      text: 'SELECT username FROM users_client WHERE username = $1',
      values: [username]
    };

    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw badRequest('Username already exist');
    }
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users_client WHERE username = $1',
      values: [username]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw unauthorized('Wrong Credential');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bycrypt.compare(password, hashedPassword);
    if (!match) {
      throw unauthorized('Wrong Credential');
    }

    return id;
  }
}

module.exports = UsersClientServices;