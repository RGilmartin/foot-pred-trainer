const data = require('./data.json');

let trainableData = [{}];
trainableData.push = {input: {'DN': data[0]['DN'], 'YARD LN': data[0]['YARD LN'], 'DIST': data[0]['DIST']}, output: {"PLAY TYPE":  data[0]['PLAY TYPE']} }; 


console.log(trainableData)