import { Todo } from './todo.class';

export class TodoList {

    constructor() {

        // this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {

        /*
        Esta instrucción devuelve un nuevo arreglo siempre y cuando el id del arreglo no coincida con el id enviado 
        https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        */
        this.todos = this.todos.filter( todo => todo.id != id )
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) { 

        for( const todo of this.todos ) { // barrer todos los 'todos'

            if( todo.id == id ) { // se pone solo == porque pueden ser strings y numeros

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }

        }


    }

    eliminarCompletados() {
        
        this.todos = this.todos.filter( todo => !todo.completado ) // Retornará todos los que NO estén completados
        this.guardarLocalStorage();
    }


    /*
    LOCAL STORAGE Y SESSION STORAGES
SESSION STORAGE ES POSIBLE ALMACENAR HASTA QUE SE CIERRE EL NAVEGADOR
LOCAL STORAGE ES POSIBLE ALMACENAR SIN EXPIRACIÓN

Podremos ocupar setItem para guardar información desde la aplicación al localStorage
Podremos ocupar getItem para cargar información desde el localStorage a la aplicación

[object object] = Representación de un objeto en su forma string.
La función JSON.stringify() nos permitirá transformar un objeto a un string, evitando que aparezca como [object object]
*/

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify( this.todos ) );  // ^^
        
    }
    
/*
    Primero, para cargar el localStorage, debemos verificar si el objeto existe.
    Segundo, en caso de que exista, debemos tomar el string y llevarlo a su estado natural de objeto, a través de la función JSON.parse( localStorage.getItem('todo') )
*/
    cargarLocalStorage(){

        this.todos = ( localStorage.getItem('todo') ) ? JSON.parse( localStorage.getItem('todo') ) : []; // Mismo de abajo en operador ternario.
        this.todos = this.todos.map( Todo.fromJson ); // barrer cada uno de los elementos dentro de un arreglo para retornar cada uno de esos objetos mapeados según fromJson
        
        
        
        /* O ESCRITO SIN TERNARIO, Y SIN ABREVIACIONES DE FUNCION FLECHA SERÍA:
        
        if ( localStorage.getItem('todo')) { // Si esque en el localStorage existe "todo" (key-word)
            this.todos = JSON.parse( localStorage.getItem('todo') ) // String a objeto
        }   else {
                this.todos = [];
            }
        this.todos = this.todos.map( obj => Todo.fromJson( obj ));
        
        */
        }


}