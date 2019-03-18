//Requires
const fs = require('fs');

//Variables
let listadoPorHacer = [];

//Funcion para borrar tareas
const borrar = (descripcion) => {
    return new Promise((resolve, reject) => {
        cargar();

        let borrado = listadoPorHacer.find(tarea => tarea.descripcion === descripcion);
        let listadoNuevo = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

        if (listadoNuevo.length === listadoPorHacer) {
            reject('No se encontró tarea para borrar');
        } else {
            listadoPorHacer = listadoNuevo;
            guardar();
            resolve(`La tarea ${borrado.descripcion} ha sido borrada`);
        }
    })
}

//Funcion para actualizar tarea
const actualizar = (descripcion, completado = true) => {
    return new Promise((resolve, reject) => {
        cargar();

        let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

        if (index >= 0) {
            listadoPorHacer[index].completado = completado;
            guardar();
            resolve(`La tarea ${listadoPorHacer[index].descripcion} ha sido actualizada`);
        } else {
            reject(`No se pudo actualizar la tarea`);
        }
    });
}

//Funcion para imprimir lista de tareas
const listar = (completado) => {
    cargar();

    if (completado === undefined) {
        return listadoPorHacer;
    } else {
        let a = listadoPorHacer.filter(tarea => tarea.completado === completado);
        return a;
    }
}

//Funcion para cargar tarea
const cargar = () => {
    try {
        listadoPorHacer = require('../DB/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }
}

//Funcion para guardar tarea
const guardar = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./DB/data.json', data, err => {
        if (err) throw new Error('La tarea no pudo ser guardada');
    })
}

//Funcion para crear tarea
const crear = (descripcion) => {
    cargar();

    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardar();

    return (`La tarea ${porHacer.descripcion} ha sido creada`);
}

//Exports
module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}