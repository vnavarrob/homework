let args = process.argv.slice(2);
//console.log(args);
args = parseInt(args[0]);
//console.log(args);

let labelOutput = '';

for (let x = args; x>=0 ; x--) {
    labelOutput='';
    for (let y=0 ; y<args; y++){
        labelOutput = labelOutput + x.toString();
    }
    console.log(labelOutput); 
}

for (let x = 1; x<=args ; x++) {
    labelOutput='';
    for (let y=0 ; y<args; y++){
        labelOutput = labelOutput + x.toString();
    }
    console.log(labelOutput); 
}