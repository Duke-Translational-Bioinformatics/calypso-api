CREATE TABLE interventions (
  preop_variable text, -- constrain to patient_variables is primary key
  label text,
  active boolean, -- 
  trigger text, -- how to parse?
  phase text, -- category
  context text, -- category
  description text
)