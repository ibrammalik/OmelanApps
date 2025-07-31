const { nanoid } = require('nanoid');
const { badRequest, unauthorized, notFound } = require('@hapi/boom');

const bcrypt = require('bcrypt');

const ConnectPool = require('./ConnectPool');

class UsersPartnerServices {
  constructor() {
    this._pool = ConnectPool();
  }

  async getUsers(top = 50) {
    const query = {
      text: 'SELECT id, fullname, age, photo_url, average_rating FROM users_partner LIMIT $1',
      values: [top]
    };

    const result = await this._pool.query(query);
    return result;
  }

  async getUserDetailsById(id) {
    const query = {
      text: 'SELECT id, fullname, age, biodata, photo_url, average_rating, experience, specialist, rate_per_hour FROM users_partner WHERE id = $1',
      values: [id]
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getUserDetails(id) {
    const query = {
      text: 'SELECT id, fullname, age, address, biodata, photo_url, phone_number, average_rating, experience, specialist, rate_per_hour FROM users_partner WHERE id = $1',
      values: [id]
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getUserPartnerRate(id) {
    const query = {
      text: 'SELECT rate_per_hour AS rate FROM users_partner WHERE id = $1',
      values: [id]
    };

    const result = await this._pool.query(query);
    return result.rows[0].rate;
  }

  async addUser({ username, fullname, password, age = null, address = '', biodata = '', photoUrl = '', phoneNumber = '', rating = null, experience = '', specialist = '', ratePerHour = 0 }) {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const id = `user_partner-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users_partner VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id',
      values: [id, username, fullname, hashedPassword, age, address, biodata, photoUrl, phoneNumber, rating, experience, specialist, ratePerHour, createdAt, updatedAt]
    };

    const result = await this._pool.query(query).catch((err) => err);
    if (!result.rows || !result.rows.length) {
      throw badRequest('Failed to add user');
    }

    return result.rows[0].id;
  }

  async editUserById(id, { fullname, age, address, biodata, photoUrl = '', phoneNumber, experience, specialist, ratePerHour }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE users_partner SET fullname = $1, age = $2, address = $3, biodata = $4, photo_url = $5, phone_number = $6, experience = $7, specialist = $8, rate_per_hour = $9, updated_at = $10 WHERE id = $11 RETURNING id',
      values: [fullname, age, address, biodata, photoUrl, phoneNumber, experience, specialist, ratePerHour, updatedAt, id]
    };

    const result = await this._pool.query(query).catch((err) => err);
    if (!result.rows.length) {
      throw new notFound('Failed to update profile');
    }
  }

  async verifyUserRegister({ username }) {
    const query = {
      text: 'SELECT username FROM users_partner WHERE username = $1',
      values: [username]
    };

    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw badRequest('Username already exist');
    }
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users_partner WHERE username = $1',
      values: [username]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw unauthorized('Wrong Credential');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      throw unauthorized('Wrong Credential');
    }

    return id;
  }

  async verifyUserExisting(id) {
    const query = {
      text: 'SELECT username FROM users_partner WHERE id = $1',
      values: [id]
    };

    const { rowCount } = await this._pool.query(query).catch((err) => err);
    if (rowCount == 0) {
      throw unauthorized('User not found. You have no permission.');
    }
  }

}

module.exports = UsersPartnerServices;