CREATE TABLE orders (
  id serial PRIMARY KEY,
  description text,
  order_type text, CHECK (order_type IN ('order', 'alert', 'consult'))
);