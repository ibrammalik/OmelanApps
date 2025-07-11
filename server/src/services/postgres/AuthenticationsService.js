const { badRequest } = require('@hapi/boom');

const ConnectPool = require('./ConnectPool');

class AuthenticationsService {
  constructor() {
    this._pool = ConnectPool();
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token]
    };

    const result = await this._pool.query(query);
    return result;
  }

  async verifyRefreshTokenDB(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw badRequest('Credential Invalid!');
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token]
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationsService;