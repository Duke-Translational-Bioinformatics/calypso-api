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

def main():
	info = {
		'info': {
			'cardiac_complications': clf['cardiac_complications'].coef_[0].tolist(),
			'thrombeombolic_complications': clf['thrombeombolic_complications'].coef_[0].tolist(),
			'morbidity': clf['morbidity'].coef_[0].tolist(),
			'mortality': clf['mortality'].coef_[0].tolist(),
			'respiratory_complications': clf['respiratory_complications'].coef_[0].tolist(),
			'renal_complications': clf['renal_complications'].coef_[0].tolist(),
			'systemic_septic_complications': clf['systemic_septic_complications'].coef_[0].tolist(),
			'urinary_tract_infections': clf['urinary_tract_infections'].coef_[0].tolist(),
			'wound_compilcations': clf['wound_compilcations'].coef_[0].tolist(),
			'reoperations': clf['reoperations'].coef_[0].tolist(),
			'neurologic_complications': clf['neurologic_complications'].coef_[0].tolist()
		}
	}

	print json.dumps(info)


if __name__ == "__main__":
   main()