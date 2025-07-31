const { nanoid } = require('nanoid');
const { badRequest } = require('@hapi/boom');

const ConnectPool = require('./ConnectPool');

class NotificationsUserPartnerServices {
  constructor() {
    this._pool = ConnectPool();
  }

  async getAllSubjectNotificationsByUserId(id) {
    const query = {
      text: 'SELECT id, subject, status_read, created_at FROM partner_notifications WHERE user_partner_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getUnreadSubjectNotificationsByUserId(id) {
    const query = {
      text: 'SELECT id, subject, status_read, created_at FROM partner_notifications WHERE user_partner_id = $1 AND status_read = $2',
      values: [id, 'N'],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getContentNotificationById({ id, userPartnerId }) {
    const query = {
      text: 'SELECT id, subject, content, status_read, created_at FROM partner_notifications WHERE id = $1 AND user_partner_id = $2',
      values: [id, userPartnerId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async addNotification({ userPartnerId, subject, content, statusRead = 'N' }) {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const id = `partner_notification-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO partner_notifications VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, userPartnerId, subject, content, statusRead, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    if (!result.rows || !result.rows.length) {
      throw badRequest('Failed to add notification');
    }

    return result.rows[0].id;
  }

  async editStatusNotificationById({ id, userPartnerId, statusRead }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE partner_notifications SET status_read = $1, updated_at = $2 WHERE id = $3 AND user_partner_id = $4 RETURNING id',
      values: [statusRead, updatedAt, id, userPartnerId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new badRequest('Failed to update notification"s status');
    }
  }
}

module.exports = NotificationsUserPartnerServices;
