/* eslint-disable camelcase */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("reviews", {
    id: { type: "serial", primaryKey: true },
    appointment_id: {
      type: "integer",
      references: "appointment(id)",
      onDelete: "CASCADE",
    },
    user_client_id: {
      type: "varchar(50)",
      references: "users_client(id)",
      onDelete: "CASCADE",
    },
    user_partner_id: {
      type: "varchar(50)",
      references: "users_partner(id)",
      onDelete: "CASCADE",
    },
    rating: { type: "integer" },
    comment: { type: "text" },
    created_at: {
      type: "TEXT",
      notNull: true,
    },
    updated_at: {
      type: "TEXT",
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
  pgm.dropTable("reviews");
};
