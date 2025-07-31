/* eslint-disable camelcase */
const { nanoid } = require('nanoid');

function formatDateToISO(date) {
  return date.toISOString().split('T')[0];
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

module.exports = (partners) => {
  const schedules = [];

  partners.forEach((partner) => {
    for (let i = 0; i < 3; i++) {
      const date = addDays(new Date(), i);
      const isoDate = formatDateToISO(date);

      schedules.push({
        id: `schedule-${nanoid(10)}`,
        user_id: partner.id,
        date_start: isoDate,
        date_end: isoDate, // bisa tambah +1 hari kalau mau range
      });
    }
  });

  return schedules;
};
