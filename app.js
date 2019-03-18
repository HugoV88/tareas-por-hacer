//Requires
const { argv } = require('./config/yargs');
const { crear, listar, actualizar, borrar } = require('./por-hacer/por-hacer');
const colors = require('colors');

//Variables
let comando = argv._[0];

//Menu
switch (comando) {
    case 'crear':
        console.log(crear(argv.descripcion));
        break;
    case 'listar':
        let listado = listar(argv.completado);
        console.log('===== Lista de tareas por hacer =====\n'.green);
        for (let tarea of listado) {
            console.log(`Tarea: ${tarea.descripcion}`)
            console.log(`Estado: ${tarea.completado}\n`)
        }
        console.log('\n====================================='.green);
        break;
    case 'actualizar':
        actualizar(argv.descripcion, argv.completado)
            .then(archivo => console.log(archivo))
            .catch(err => console.log(err))
        break;
    case 'borrar':
        borrar(argv.descripcion)
            .then(archivo => console.log(archivo))
            .catch(err => console.log(err))
        break;
    default:
        console.log('Comando no reconocido');
}