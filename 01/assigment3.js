

let args = process.argv.slice(2);
console.log(args);
args = args.map(Number);  
console.log(args);

console.log(`Numero ordenados: ${putSomeOrder(args)}`);


function otroCiclo(args){
    for (let x=0; x < args.length; x++) {
        if (args[x] > args[x+1]) { 
            return true; 
        } //if
       // else return false;
    }
    return false;
}

function putSomeOrder(args){
    let continuar = true;
    let aux;
    
    while (otroCiclo(args) === true){
//        if (otroCiclo(args) === true ){
            for (let x=0; x < args.length; x++) {
                if(args[x] > args[x+1]){
                    aux = args[x+1];
                    args[x+1] = args[x];
                    args[x] = aux;
                }
            }
 //       } 
    } //while
    return args;
}