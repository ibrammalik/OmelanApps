const ConnectPool = require('./ConnectPool');
const { badRequest } = require('@hapi/boom');

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
      throw badRequest(`Failed create review: ${  error.message}`);
    }
  }
}

module.exports = ReviewService;
