const { faker } = require("@faker-js/faker");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

module.exports = async (now) => {
  const hashedPassword = await bcrypt.hash("admin", 10);

  const adminClient = {
    id: "client-admin",
    username: "admin@client.com",
    fullname: "admin client",
    password: hashedPassword,
    age: 40,
    address: "Jakarta",
    biodata: "Admin client default",
    photo_url: faker.image.avatar(),
    phone_number: "08123456789",
    partner_name: "Admin Pasangan",
    emergency_contact: "081234567890",
    created_at: now,
    updated_at: now,
  };

  const dummyClients = await Promise.all(
    Array.from({ length: 6 }).map(async () => ({
      id: `client-${nanoid(10)}`,
      username: faker.internet.email(),
      fullname: faker.person.fullName(),
      password: await bcrypt.hash("123456", 10), // random password juga di-hash
      age: faker.number.int({ min: 30, max: 60 }),
      address: faker.location.city(),
      biodata: faker.lorem.paragraph(),
      photo_url: faker.image.avatar(),
      phone_number: faker.phone.number(),
      partner_name: faker.person.fullName(),
      emergency_contact: faker.phone.number(),
      created_at: now,
      updated_at: now,
    }))
  );

  return [adminClient, ...dummyClients];
};
