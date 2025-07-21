/* eslint-disable camelcase */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('users_client', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    username: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true
    },
    fullname: {
      type: 'TEXT',
      notNull: true
    },
    password: {
      type: 'TEXT',
      notNull: true
    },
    age: {
      type: 'INTEGER',
      notNull: false
    },
    address: {
      type: 'TEXT',
      notNull: false
    },
    biodata: {
      type: 'TEXT',
      notNull: false
    },
    'photo_url': {
      type: 'TEXT',
      notNull: false
    },
    phone_number: {
      type: 'VARCHAR(20)',
      notNull: false
    },
    partner_name: {
      type: 'TEXT',
      notNull: false
    },
    emergency_contact: {
      type: 'VARCHAR(20)',
      notNull: false
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
  pgm.dropTable('users_client');
};
