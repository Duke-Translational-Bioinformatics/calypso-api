CREATE TABLE interventions (
  preop_variable text PRIMARY KEY REFERENCES patient_variables_metadata (variable_name),
  label text NOT NULL,
  active boolean NOT NULL, 
  trigger text, -- how to parse?
  phase text NOT NULL, CHECK (phase IN ('postop', 'preop')),
  context text NOT NULL, CHECK (phase IN ('risk_factor', 'outcome')),
  description text
);