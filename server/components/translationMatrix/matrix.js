'use strict';

let translationMatrix = {
  CASEID: {
    cat: "caseid"
  },
  PREOP_AGE: {
    cat: "age",
    db: "patient_variables"
  },
  PREOP_MALE: {
    cat: "sex",
    value: "male",
    db: "patient_variables"
  },
  PREOP_RACE_WHITE: {
    cat: "race",
    value: "white",
    db: "patient_variables"
  },
  PREOP_RACE_BLACK: {
    cat: "race",
    value: "black",
    db: "patient_variables"
  },
  PREOP_RACE_ASIAN: {
    cat: "race",
    value: "asian",
    db: "patient_variables"
  },
  PREOP_RACE_OTHER: {
    cat: "race",
    value: "other",
    db: "patient_variables"
  },
  PREOP_ETHNICITY_HISPANIC: {
    cat: "ethnicity",
    value: "hispanic",
    db: "patient_variables"
  },
  PREOP_BMI: {
    cat: "bmi",
    db: "patient_variables"
  },
  PREOP_YEAR: {
    cat: "year",
    db: "patient_variables"
  },
  PREOP_ASA_1: {
    cat: "asa",
    value: 1,
    db: "patient_variables"
  },
  PREOP_ASA_2: {
    cat: "asa",
    value: 2,
    db: "patient_variables"
  },
  PREOP_ASA_3: {
    cat: "asa",
    value: 3,
    db: "patient_variables"
  },
  PREOP_ASA_4: {
    cat: "asa",
    value: 4,
    db: "patient_variables"
  },
  PREOP_ASA_5: {
    cat: "asa",
    value: 5,
    db: "patient_variables"
  },
  PREOP_DIABETES_INSULIN: {
    cat: "diabetes",
    value: "insulin",
    db: "patient_variables"
  },
  PREOP_DIABETES_ORAL: {
    cat: "diabetes",
    value: "diabetes",
    db: "patient_variables"
  },
  PREOP_SMOKER: {
    cat: "smoker",
    db: "patient_variables"
  },
  PREOP_ALCOHOL: {
    cat: "alcohol",
    db: "patient_variables"
  },
  PREOP_DYSPNEA_AT_REST: {
    cat: "dyspnea",
    value: "at rest",
    db: "patient_variables"
  },
  PREOP_DYSPNEA_MODERATE_EXERTION: {
    cat: "dyspnea",
    value: "moderate exertion",
    db: "patient_variables"
  },
  PREOP_DNR: {
    cat: "dnr",
    db: "patient_variables"
  },
  PREOP_FNSTATUS_INDEPENDENT: {
    cat: "fnstatus",
    value: "independent",
    db: "patient_variables"
  },
  PREOP_FNSTATUS_TOTALLY_DEP: {
    cat: "fnstatus",
    value: "totally dep",
    db: "patient_variables"
  },
  PREOP_FNSTATUS_PARTIAL_DEP: {
    cat: "fnstatus",
    value: "parital dep",
    db: "patient_variables"
  },
  PREOP_VENTILAT: {
    cat: "ventilat",
    db: "patient_variables"
  },
  PREOP_HXCOPD: {
    cat: "hxcopd",
    db: "patient_variables"
  },
  PREOP_CPNEUMON: {
    cat: "cpneumon",
    db: "patient_variables"
  },
  PREOP_LIVER: {
    cat: "liver",
    db: "patient_variables"
  },
  PREOP_HXCHF: {
    cat: "hxchf",
    db: "patient_variables"
  },
  PREOP_HEART: {
    cat: "heart",
    db: "patient_variables"
  },
  PREOP_CARDIAC_SURGERY: {
    cat: "cardiac_surgery",
    db: "patient_variables"
  },
  PREOP_PVD: {
    cat: "pvd",
    db: "patient_variables"
  },
  PREOP_RENALFAIL: {
    cat: "renalfail",
    db: "patient_variables"
  },
  PREOP_DIALYSIS: {
    cat: "dialysis",
    db: "patient_variables"
  },
  PREOP_NEURO: {
    cat: "neuro",
    db: "patient_variables"
  },
  PREOP_PLEGIA: {
    cat: "plegia",
    db: "patient_variables"
  },
  PREOP_DISCANCR: {
    cat: "discancr",
    db: "patient_variables"
  },
  PREOP_STEROID_IMMUNOSUP: {
    cat: "steroid_immunosup",
    db: "patient_variables"
  },
  PREOP_WNDINF: {
    cat: "preop_wndinf",
    db: "patient_variables"
  },
  PREOP_WTLOSS: {
    cat: "wtloss",
  },
  PREOP_BLEEDDIS: {
    cat: "bleedis",
    db: "patient_variables"
  },
  PREOP_TRANSFUS: {
    cat: "preop_transfus",
  },
  PREOP_CHEMO_RADIO: {
    cat: "chemo_radio",
    db: "patient_variables"
  },
  PREOP_INFX_SIRS: {
    cat: "infx",
    value: "sirs",
    db: "patient_variables"
  },
  PREOP_INFX_SEPSIS: {
    cat: "infx",
    value: "sepsis",
    db: "patient_variables"
  },
  PREOP_INFX_SEPTIC_SHOCK: {
    cat: "infx",
    value: "septic shock",
    db: "patient_variables"
  },
  PREOP_PREGNANCY: {
    cat: "pregnancy",
    db: "patient_variables"
  },
  PREOP_PRIOROP: {
    cat: "priorop",
    db: "patient_variables"
  },
  LAB_SODIUM: {
    cat: "lab_sodium",
    db: "patient_variables"
  },
  LAB_BUN: {
    cat: "lab_bun",
    db: "patient_variables"
  },
  LAB_CREATINE: {
    cat: "lab_creatine",
    db: "patient_variables"
  },
  LAB_ALBUMIN: {
    cat: "lab_albumin",
    db: "patient_variables"
  },
  LAB_BILI: {
    cat: "lab_bili",
    db: "patient_variables"
  },
  LAB_AST: {
    cat: "lab_ast",
    db: "patient_variables"
  },
  LAB_ALKPHOS: {
    cat: "lab_alkphos",
    db: "patient_variables"
  },
  LAB_WBC: {
    cat: "lab_wbc",
    db: "patient_variables"
  },
  LAB_HCT: {
    cat: "lab_hct",
    db: "patient_variables"
  },
  LAB_PLT: {
    cat: "lab_plt",
    db: "patient_variables"
  },
  LAB_PTT: {
    cat: "lab_ptt",
    db: "patient_variables"
  },
  LAB_INR: {
    cat: "lab_inr",
    db: "patient_variables"
  },
  PODIAG_ICD10: {
    cat: ""
  },
  PODIAG_TYPE_CCS: {
    cat: "ccs_category",
    db: "patient_variables"
  },
  PODIAG_TYPE_NEOPLASM: {
    cat: "podiag",
    value: "neoplasm",
    db: "patient_variables"
  },
  PODIAG_TYPE_INFECTION: {
    cat: "podiag",
    value: "infection",
    db: "patient_variables"
  },
  INTRAOP_CPT: {
    cat: "cpt",
    db: "patient_variables"
  },
  INTRAOP_CPT_MIS: {
    cat: "cpt_mis",
    db: "patient_variables"
  },
  INTRAOP_CPT_TYPE_IMPLANT: {
    cat: "cpt_implant",
    db: "patient_variables"
  },
  INTRAOP_WORKRVU_ALL: {
    cat: ""
  },
  INTRAOP_WORKRVU_PRIM_TEAM: {
    cat: "workrvu",
    value: "prim team",
    db: "patient_variables"
  },
  INTRAOP_GENERAL_ANES: {
    cat: "general_anes",
    db: "patient_variables"
  },
  INTRAOP_OTHER_PROC: {
    cat: "other_proc",
    db: "patient_variables"
  },
  INTRAOP_CONCURRENT_PROC: {
    cat: "concurrent_proc",
    db: "patient_variables"
  },
  INTRAOP_PGY: {
    cat: "pgy",
    db: "patient_variables"
  },
  INTRAOP_EMERGENCY: {
    cat: "emergency",
    db: "patient_variables"
  },
  INTRAOP_WOUND_CLEAN: {
    cat: "wound",
    value: "clean",
    db: "patient_variables"
  },
  INTRAOP_WOUND_CLEANCONTAM: {
    cat: "wound",
    value: "cleancontam",
    db: "patient_variables"
  },
  INTRAOP_WOUND_CONTAMINATED: {
    cat: "wound",
    value: "contaminated",
    db: "patient_variables"
  },
  INTRAOP_WOUND_DIRTY: {
    cat: "wound",
    value: "dirty",
    db: "patient_variables"
  },
  INTRAOP_OPTIME: {
    cat: "optime",
    db: "patient_variables"
  },
  OUTCOME_BLEED: {
    cat: "",
    db: "patient_outcomes"
  },
  OUTCOME_SSI_SUPERFICIAL: {
    cat: "wound_compilcations",
    db: "patient_outcomes"
  },
  OUTCOME_SSI_DEEP: {
    cat: "wound_complications",
    db: "patient_outcomes"
  },
  OUTCOME_SSI_ORGSPCSSI: {
    cat: "wound_complications",
    db: "patient_outcomes"
  },
  OUTCOME_SSI_DEHIS: {
    cat: "wound_complications",
    db: "patient_outcomes"
  },
  OUTCOME_PNA: {
    cat: "respiratory_complications",
    db: "patient_outcomes"
  },
  OUTCOME_REINTUBATION: {
    cat: "respiratory_complications",
    db: "patient_outcomes"
  },
  OUTCOME_PULMON_EMBOL: {
    cat: "thrombeombolic_complications",
    db: "patient_outcomes"
  },
  OUTCOME_DVT: {
    cat: "thrombeombolic_complications",
    db: "patient_outcomes"
  },
  OUTCOME_FAIL_VENT_WEAN: {
    cat: "respiratory_complications",
    db: "patient_outcomes"
  },
  OUTCOME_RENAL_INSUFF: {
    cat: "renal_complications",
    db: "patient_outcomes"
  },
  OUTCOME_DIALYSIS: {
    cat: "renal_complications",
    db: "patient_outcomes"
  },
  OUTCOME_CNS_UTI: {
    cat: "urinary_tract_infections",
    db: "patient_outcomes"
  },
  OUTCOME_CNS_CVA: {
    cat: "neurologic_complications",
    db: "patient_outcomes"
  },
  OUTCOME_CNS_COMA: {
    cat: "neurologic_complications",
    db: "patient_outcomes"
  },
  OUTCOME_PERIPHERAL_NERVE_INJ: {
    cat: "neurologic_complications",
    db: "patient_outcomes"
  },
  OUTCOME_CARD_ARREST: {
    cat: "cardiac_complications",
    db: "patient_outcomes"
  },
  OUTCOME_MI: {
    cat: "cardiac_complications",
    db: "patient_outcomes"
  },
  OUTCOME_GRAFT_FAIL: {
    cat: "",
    db: "patient_outcomes"
  },
  OUTCOME_SEPSIS: {
    cat: "systemic_septic_complications",
    db: "patient_outcomes"
  },
  OUTCOME_SEP_SHOCK: {
    cat: "systemic_septic_complications",
    db: "patient_outcomes"
  },
  OUTCOME_REOPERATION: {
    cat: "reoperations",
    db: "patient_outcomes"
  },
  OUTCOME_SSI_ANY: {
    cat: "",
    db: "patient_outcomes"
  },
  OUTCOME_MORBIDITY_ANY: {
    cat: "morbidity",
    db: "patient_outcomes"
  },
  OUTCOME_MORBIDITY_MAJOR: {
    cat: "",
    db: "patient_outcomes"
  },
  "OUTCOME_LOS": {
    cat: "postoperative_hospital_stay",
    db: "patient_outcomes"
  },
  OUTCOME_DISCHARGE_NURSING_TRANSF: {
    cat: "",
    db: "patient_outcomes"
  },
  OUTCOME_DISCHARGE_REHAB: {
    cat: "",
    db: "patient_outcomes"
  },
  OUTCOME_DISCHARGE_EXPIRED: {
    cat: "",
    db: "patient_outcomes"
  },
  OUTCOME_THIRTYDAY_READMISSION: {
    cat: "",
    db: "patient_outcomes"
  },
  OUTCOME_THIRTYDAY_MORTALITY: {
    cat: "mortality",
    db: "patient_outcomes"
  }
};

module.exports =  translationMatrix;
