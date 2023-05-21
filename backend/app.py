from flask import Flask, jsonify, request
import pickle

app = Flask(__name__)

# Load the pickled model
model1 = pickle.load(open("model.pkl", "rb"))
# model = pickle.load(open('RandomForest.pkl', 'rb'))
model = pickle.load(open('classifier.pkl', 'rb'))

riceVrityList = {
    'At362': 0,
    'At405': 1,
    'Bg352': 2,
    'Bg357': 3,
    'Bg358': 4,
    'Bg360': 5,
    'Bg366': 6,
    'Bg379-2': 7,
    'Bg38': 8,
    'Bg403': 9,
    'Bg406': 10,
    'Bg407': 11,
    'Bg409': 12,
    'Bg450': 13,
    'Bg455': 14,
    'Bg745': 15,
    'Bg94-1': 16,
    'Bw364': 17,
    'Bw367': 18,
    'Ld365': 19,
    'Ld368': 20,
    'Ld408': 21
}

state_map = {
    'Anuradhapura': 0,
    'Ampara': 1,
    'Mathara': 2,
    'Kaluthara': 3,
    'Gampaha': 4,
    'Kurunagala': 5,
    'Jaffna': 6,
    'Colombo': 7,
    'Puththalama': 8,
    'Kandy': 9,
    'Mathale': 10,
    'Badulla': 11,
    'Bandarawela': 12,
    'NuwaraEliya': 13,

}


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Extract the features from the JSON request
    state_int = data["state"]
    state_str = state_map.get(state_int, "0")
    year = data["year"]
    nitrogen_prg = data["nitrogen_presentage"]
    nitrogen_Pounds_Acre = data["nitrogen_Pounds_Acre"]
    phosphorous_prg = data["phosphorous_presentage"]
    phosphorous_Pounds_Acre = data["phosphorous_Pounds_Acre"]
    potash_prg = data["potash_presentage"]
    potash_pounds_Acre = data["potash_pounds_Acre"]
    areaPlanted_acres = data["areaPlanted_acres"]
    harvested_Area_acres = data["harvested_Area_acres"]
    lint_Yield_Pounds_Harvested_Acre = data["lint_Yield_Pounds_Harvested_Acre"]

    # Make a prediction using the model
    prediction = model1.predict([[state_str, year, nitrogen_prg, nitrogen_Pounds_Acre, phosphorous_prg, phosphorous_Pounds_Acre,
                                  potash_prg, potash_pounds_Acre, areaPlanted_acres, harvested_Area_acres, lint_Yield_Pounds_Harvested_Acre]])

    # Return the prediction as a JSON response
    response = {"prediction": prediction[0]}
    return jsonify(response)


@app.route('/predictRice', methods=['POST'])
def predictRice():
    # Get the input data from the client-side
    data = request.get_json()

    # Make predictions using the loaded model
    predictionRice = model.predict(
        [[data['N'], data['P'], data['K'], data['temperature'], data['humidity'], data['ph'], data['rainfall']]])

    # Return the predicted rice variety as a JSON response
    # predictionRice[0]
    reversed_data = {value: key for key, value in riceVrityList.items()}

    result = reversed_data[predictionRice[0]]

    print(result)
    response = {"predictRice_type": result}
    return jsonify(response)


if __name__ == "__main__":
    app.run(host='192.168.8.102', debug=True)
