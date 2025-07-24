const { faker } = require("@faker-js/faker");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

module.exports = async (now) => {
  const hashedPassword = await bcrypt.hash("admin", 10);

  const adminPartner = {
    id: `partner-admin`,
    username: "admin@partner.com",
    fullname: "admin partner",
    password: hashedPassword,
    age: 45,
    address: "Bandung",
    biodata: "Admin Partner Account",
    photo_url: faker.image.avatar(),
    phone_number: "082112341234",
    average_rating: 5.0,
    experience: "10",
    specialist: "Perawat Lansia",
    created_at: now,
    updated_at: now,
  };

  const dummyPartners = Array.from({ length: 6 }).map(() => ({
    id: `partner-${nanoid(10)}`,
    username: faker.internet.email(),
    fullname: faker.person.fullName(),
    password: faker.internet.password(),
    age: faker.number.int({ min: 30, max: 60 }),
    address: faker.location.city(),
    biodata: faker.lorem.sentences(),
    photo_url: faker.image.avatar(),
    phone_number: faker.phone.number(),
    average_rating: faker.number.float({ min: 3.0, max: 5.0, precision: 0.1 }),
    experience: faker.number.int({ min: 1, max: 10 }).toString(),
    specialist: faker.person.jobTitle(),
    created_at: now,
    updated_at: now,
  }));

  return [adminPartner, ...dummyPartners];
};
