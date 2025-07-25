module.exports = (clients, partners, now) => {
  const data = [];

  clients.forEach((client, i) => {
    const partner = partners[i % partners.length];
    for (let j = 0; j < 10; j++) {
      data.push({
        user_client_id: client.id,
        user_partner_id: partner.id,
        appointment_date: new Date(Date.now() + j * 86400000)
          .toISOString()
          .split("T")[0],
        status: ["pending", "confirmed", "completed", "cancelled"][j % 4],
        created_at: now,
        update_at: now,
      });
    }
  });

  return data;
};
