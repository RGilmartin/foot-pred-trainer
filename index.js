const data = require("./data.json");
const brain = require("brainjs");
var fs = require("fs");

const net = new brain.NeuralNetwork();

// Function returns an array with length of 2, first element is training data and second element is testing data
function getTrainingTestingData(wholeData, trainingPercentage) {
  let trainIndecies = [];
  let testIndecies = [];
  let trainData = [];
  let testData = [];

  while (trainIndecies.length < wholeData.length * trainingPercentage) {
    rand = Math.floor(Math.random() * wholeData.length);
    if (!trainIndecies.includes(rand)) {
      trainIndecies.push(rand);
    }
  }

  for (let i = 0; i < wholeData.length; i++) {
    if (!trainIndecies.includes(i)) {
      testIndecies.push(i);
    }
  }
  for (let i = 0; i < wholeData.length; i++) {
    if (trainIndecies.includes(i)) {
      trainData.push(wholeData[i]);
    } else {
      testData.push(wholeData[i]);
    }
  }

  return [trainData, testData];
}

const scale = (number, [inMin, inMax], [outMin, outMax]) => {
  // if you need an integer value use Math.floor or Math.ceil here
  return ((number - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
};

let trainableData = [];

for (let i = 0; i < data.length; i++) {
  trainableData.push({
    input: {
      DN: data[i]["DN"],
      YARDLN: data[i]["YARD LN"],
      DIST: data[i]["DIST"],
    },
    output: { RUN: 1 ? data[i]["PLAY TYPE"] == "Run" : 0 },
  });
}

for (let i = 0; i < trainableData.length; i++) {
  trainableData[i].input.DN = scale(trainableData[i].input.DN, [1, 4], [0, 1]);
  trainableData[i].input.YARDLN = scale(
    trainableData[i].input.YARDLN,
    [1, 100],
    [0, 1],
  );
  trainableData[i].input.DIST = scale(
    trainableData[i].input.DIST,
    [-100, 100],
    [0, 1],
  );
}

const [trainData, testData] = getTrainingTestingData(trainableData, 0.9);

console.log(net.train(trainData));
json = net.toJSON();
fs.writeFile("model.json", JSON.stringify(json));
