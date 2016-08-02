
exports.up = function(knex) {
  return knex.schema.raw(
    `
    ALTER TABLE patient_variables DROP CONSTRAINT calypso_race_check;
    ALTER TABLE patient_variables ADD CONSTRAINT calypso_race_check CHECK (race = ANY (ARRAY['asian'::text, 'black'::text, 'white'::text, 'other'::text]));
    `
  );
};

exports.down = function(knex) {
  return knex.schema.raw(
    `
    ALTER TABLE patient_variables DROP CONSTRAINT calypso_race_check;
    ALTER TABLE patient_variables ADD CONSTRAINT calypso_race_check CHECK (race = ANY (ARRAY['asian'::text, 'black'::text, 'other'::text]));
    `
  );
};
