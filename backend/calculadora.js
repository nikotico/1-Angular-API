'use strict'

//node calculadora.js 1 2

var params = process.argv.slice(2);//Parametros que llegan por la consola
// si pusiera 1 el primer parametro seria toda la ruta de ejecucion, por eso empieza en 2

var numero1 = parseFloat(params[0]);//Castea a un numero flotante
var numero2 = parseFloat(params[1]);

var plantilla = `
La suma es: ${numero1 + numero2}
La resta es: ${numero1 - numero2}
La multiplicación: ${numero1 * numero2}
La división: ${numero1 / numero2}
`;

console.log(plantilla);