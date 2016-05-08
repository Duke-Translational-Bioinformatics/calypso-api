import sys, getopt
import os
import json
import cPickle as pickle
import numpy as np
import warnings

dir = os.path.dirname(__file__)

clf = {
	'cardiac_complications': pickle.load(open(dir + '/predictive_models/cardiac_complications.p', 'rb')),
	'thrombeombolic_complications': pickle.load(open(dir + '/predictive_models/thrombeombolic_complications.p', 'rb')),
	'morbidity': pickle.load(open(dir + '/predictive_models/morbidity.p', 'rb')),
	'mortality': pickle.load(open(dir + '/predictive_models/mortality.p', 'rb')),
	'respiratory_complications': pickle.load(open(dir + '/predictive_models/respiratory_complications.p', 'rb')),
	'renal_complications': pickle.load(open(dir + '/predictive_models/renal_complications.p', 'rb')),
	'systemic_septic_complications': pickle.load(open(dir + '/predictive_models/systemic_septic_complications.p', 'rb')),
	'urinary_tract_infections': pickle.load(open(dir + '/predictive_models/urinary_tract_infections.p', 'rb')),
	'wound_compilcations': pickle.load(open(dir + '/predictive_models/wound_compilcations.p', 'rb')),
	'reoperations': pickle.load(open(dir + '/predictive_models/reoperations.p', 'rb')),
	'neurologic_complications': pickle.load(open(dir + '/predictive_models/neurologic_complications.p', 'rb')),
}

continous_vars = [
	{
		'name': 'AGE',
		'index': 5,
		'mean': 55.34176056,
		'std': 17.16799824
	}, {
		'name': 'BMI',
		'index': 27,
		'mean': 29.78516345,
		'std': 8.284061419
	}, {
		'name': 'LAB_SODIUM',
		'index': 47,
		'mean': 138.9628371,
		'std': 3.125906274
	}, {
		'name': 'LAB_BUN',
		'index': 48,
		'mean': 16.18489156,
		'std': 10.27300854
	}, {
		'name': 'LAB_CREATINE',
		'index': 49,
		'mean': 1.058180976,
		'std': 0.956915243
	}, {
		'name': 'LAB_ALBUMIN',
		'index': 50,
		'mean': 3.931857437,
		'std': 0.661011214
	}, {
		'name': 'LAB_BILI',
		'index': 51,
		'mean': 0.692964361,
		'std': 0.769292651
	}, {
		'name': 'LAB_AST',
		'index': 52,
		'mean': 30.03984606,
		'std': 38.49276553
	}, {
		'name': 'LAB_ALKPHOS',
		'index': 53,
		'mean': 88.83489805,
		'std': 58.7740041
	}, {
		'name': 'LAB_WBC',
		'index': 54,
		'mean': 8.308680658,
		'std': 3.992318252
	}, {
		'name': 'LAB_HCT',
		'index': 55,
		'mean': 39.18487341,
		'std': 5.330334913
	}, {
		'name': 'LAB_PLT',
		'index': 56,
		'mean': 261.7530622,
		'std': 90.7106664
	}, {
		'name': 'LAB_PTT',
		'index': 57,
		'mean': 29.94302455,
		'std': 7.366418335
	}, {
		'name': 'LAB_INR',
		'index': 58,
		'mean': 1.077051524,
		'std': 0.288072919
	}, {
		'name': 'WORKRVU',
		'index': 61,
		'mean': 15.80514132,
		'std': 9.24601534
	}, {
		'name': 'PGY',
		'index': 62,
		'mean': 2.173242199,
		'std': 2.259867544
	}, {
		'name': 'OPTIME',
		'index': 64,
		'mean': 109.61065,
		'std': 89.8935085
	}]

def main(argv):
	warnings.simplefilter("ignore")
	preds = map(float, np.array(sys.argv[1:])[0].split(','))
	for ct_obj in continous_vars:
		preds[ct_obj['index']] = (preds[ct_obj['index']] - ct_obj['mean'])/ct_obj['std']		

	predict = {
		'predict': {
			'cardiac_complications': clf['cardiac_complications'].predict_proba(preds)[0][1],
			'thrombeombolic_complications': clf['thrombeombolic_complications'].predict_proba(preds)[0][1],
			'morbidity': clf['morbidity'].predict_proba(preds)[0][1],
			'mortality': clf['mortality'].predict_proba(preds)[0][1],
			'respiratory_complications': clf['respiratory_complications'].predict_proba(preds)[0][1],
			'renal_complications': clf['renal_complications'].predict_proba(preds)[0][1],
			'systemic_septic_complications': clf['systemic_septic_complications'].predict_proba(preds)[0][1],
			'urinary_tract_infections': clf['urinary_tract_infections'].predict_proba(preds)[0][1],
			'wound_compilcations': clf['wound_compilcations'].predict_proba(preds)[0][1],
			'reoperations': clf['reoperations'].predict_proba(preds)[0][1],
			'neurologic_complications': clf['neurologic_complications'].predict_proba(preds)[0][1]
		}
	}

	print json.dumps(predict)


if __name__ == "__main__":
   main(sys.argv[1:])

