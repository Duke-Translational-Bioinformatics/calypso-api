CREATE TABLE intervention_to_literature (
  intervention_id text REFERENCES interventions (preop_variable),
  literature_id serial REFERENCES literatures (id),
  PRIMARY KEY (intervention_id, literature_id)
);