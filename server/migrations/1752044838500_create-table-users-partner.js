/* eslint-disable camelcase */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('users_partner', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    fullname: {
      type: 'TEXT',
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    age: {
      type: 'INTEGER',
      notNull: false,
    },
    address: {
      type: 'TEXT',
      notNull: false,
    },
    biodata: {
      type: 'TEXT',
      notNull: false,
    },
    photo_url: {
      type: 'TEXT',
      notNull: false,
    },
    phone_number: {
      type: 'VARCHAR(20)',
      notNull: false,
    },
    average_rating: {
      type: 'DECIMAL',
      notNull: false,
      default: null,
    },
    experience: {
      type: 'TEXT',
      notNull: false,
    },
    specialist: {
      type: 'TEXT',
      notNull: false,
    },
    rate_per_hour: {
      type: 'DECIMAL',
      default: null,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('users_partner');
};
