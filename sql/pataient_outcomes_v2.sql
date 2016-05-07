CREATE TABLE patient_outcomes_v2(
  caseid integer PRIMARY KEY REFERENCES patient_variables(caseid) ON DELETE CASCADE,
  wound_compilcations boolean, -- ssi
  urinary_tract_infections boolean, -- uti
  reoperations boolean, --reoperation
  postoperative_hospital_stay integer, -- los
  morbidity boolean,
  mortality boolean,
  respiratory_complications boolean, -- resp
  thrombeombolic_complications boolean, -- dvtpe
  renal_complications boolean, -- renal
  neurologic_complications boolean, -- neuro,
  cardiac_complications boolean, -- cardiac
  systemic_septic_complications boolean -- septic
);