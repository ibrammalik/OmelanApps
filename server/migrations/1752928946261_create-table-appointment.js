/* eslint-disable camelcase */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('appointment', {
    id: {
      type: 'SERIAL',
      primaryKey: true
    },
    user_client_id: {
      type: 'VARCHAR(50)',
      references: 'users_client(id)',
      onDelete: 'CASCADE',
    },
    user_partner_id: {
      type: 'VARCHAR(50)',
      references: 'users_partner(id)',
      onDelete: 'CASCADE',
    },
    schedule_appointment_id: {
      type: 'VARCHAR(50)',
      references: 'schedules(id)',
      onDelete: 'CASCADE',
    },
    status: {
      type: 'VARCHAR(20)'
    },
    duration: {
      type: 'SMALLINT',
      notNull: true
    },
    cost_estimation: {
      type: 'DECIMAL',
      notNull: true
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
  pgm.dropTable('appointment');
};
