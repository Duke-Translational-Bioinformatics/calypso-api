# Calypso API

# Samples

### Get Patient
http://54.186.43.170/api/patients/1

### Predict Patient
http://54.186.43.170/api/analysis/predict/1

### sorted targets
http://54.186.43.170/api/targets/patient/1

### orders of a target
http://54.186.43.170/api/orders/target/27


### Table of contents
* [TODO](#todo)
* [Setup](#setup)
* [Grunt](#grunt)
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

## [TODO](#todo)
 - Patient JSONObject description
 - SQL development cycle
 - Auth
 - Patient Route `50%`
 - Analytics Route
 - Target Route
 - Auto Model building on DB
 - CircleCI testing
 - Auto Deployment of server

## [Setup](#setup)

- Pull the project with `git clone https://github.com/Duke-Translational-Bioinformatics/calypso-api.git`
- Install the dependencies with `npm install`
- Create a copy of the local environmental vars by running `cp $PWD/server/config/local.env.sample.js $PWD/server/config/local.env.js`
- Install Postgres with `brew install postgres` or with the [`Postgres App`](http://postgresapp.com)
- Install [`plv8`](https://github.com/plv8/plv8)
	- Mac: Don't use brew to install plv8 or you will receive an error. See https://github.com/plv8/plv8/issues/101
- Install knex with `npm install -g knex`
- **Important:** Create database
	- cd into `sql` folder
	- Create tables patient_outcomes_v2 and patient_variables
	- Run Migrations with `knex migrations:latest`
	- Create other tables
- Run the server with `grunt`

## [Grunt](#grunt)

`grunt serve` will serve the development server on a development database
`grunt serve:dist` will serve the production server on a production database
`grunt test` will test the server using a test database
`grunt build` will prepare a folder of only server files
`grunt` will run test, build, and serve:dist

## [API](#api)
All `POST` and `PUT` requests expect a JSONObject with the `Content-Type` request header set to `application/json`.

Authenticated routes expect the `Authorization` header to be set to `Bearer <token>`.

##### Parsing CSV
The CSV can be entered into the DB in two ways. By the upload and automatically through the backend that reads a remote source.

Due to inconsistencies between the CSV and database as well as what databse the data should be saved to a translation matrix has been created as a map. This is located at `components > translationMatrix`. Any future additions will needed to be added to the matrix.

The translation matrix is a big object we use to compare the csv data to and create a new obj that will be sent to the patient model. The translation matrix tells us the appropriate property name, sometimes the value and even the database it should be saved to.

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

|   Field               | Type           | Description                                                            | Constraint |
| --------------------- | -------------- | ---------------------------------------------------------------------- | ---------- |
|   `age` 				| `integer`      |  Age upon admission: if age > 90, then change value to 90    | min: 1, max: 90  |
|   `alcohol` 			| `boolean`      |  Alcohol abuse > 2 drinks/day in 2 wks before admission | |   
|   `asa` 				| `integer`      |  American Society of Anesthesiology (ASA) Physical Status Classification, determined before surgery. | min: 1, max: 5|  
|   `bleeddis` 			| `boolean`      |  Conditions that predipose to bleeding. Examples include: Vitamin K deficiency, hemophilias, thrombocytopenia, chronic anticoagulation therapy that has not been discontinued prior to surgery | |                                                                     | |
|   `bmi` 				| `real`         |  Body Mass Index. Metric formula: BMI = ( Weight in Kilograms / ( Height in Meters x Height in Meters ) )  | min: 0|
|   `cardiac_surgery` 	| `boolean`      |  History of cardiac surgery  | |
|   `caseid` 			| `integer`      |                                                                        |
|   `ccs_category` 		| `string`       | Diagnosis code for the reason why surgery was performed, based on CCS category number.                                                   |
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

Patients are a combination of patient_outcomes and patient_variables.

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
