/* eslint-disable camelcase */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('schedules', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    date_start: {
      type: 'TEXT',
      notNull: true,
    },
    date_end: {
      type: 'TEXT',
      notNull: true,
    },
    // tambahan untuk ide antrian
    // created_at: { <-- untuk menebak waktu orang memasang schedule
    //   type: 'text',
    // },
  });

  // create constraint foreign key to column user_id from table playlists reference to column id on table users
  pgm.addConstraint(
    'schedules',
    'fk_schedules_user.id',
    'FOREIGN KEY(user_id) REFERENCES users_partner(id) ON DELETE CASCADE'
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('schedules', 'fk_schedules_user.id');
  pgm.dropTable('schedules');
};
