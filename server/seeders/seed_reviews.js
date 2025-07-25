module.exports = (clients, partners, now) => {
  const data = [];
  let appointmentId = 1;

  clients.forEach((client, i) => {
    const partner = partners[i % partners.length];
    for (let j = 0; j < 10; j++) {
      data.push({
        appointment_id: appointmentId++,
        user_client_id: client.id,
        user_partner_id: partner.id,
        rating: Math.floor(Math.random() * 3) + 3,
        comment: `Komentar review ${j + 1}`,
        created_at: now,
      });
    }
  });

  return data;
};
