const { nanoid } = require("nanoid");
const { badRequest, unauthorized, notFound } = require("@hapi/boom");

const bycrypt = require("bcrypt");

const ConnectPool = require("./ConnectPool");

class UsersClientServices {
  constructor() {
    this._pool = ConnectPool();
  }

  async getUserDetailsById(id) {
    const query = {
      text: "SELECT id, fullname, age, biodata, photo_url, phone_number, partner_name, emergency_contact, address FROM users_client WHERE id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async addUser({
    username,
    password,
    fullname,
    age = null,
    address = "",
    biodata = "",
    photoUrl = "",
    phoneNumber = "",
    partnerName = "",
    emergencyContact = "",
  }) {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const id = `user_client-${nanoid(16)}`;
    const hashedPassword = await bycrypt.hash(password, 10);

    const query = {
      text: "INSERT INTO users_client VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id",
      values: [
        id,
        username,
        fullname,
        hashedPassword,
        age,
        address,
        biodata,
        photoUrl,
        phoneNumber,
        partnerName,
        emergencyContact,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);
    if (!result.rows || !result.rows.length) {
      throw badRequest("Failed to add user");
    }

    return result.rows[0].id;
  }

  async editUserById(
    id,
    {
      fullname,
      age,
      address,
      biodata,
      phoneNumber,
      partnerName,
      emergencyContact,
      photoUrl,
    }
  ) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: `
      UPDATE users_client
      SET fullname = $1, age = $2, address = $3, biodata = $4, phone_number = $5, partner_name = $6, emergency_contact = $7, photo_url = $8, updated_at = $9
      WHERE id = $10
      RETURNING id
    `,
      values: [
        fullname,
        age,
        address,
        biodata,
        phoneNumber,
        partnerName,
        emergencyContact,
        photoUrl,
        updatedAt,
        id,
      ],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new notFound("Failed to update user");
    }
  }

  async verifyUserRegister({ username }) {
    const query = {
      text: "SELECT username FROM users_client WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);
    if (result.rows.length > 0) {
      throw badRequest("Username already exist");
    }
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: "SELECT id, password FROM users_client WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw unauthorized("Wrong Credential");
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bycrypt.compare(password, hashedPassword);
    if (!match) {
      throw unauthorized("Wrong Credential");
    }

    return id;
  }

  async verifyUserExisting(id) {
    const query = {
      text: "SELECT username FROM users_client WHERE id = $1",
      values: [id],
    };

    const { rowCount } = await this._pool.query(query).catch((err) => err);
    if (rowCount == 0) {
      throw unauthorized("User not found. You have no permission.");
    }
  }

  async addPhotoUrl(id, photoUrl) {
    // console.log("📝 Menyimpan photo_url:", photoUrl, "untuk ID:", id);

    const query = {
      text: "UPDATE users_client SET photo_url = $1 WHERE id = $2 RETURNING id",
      values: [photoUrl, id],
    };

    const result = await this._pool.query(query);
    // console.log("📦 Hasil query:", result.rows);

    if (!result.rows.length) {
      console.error("❌ Gagal menyimpan URL foto");
      throw notFound("Failed to add photo url.");
    }
  }
}

module.exports = UsersClientServices;
