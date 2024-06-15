
//let args = 'reconocer';
//node assigment1.js reconocerr

let args = process.argv.slice(2);

console.log(args);


let palabra = [...args[0]];

const esPalindromo =  pregunta(palabra);
console.log(`${esPalindromo}`);


function pregunta(palabra){
    let y = palabra.length - 1;
    let respuesta = '';
    for(let x=0; x<palabra.length; x++){
        console.log(x,y);
        console.log(palabra[x], palabra[y]);
        if(palabra[x]===palabra[y]){
            respuesta = 'Es un palíndromo';
        }else{
            respuesta = 'No es un palíndromo';
            break;
        }
    y--;
   }
   return respuesta;
}