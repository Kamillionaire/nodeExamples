let possible = [
  'You will have great luck',
  'You will have bad luck',
  'You are a master of your own destiny, stop playing the lottery'
];

let r = Math.floor(Math.random() * possible.length);

console.log(possible[r]);
process.exit();
