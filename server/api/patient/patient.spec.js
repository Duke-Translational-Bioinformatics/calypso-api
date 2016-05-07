var app = require('../../app');
var request = require('supertest');
var should = require('should');
var Patient = require('./patient.model');

describe('Patient API:', function () {

  describe('MODEL Patient.predictors_to_array', function () {
    it('Values: Should get array of patient predictors', function (done) {
      var values = JSON.parse('{"year":2005,"sex":"male","age":63,"smoker":true,"alcohol":false,"dnr":false,"ventilat":true,"hxcopd":false,"cpneumon":false,"hxchf":false,"cardiac_surgery":false,"renalfail":false,"dialysis":false,"discancr":false,"preop_wndinf":false,"steroid_immunosup":false,"wtloss":false,"bleeddis":false,"preop_transfus":false,"pregnancy":false,"priorop":false,"race":null,"bmi":27.9854,"asa":4,"diabetes":"no","dyspnea":"no","fnstatus":"totally dependent","liver":false,"heart":true,"pvd":false,"neuro":false,"plegia":false,"chemo_radio":false,"infx":"no","lab_sodium":144,"lab_bun":41,"lab_creatine":1.6,"lab_albumin":2.4,"lab_bili":0.6,"lab_ast":12,"lab_alkphos":43,"lab_wbc":9.6,"lab_hct":25.5,"lab_plt":267,"lab_ptt":23.2,"lab_inr":1.4,"podiag":"no","workrvu":14.35,"pgy":6,"emergency":false,"optime":189,"general_anes":true,"other_proc":true,"concurrent_proc":false,"wound":"clean","cpt_type":"OFFICIAL4","ccs_category":null,"cpt":"33881","cpt_mis":true,"cpt_implant":false}');
      var test_patient = new Patient(null, values);
      test_patient.predictors_to_array.then(function (predictors_array) {
        should.exist(predictors_array);
        done();
      }, function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('Id: Should get array of patient predictors', function (done) {
      var test_patient = new Patient(1);
      test_patient.predictors_to_array.then(function (predictors_array) {
        should.exist(predictors_array);
        done();
      }, function (err) {
        should.not.exist(err);
        done();
      });
    });
  });

  describe('MODEL Patient.predictors_to_array(id)', function () {

  });

  describe('GET /api/patients', function () {
    it('should get a patient', function (done) {
      request(app)
        .get('/api/patients/1')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          should.exist(res.body);
          done();
        });
    });

    it('should not get a patient', function (done) {
      var values = encodeURIComponent(JSON.stringify({
        "caseid": 1,
        "year": 2005,
        "sex": "male",
        "age": 63,
        "smoker": true,
        "alcohol": false,
        "dnr": false,
        "ventilat": true,
        "hxcopd": false,
        "cpneumon": false,
        "hxchf": false,
        "cardiac_surgery": false,
        "renalfail": false,
        "dialysis": false,
        "discancr": false,
        "preop_wndinf": false,
        "steroid_immunosup": false,
        "wtloss": false,
        "bleeddis": false,
        "preop_transfus": false,
        "pregnancy": false,
        "priorop": false,
        "race": null,
        "bmi": 27.9854,
        "asa": 4,
        "diabetes": "no",
        "dyspnea": "no",
        "fnstatus": "totally dependent",
        "liver": false,
        "heart": true,
        "pvd": false,
        "neuro": false,
        "plegia": false,
        "chemo_radio": false,
        "infx": "no",
        "lab_sodium": 144,
        "lab_bun": 41,
        "lab_creatine": 1.6,
        "lab_albumin": 2.4,
        "lab_bili": 0.6,
        "lab_ast": 12,
        "lab_alkphos": 43,
        "lab_wbc": 9.6,
        "lab_hct": 25.5,
        "lab_plt": 267,
        "lab_ptt": 23.2,
        "lab_inr": 1.4,
        "podiag": "no",
        "workrvu": 14.35,
        "pgy": 6,
        "emergency": false,
        "optime": 189,
        "general_anes": true,
        "other_proc": true,
        "concurrent_proc": false,
        "wound": "clean",
        "cpt_type": "OFFICIAL4",
        "ccs_category": null,
        "cpt": "33881",
        "cpt_mis": true,
        "cpt_implant": false
      }));
      request(app)
        .get('/api/patients/0')
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);
          should.exist(res.body);
          done();
        });
    });
  });
});
