CREATE TABLE intervention_to_literature (
  intervention_id serial REFERENCES interventions (id),
  literature_id serial REFERENCES literatures (id),
  PRIMARY KEY (intervention_id, literature_id)
);