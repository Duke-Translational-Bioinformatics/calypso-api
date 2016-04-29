CREATE TABLE order_to_intervention (
  order_id serial REFERENCES orders (id),
  intervention_id text REFERENCES interventions (preop_variable),
  PRIMARY KEY (order_id, intervention_id)
);