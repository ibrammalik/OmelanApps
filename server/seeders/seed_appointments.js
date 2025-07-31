/* eslint-disable camelcase */
module.exports = (clients, partners, schedules, now) => {
  const data = [];

  clients.forEach((client, i) => {
    const partner = partners[i % partners.length];
    const schedule = schedules[i % schedules.length];
    for (let j = 0; j < 10; j++) {
      const duration = Math.ceil(Math.random() * 8);
      data.push({
        user_client_id: client.id,
        user_partner_id: partner.id,
        // appointment_date: new Date(Date.now() + j * 86400000)
        //   .toISOString()
        //   .split('T')[0],
        schedule_appointment_id: schedule.id,
        status: ['pending', 'confirmed', 'completed', 'cancelled'][j % 4],
        duration,
        cost_estimation: duration * 7500,
        created_at: now,
        updated_at: now,
      });
    }
  });

  return data;
};
