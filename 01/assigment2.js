let args = process.argv.slice(2);
console.log(args);
args = parseInt(args[0]);
console.log(args);

const getPrimo = (args) => {
    for(let x=2; x<args; x++) {
        console.log(x);
        if (args%x === 0 ) {
            return(`${args} No es primo `);
        }
        else {
            //continue;
        }
    }
    return(`${args} Si es primo `);
}

console.log(getPrimo(args));
