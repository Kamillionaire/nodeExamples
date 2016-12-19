let argv = process.argv;
let param = process.argv.slice(2, process.argv.length); //remove node param
let sum = 0;

function add() {
  param.map((v) => {
    sum = sum + Number(v);
  });

  return `The sum is: ${sum}`;
}

console.log(add());

process.exit();
