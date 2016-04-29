CREATE OR REPLACE FUNCTION parsable(trigger text)
  RETURNS boolean AS
	$BODY$
		var self = {};
		try {
		    eval(trigger);
		} catch (e) {
		    return false;
		}
		return true;
	$BODY$
  LANGUAGE plv8;

CREATE TABLE interventions (
  id serial PRIMARY KEY,
  preop_variable text REFERENCES patient_variables_metadata (variable_name),
  label text NOT NULL,
  active boolean NOT NULL, 
  trigger text, CHECK (parsable(trigger)),
  phase text NOT NULL, CHECK (phase IN ('postop', 'preop')),
  context text NOT NULL, CHECK (context IN ('risk_factor', 'outcome')),
  description text
);