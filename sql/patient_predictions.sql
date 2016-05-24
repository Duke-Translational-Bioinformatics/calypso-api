CREATE TABLE patient_predictions(
  caseid integer PRIMARY KEY REFERENCES patient_variables(caseid) ON DELETE CASCADE,
  cardiac_complications real, -- cardiac
  morbidity real,
  mortality real,
  neurologic_complications real, -- neuro,
  renal_complications real, -- renal
  reoperations real, --reoperation
  respiratory_complications real, -- resp
  systemic_septic_complications real, -- septic
  wound_compilcations real, -- ssi
  urinary_tract_infections real, -- uti
  thrombeombolic_complications real -- dvtpe
);