const { nanoid } = require("nanoid");

const ConnectPool = require("./ConnectPool");
const { badRequest } = require("@hapi/boom");

class AppointmentService {
  constructor() {
    this._pool = ConnectPool();
  }

  async createAppointment({ userClientId, userPartnerId, appointmentDate }) {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const status = "pending";

    const query = {
      text: `
        INSERT INTO appointment 
        (user_client_id, user_partner_id, appointment_date, status, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `,
      values: [
        userClientId,
        userPartnerId,
        appointmentDate,
        status,
        createdAt,
        updatedAt,
      ],
    };
    try {
      const result = await this._pool.query(query);
      if (!result.rows.length) {
        throw badRequest("Gagal membuat appointment");
      }

      return result.rows[0].id;
    } catch (error) {
      console.error("❌ Gagal menyimpan appointment:", error.message);
      throw badRequest(error.message);
    }
  }

  async getAppointmentsForPartner(partnerId) {
    const query = {
      text: `SELECT * FROM appointment WHERE user_partner_id = $1 ORDER BY appointment_date DESC`,
      values: [partnerId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = AppointmentService;
