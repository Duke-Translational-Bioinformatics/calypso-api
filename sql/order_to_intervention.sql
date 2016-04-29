CREATE TABLE order_to_intervention (
  order_id serial REFERENCES orders (id),
  intervention_id serial REFERENCES interventions (id),
  PRIMARY KEY (order_id, intervention_id)
);