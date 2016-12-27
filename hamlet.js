const fs = require('fs');
const _ = require('lodash');

var textArr = null;
var textMap = {};

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('./hamlet.txt', 'utf-8', (err, data) => {
      if (err) reject(err);

      //regex to remove bogus chars
      data = data.replace(/[^\w\s]/gi, '')
      resolve(data);
    });
  });
}

function prepareArray(text) {
  return new Promise((resolve, reject) => {
    textArr = text.split(' ');
    textArr.forEach((v, k) => {
      var testBreak = v.split('\n');
      if (testBreak[1]) {
        delete textArr[k];
        testBreak.forEach((value) => {
          textArr.push(value);
        });
      }
    });
    resolve(textArr);
  })

}

readFile().then((result) => {
  prepareArray(result).then((arr) => {
    textArr.map((v, k) => {
      if(typeof textMap[v] === "number") {
        textMap[v]++;
      } else {
        textMap[v] = 1;
      }
    });

    console.log(textMap);
  });
});
