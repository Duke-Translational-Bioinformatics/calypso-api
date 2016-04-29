CREATE TABLE patient_outcomes (
  caseid integer NOT NULL,
  outcome_ssi_any boolean,
  outcome_thirtyday_mortality boolean,
  outcome_morbidity_any boolean,
  outcome_pna boolean,
  outcome_dvt boolean,
  outcome_uti boolean,
  outcome_renal_failure boolean,
  outcome_cardiac boolean,
  outcome_los integer,
  CONSTRAINT calypso_outcome_pkey PRIMARY KEY (caseid)
)