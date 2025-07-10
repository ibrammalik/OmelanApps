/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('users_partner', {
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
      type: 'INTEGER'
    },
    address: {
      type: 'TEXT'
    }
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
