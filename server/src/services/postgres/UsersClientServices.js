const { nanoid } = require('nanoid');
const { badRequest } = require('@hapi/boom');

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
      values: [id, username, hashedPassword, fullname]
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
}

module.exports = UsersClientServices;