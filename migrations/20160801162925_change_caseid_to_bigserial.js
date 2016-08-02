
exports.up = function(knex) {
  return knex.schema.raw(
    `
    ALTER TABLE patient_variables DROP CONSTRAINT calypso_pkey;
    ALTER TABLE patient_variables ADD PRIMARY KEY (caseid);

    CREATE SEQUENCE patient_variables_caseid_seq;
    ALTER TABLE patient_variables ALTER COLUMN caseid SET NOT NULL;
    ALTER TABLE patient_variables ALTER COLUMN caseid SET DEFAULT nextval('patient_variables_caseid_seq');
    ALTER SEQUENCE patient_variables_caseid_seq OWNED BY NONE;
    `
  );
};

exports.down = function(knex) {
  return knex.schema.raw("ALTER TABLE patient_variables ALTER COLUMN caseid TYPE integer");
};
