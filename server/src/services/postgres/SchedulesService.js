const { nanoid } = require('nanoid');

const ConnectPool = require('./ConnectPool');
const { badRequest } = require('@hapi/boom');

class SchedulesService {
  constructor() {
    this._pool = ConnectPool();
  }

  async addSchedule(userId, { dateStart, dateEnd }) {
    const id = `user_schedule-${nanoid(16)}`;

    const timeStart = 'T00:00:00.000z';
    const timeEnd = 'T59:59:59.997z';
    dateStart = new Date(dateStart).toISOString().split('T')[0]+ timeStart;
    dateEnd = new Date(dateStart).toISOString().split('T')[0]+ timeEnd;

    const query = {
      text: 'INSERT INTO schedules VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, userId, dateStart, dateEnd]
    };

    const result = await this._pool.query(query);
    if (!result.rows || !result.rows.length) {
      throw badRequest('Failed to add schedule');
    }

    return result.rows[0].id;
  }

  async getSchedulesById(userId) {
    const query = {
      text: 'SELECT id, date_start, date_end FROM schedules WHERE user_id = $1',
      values: [userId]
    };

    const result = await this._pool.query(query);
    if (!result.rows || !result.rows.length) {
      throw badRequest('Failed to get schedule');
    }

    return result.rows;
  }

  async editScheduleById(userId, { id, dateStart, dateEnd }) {
    const query = {
      text: 'UPDATE schedules SET date_start = $1, date_end = $2 WHERE id = $3 AND user_id = $4 RETURNING id',
      values: [dateStart, dateEnd, id, userId]
    };

    const result = await this._pool.query(query);
    if (!result.rows || !result.rows.length) {
      throw badRequest('Failed to update schedule. Cannot find schedule');
    }

    return result.rows[0];
  }

  async getSchedulesByDate({ dateStart, dateEnd }) {
    const query = {
      text: 'SELECT DISTINCT user_id FROM schedules WHERE date_start <= $1 AND date_end >= $2',
      values: [dateStart, dateEnd]
    };

    const result = await this._pool.query(query);
    if (!result.rows || !result.rows.length) {
      throw badRequest('Sorry, no match schedule for your request');
    }

    return result.rows;
  }
}

module.exports = SchedulesService;