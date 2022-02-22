"""
Note this file contains _NO_ flask functionality.
Instead it makes a file that takes the input dictionary Flask gives us,
and returns the desired result.

This allows us to test if our modeling is working, without having to worry
about whether Flask is working. A short check is run at the bottom of the file.
"""

import pickle
import numpy as np

# lr_model is our simple logistic regression model
# lr_model.feature_names are the four different iris measurements
with open("rf.pickle", "rb") as f:
    rf_model = pickle.load(f)

feature_names = rf_model.feature_names

def make_api_prediction(feature_dict):
    """
    Input:
    feature_dict: a dictionary of the form {"feature_name": "value"}

    Function makes sure the features are fed to the model in the same order the
    model expects them.

    Output:
    Returns a dictionary with the following keys
      all_probs: a list of dictionaries with keys 'name', 'prob'. This tells the
                 probability of class 'name' appearing is the value in 'prob'
      most_likely_class_name: string (name of the most likely class)
      most_likely_class_prob: float (name of the most likely probability)
    """
    x_input = [feature_dict[name] for name in rf_model.feature_names]
    x_input = [0 if val == '' else float(val) for val in x_input]

    pred_probs = rf_model.predict_proba([x_input]).flat

    probs = [{'name': rf_model.target_names[index], 'prob': pred_probs[index]}
             for index in np.argsort(pred_probs)[::-1]]

    response = {
        'all_probs': probs,
        'most_likely_class_name': probs[0]['name'],
        'most_likely_class_prob': probs[0]['prob'],
    }

    return response

# This section checks that the prediction code runs properly
# To run, type "python predictor_api.py" in the terminal.
#
# The if __name__='__main__' section ensures this code only runs
# when running this file; it doesn't run when importing
if __name__ == '__main__':
    from pprint import pprint
    print("Checking to see what setting all params to 0 predicts")
    features = {f:'0' for f in feature_names}
    print('Features are')
    pprint(features)

    response = make_api_prediction(features)
    print("The returned object")
    pprint(response)
