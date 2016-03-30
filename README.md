# Calypso API

### Table of contents
* [API](#api)
	* [`Patient`](#patient)
		* [`/patients`](#patients)
		* [`/patients/:patient_id`](#patients-patient_id)
	* [`Analysis`](#analysis)
		* [`/analysis/:patient_id`](#analysis-all)
			* [`/analysis/histogram/:patient_id`](#analysis-histogram)
			* [`/analysis/percentile/:patient_id`](#analysis-percentile)
			* [`/analysis/predict/:patient_id`](#analysis-predict)
	* [`Target`](#target)

## API
All `POST` and `PUT` requests expect a JSONObject with the `Content-Type` request header set to `application/json`.

Authenticated routes expect the `Authorization` header to be set to `Bearer <token>`.

##### Failure
All routes return a JSONObject with the following fields if an error is encountered.

| Field   | Type     | Description                  |
| ------- | -------- | ---------------------------- |
| `error` | `string` | A useful diagnostic message. |

Example error:
```
{
	"error": "This is why your request failed."
}
```

### [`Patient`](#patient)
##### [Patient object](#patient-object)
A `Patient` JSONObject with the following fields:

|   Field               | Type           | Description
| --------------------- | -------------- | ---------------------------------------------------------------------- |
|   `age` 				| `integer`      |                                                                        |
|   `alcohol` 			| `boolean`      |                                                                        |
|   `asa` 				| `integer`      |                                                                        |
|   `bleeddis` 			| `boolean`      |                                                                        |
|   `bmi` 				| `real`         |                                                                        |
|   `cardiac_surgery` 	| `boolean`      |                                                                        |
|   `caseid` 			| `integer`      |                                                                        |
|   `ccs_category` 		| `string`       | CCS category number.                                                   |
|   `chemo_radio` 		| `boolean`      |                                                                        |
|   `concurrent_proc` 	| `boolean`      |                                                                        |
|   `cpneumon` 			| `boolean`      |                                                                        |
|   `cpt` 				| `string`       | CPT code of encounter.                                                 |
|   `cpt_implant` 		| `boolean`      |                                                                        |
|   `cpt_mis` 			| `boolean`      |                                                                        |
|   `cpt_type` 			| `string`       | CPT type of patient.                                                   |
|   `diabetes` 			| `string`       | Diabetes type: ['non-insulin', 'insulin', 'no']                        |
|   `dialysis` 			| `boolean`      |                                                                        |
|   `discancr` 			| `boolean`      |                                                                        |
|   `dnr` 				| `boolean`      |                                                                        |
|   `dyspnea` 			| `string`       | Dyspnea type: ['at rest', 'moderate exertion', 'no']                   |
|   `emergency` 		| `boolean`      |                                                                        |
|   `fnstatus` 			| `string`       | Fn status: ['independent', 'partially dependent', 'totally dependent'] |
|   `general_anes` 		| `boolean`      |                                                                        |
|   `heart` 			| `boolean`      |                                                                        |
|   `hxchf` 			| `boolean`      |                                                                        |
|   `hxcopd` 			| `boolean`      |                                                                        |
|   `infx` 				| `string`       | Infection: ['SIRS', 'sepsis', 'septic shock', 'no']                    |
|   `lab_albumin` 		| `real`         |                                                                        |
|   `lab_alkphos`		| `real`         |                                                                        |
|   `lab_ast` 			| `real`         |                                                                        |
|   `lab_bili` 			| `real`         |                                                                        |
|   `lab_bun` 			| `real`         |                                                                        |
|   `lab_creatine` 		| `real`         |                                                                        |
|   `lab_hct` 			| `real`         |                                                                        |
|   `lab_inr` 			| `real`         |                                                                        |
|   `lab_plt` 			| `real`         |                                                                        |
|   `lab_ptt` 			| `real`         |                                                                        |
|   `lab_sodium` 		| `real`         |                                                                        |
|   `lab_wbc` 			| `real`         |                                                                        |
|   `liver` 			| `boolean`      |                                                                        |
|   `neuro` 			| `boolean`      |                                                                        |
|   `optime` 			| `integer`      |                                                                        |
|   `other_proc` 		| `boolean`      |                                                                        |
|   `pgy` 				| `integer`      |                                                                        |
|   `plegia` 			| `boolean`      |                                                                        |
|   `podiag` 			| `string`       | Post Diagnosis: ['neoplasm', 'infection', 'no']                        |
|   `pregnancy` 		| `boolean`      |                                                                        |
|   `preop_transfus` 	| `boolean`      |                                                                        |
|   `preop_wndinf` 		| `boolean`      |                                                                        |
|   `priorop` 			| `boolean`      |                                                                        |
|   `pvd` 				| `boolean`      |                                                                        |
|   `race` 				| `string`       | Race type: ['asian', 'black', 'other']                                 |
|   `renalfail` 		| `boolean`      |                                                                        |
|   `sex` 				| `string`       | Sex type: ['female', 'male']                                           |
|   `smoker` 			| `boolean`      |                                                                        |
|   `steroid_immunosup` | `boolean`      |                                                                        |
|   `ventilat` 			| `boolean`      |                                                                        |
|   `workrvu` 			| `real`         |                                                                        |
|   `wound` 			| `string`       | Wound type: ['contaminated', 'dirty', 'clean contaminated', 'clean']   |
|   `wtloss` 			| `boolean`      |                                                                        |
|   `year` 				| `integer`      |                                                                        |

#### [`/patients`](#patients)
##### GET
Optional: Send [`Patient`](#patient-object) fields as a JSON encoded query param to filter by those fields.

Returns an array of owned [`Patient`](#patient-object) objects.

##### POST
Expects a [`Patient`](#patient-object) JSONObject. Missing keys will take on `null` or default values.

Returns the created [`Patient`](#patient-object) JSONObject.

Example request:
```
{
	"age": 21,
	"asa": 1,
	"year": 2005
}
```

#### [`/patients/:patient_id`](#patients-patient_id)
##### GET
Returns the specific [`Patient`](#patient-object) object.

##### PUT
Expects a [`Patient`](#patient-object) JSONObject. Missing keys will not be changed.

Returns the updated [`Patient`](#patient-object) JSONObject.

Example request:
```
{
	"age": 87,
	"asa": 4,
	"year": 2005
}
```

##### DELETE
Returns the deleted [`Patient`](#patient-object) object.
