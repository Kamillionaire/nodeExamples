var argv = process.argv;
var param = process.argv.slice(2, process.argv.length);
var sum = 0;
function add() {
    param.map(function (v) {
        sum = sum + Number(v);
    });
    return "The sum is: " + sum;
}
console.log(add());
process.exit();
