
exports.up = function(knex, Promise) {
  return knex.schema.createTable('csv', function (table) {
    table.increments();
    table.bigInteger('file_version');
    table.timestamps();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('csv');
};
