/* eslint-disable camelcase */
module.exports = (partners, now) => {
  const data = [];

  partners.forEach((partner) => {
    for (let i = 0; i < 10; i++) {
      data.push({
        user_partner_id: partner.id,
        available_date: new Date(Date.now() + i * 86400000)
          .toISOString()
          .split('T')[0],
        status: 'available',
        created_at: now,
      });
    }
  });

  return data;
};
