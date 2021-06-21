

export class Todo {

    // al poner ({ id, tarea, completado, creado }) estoy utilizando desestructuración de objetos (provenientes de Todo)
    static fromJson ({ id, tarea, completado, creado }) {

        const tempTodo = new Todo( tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor ( tarea ) {

        this.tarea = tarea ;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();

    }
}