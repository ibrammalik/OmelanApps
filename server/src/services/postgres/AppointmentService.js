/* eslint-disable camelcase */
const ConnectPool = require('./ConnectPool');
const { notFound, badRequest } = require('@hapi/boom');

class AppointmentService {
  constructor() {
    this._pool = ConnectPool();
  }

  async createAppointment({ userClientId, userPartnerId, scheduleId, duration, costEstimation }) {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const status = 'pending';

    const query = {
      text: `
        INSERT INTO appointment (user_client_id, user_partner_id, schedule_appointment_id, status, duration, cost_estimation, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
      `,
      values: [userClientId, userPartnerId, scheduleId, status, duration, costEstimation, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw badRequest('Failed to add appointment');
    }

    return result.rows[0].id;
  }

  async getAppointmentsForPartner(partnerId) {
    const query = {
      text: `
      SELECT a.id, s.date_start AS date, a.status, a.duration, a.cost_estimation, uc.fullname AS client_name, uc.photo_url AS client_photo
      FROM appointment a
      JOIN users_client uc ON a.user_client_id = uc.id
      JOIN users_partner up ON a.user_partner_id = up.id
      JOIN schedules s ON a.schedule_appointment_id = s.id
      WHERE a.user_partner_id = $1
      ORDER BY a.created_at DESC
    `,
      values: [partnerId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getAppointmentsForClient(clientId) {
    const query = {
      text: `
      SELECT a.id, s.date_start AS date, a.status, a.duration, a.cost_estimation, up.fullname AS client_name, up.photo_url AS client_photo
      FROM appointment a
      JOIN users_partner up ON a.user_partner_id = up.id
      JOIN schedules s ON a.schedule_appointment_id = s.id
      WHERE a.user_client_id = $1
      ORDER BY a.created_at DESC
    `,
      values: [clientId],
    };

    const result = await this._pool.query(query).catch((err) => err);
    return result.rows;
  }

  async updateAppointmentStatus({ id, status }) {
    const client = await this._pool.connect();
    try {
      await client.query('BEGIN');
      if (!id || !status) {
        throw badRequest('Missing appointment ID or status');
      }

      const currentQuery = {
        text: `
        SELECT id, user_partner_id, schedule_appointment_id
        FROM appointment
        WHERE id = $1
      `,
        values: [id],
      };
      const currentResult = await client.query(currentQuery);
      if (currentResult.rowCount === 0) {
        throw badRequest('Appointment not found.');
      }
      const { user_partner_id, schedule_appointment_id } = currentResult.rows[0];

      if (status === 'confirmed') {
        const cancelQuery = {
          text: `
          UPDATE appointment
          SET status = 'cancelled'
          WHERE user_partner_id = $1
          AND schedule_appointment_id = $2
          AND id != $3
          AND status IN ('pending', 'confirmed')
        `,
          values: [user_partner_id, schedule_appointment_id, id],
        };
        await client.query(cancelQuery);
      }

      const updateQuery = {
        text: `
        UPDATE appointment
        SET status = $1
        WHERE id = $2
      `,
        values: [status, id],
      };
      await client.query(updateQuery);

      await client.query('COMMIT');

    } catch (error) {
      await client.query('ROLLBACK');
      if (error.isBoom) {
        throw error;
      }
      throw (
        'Internal server error on updating status.'
      );
    } finally {
      client.release();
    }
  }

  async getAppointmentByIdForReview(id) {
    try {
      const query = {
        text: `
        SELECT id, user_client_id, user_partner_id, status
        FROM appointment
        WHERE id = $1
      `,
        values: [id],
      };

      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw notFound('Appointment not found.');
      }

      return result.rows[0];
    } catch (error) {
      if (error.isBoom) throw error;
      throw badRequest(`Fail to get appointment: ${error.message}`);
    }
  }

  async validateBookingDate(scheduleId) {
    const query = {
      text: 'SELECT schedule_appointment_id FROM appointment WHERE schedule_appointment_id = $1',
      values: [scheduleId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length) {
      throw badRequest('Schedule has been taken');
    }

    return result.rows.length;
  }
}

module.exports = AppointmentService;
