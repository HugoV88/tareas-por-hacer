//Objetos de comandos
const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Describe la tarea por hacer'
}
const completado = {
    alias: 'c',
    type: 'boolean',
    desc: 'Completa la tarea por hacer'
}

//Yargs
const argv = require('yargs')
    .command('crear', 'Crea tarea por hacer', {
        descripcion,
        completado
    })
    .command('listar', 'Muestra en consola lista de tareas', {
        completado
    })
    .command('actualizar', 'Actualiza tarea por hacer', {
        descripcion,
        completado
    })
    .command('borrar', 'Elimina tarea por hacer', {
        descripcion
    })
    .argv;

//Exports
module.exports = {
    argv
}