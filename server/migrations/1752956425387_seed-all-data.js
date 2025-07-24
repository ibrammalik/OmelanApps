/* eslint-disable camelcase */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const seedClients = require("../seeders/seed_users_client");
const seedPartners = require("../seeders/seed_users_partner");
const seedAvailabilities = require("../seeders/seed_availabilities");
const seedAppointments = require("../seeders/seed_appointments");
const seedReviews = require("../seeders/seed_reviews");

const formatValues = (arr, fields) =>
  arr
    .map((obj) => `(${fields.map((f) => `'${obj[f]}'`).join(", ")})`)
    .join(",\n");

exports.up = (pgm) => {
  const now = new Date().toISOString();
  const clients = seedClients(now);
  const partners = seedPartners(now);
  const availabilities = seedAvailabilities(partners, now);
  const appointments = seedAppointments(clients, partners, now);
  const reviews = seedReviews(clients, partners, now);

  //   CLIENT
  pgm.sql(`
    INSERT INTO users_client (id, username, fullname, password, age, address, biodata, photo_url, created_at, updated_at)
    VALUES ${formatValues(clients, [
      "id",
      "username",
      "fullname",
      "password",
      "age",
      "address",
      "biodata",
      "photo_url",
      "created_at",
      "updated_at",
    ])};
  `);

  //partner
  pgm.sql(`
    INSERT INTO users_partner (id, username, fullname, password, age, address, biodata, photo_url, average_rating, created_at, updated_at)
    VALUES ${formatValues(partners, [
      "id",
      "username",
      "fullname",
      "password",
      "age",
      "address",
      "biodata",
      "photo_url",
      "average_rating",
      "created_at",
      "updated_at",
    ])};
  `);
  // availabilities
  // pgm.sql(`
  //   INSERT INTO availabilities (user_partner_id, available_date, status, created_at)
  //   VALUES ${formatValues(availabilities, [
  //     "user_partner_id",
  //     "available_date",
  //     "status",
  //     "created_at",
  //   ])};
  // `);
  // appointments
  pgm.sql(`
    INSERT INTO appointment (user_client_id, user_partner_id, appointment_date, status, created_at, "updated_at")
    VALUES ${formatValues(appointments, [
      "user_client_id",
      "user_partner_id",
      "appointment_date",
      "status",
      "created_at",
      "updated_at",
    ])};
  `);
  //reviews
  pgm.sql(`
    INSERT INTO reviews (appointment_id, user_client_id, user_partner_id, rating, comment, created_at,"updated_at")
    VALUES ${formatValues(reviews, [
      "appointment_id",
      "user_client_id",
      "user_partner_id",
      "rating",
      "comment",
      "created_at",
      "updated_at",
    ])};
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
