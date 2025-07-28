const ConnectPool = require("./ConnectPool");
const { notFound, badRequest } = require("@hapi/boom");

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
      throw badRequest(error.message);
    }
  }

  async getAppointmentsForPartner(partnerId) {
    try {
      const query = {
        text: `
        SELECT 
          a.id,
          a.user_client_id,
          a.user_partner_id,
          a.appointment_date AS date,
          a.status,
          a.created_at,
          uc.fullname AS client_name,
          uc.photo_url AS client_photo
        FROM appointment a
        JOIN users_client uc ON a.user_client_id = uc.id
        WHERE a.user_partner_id = $1
        ORDER BY a.created_at DESC
      `,
        values: [partnerId],
      };

      const result = await this._pool.query(query);
      return result.rows;
    } catch (error) {
      // console.error("Error query getAppointmentsForPartner:", error.message);
      throw error;
    }
  }

  async updateAppointmentStatus({ id, status }) {
    try {
      // Pengecekan Optional
      if (!id || !status) {
        throw badRequest("ID appointment dan status harus disediakan.");
      }

      const query = {
        text: `UPDATE appointment SET status = $1 WHERE id = $2 RETURNING id`,
        values: [status, id],
      };
      const result = await this._pool.query(query);
      if (!result.rowCount) {
        throw notFound(
          "Gagal memperbarui status, appointment tidak ditemukan."
        );
      }
      return result.rows[0].id;
    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      // console.error(
      //   "Error tak terduga saat memperbarui status appointment:",
      //   error
      // );
      throw internal(
        "Terjadi kesalahan internal server saat memperbarui status appointment."
      );
    }
  }

  async getAppointmentByIdForReview(id) {
    try {
      const query = {
        text: `
        SELECT 
          id, 
          user_client_id, 
          user_partner_id, 
          status
        FROM appointment
        WHERE id = $1
      `,
        values: [id],
      };

      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw notFound("Appointment tidak ditemukan.");
      }

      return result.rows[0];
    } catch (error) {
      // console.error(" Gagal ambil appointment by ID:", error.message);
      if (error.isBoom) throw error;
      throw badRequest("Gagal mengambil appointment: " + error.message);
    }
  }
}

module.exports = AppointmentService;
