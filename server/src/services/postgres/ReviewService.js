const ConnectPool = require("./ConnectPool");
const { badRequest } = require("@hapi/boom");

class ReviewService {
  constructor() {
    this._pool = ConnectPool();
  }

  async createReview({ appointmentId, userClientId, userPartnerId }) {
    try {
      const now = new Date().toISOString();
      const query = {
        text: `
        INSERT INTO reviews (appointment_id, user_client_id, user_partner_id, rating, comment, created_at, updated_at)
        VALUES ($1, $2, $3, NULL, NULL, $4, $4)
      `,
        values: [appointmentId, userClientId, userPartnerId, now],
      };
      await this._pool.query(query);
    } catch (error) {
      throw badRequest(`Failed create review: ${error.message}`);
    }
  }

  async updateReview({ appointmentId, rating, comment }) {
    try {
      const checkQuery = {
        text: `SELECT rating, comment FROM reviews WHERE appointment_id = $1`,
        values: [appointmentId],
      };
      const { rows } = await this._pool.query(checkQuery);
      const existing = rows[0];

      if (existing && (existing.rating !== null || existing.comment !== null)) {
        throw badRequest("Review sudah diberikan dan tidak dapat diubah lagi.");
      }

      const now = new Date().toISOString();
      const updateQuery = {
        text: `
        UPDATE reviews 
        SET rating = $1, comment = $2, updated_at = $3 
        WHERE appointment_id = $4
      `,
        values: [rating, comment, now, appointmentId],
      };
      await this._pool.query(updateQuery);
    } catch (error) {
      throw badRequest(`Gagal update review: ${error.message}`);
    }
  }

  async getClientReviewSummary(userClientId) {
    try {
      const query = {
        text: `
    SELECT 
      a.id AS appointment_id,
      p.fullname AS partner_name,
      p.photo_url AS partner_photo,
      a.created_at AS appointment_date,
      r.rating,
      r.comment
    FROM reviews r
    JOIN appointment a ON r.appointment_id = a.id
    JOIN users_partner p ON r.user_partner_id = p.id
    WHERE r.user_client_id = $1
    ORDER BY a.created_at DESC
  `,
        values: [userClientId],
      };
      const result = await this._pool.query(query);
      return result.rows;
    } catch (error) {
      throw badRequest(
        `Gagal mengambil ringkasan review client: ${error.message}`
      );
    }
  }

  async getReviewsByUserPartnerId(userPartnerId) {
    try {
      const query = {
        text: `
          SELECT r.rating, r.comment, r.created_at, c.fullname AS client_name
          FROM reviews r
          JOIN users_client c ON c.id = r.user_client_id
          WHERE r.user_partner_id = $1
          ORDER BY r.created_at DESC
        `,
        values: [userPartnerId],
      };
      const result = await this._pool.query(query);
      return result.rows;
    } catch (error) {
      throw badRequest(`Gagal mengambil review: ${error.message}`);
    }
  }
}

module.exports = ReviewService;
