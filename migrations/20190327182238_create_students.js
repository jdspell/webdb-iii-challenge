
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl){
    tbl.increments();

    tbl
      .string('name', 256)
      .notNullable()

    //foreign key
    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
