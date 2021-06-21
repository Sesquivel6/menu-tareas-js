import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');  // cuando es una clase, ponemos un punto ( . )
const txtInput      = document.querySelector('.new-todo');   // cuando es una clase, ponemos un punto ( . )
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');




/*

*/

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${  (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${  (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo; // aquí creamos el HTML que está dentro de la constante htmlTodo
    
    
    
    divTodoList.append( div.firstElementChild ); // Insertamos el html considerando solo el primer hijo: No utilizará el div y comenzará desde el <li>
    return div.firstElementChild;

}


// Eventos
// AGREGAR UN ELEMENTO SEGÚN txtInput
txtInput.addEventListener('keyup', ( event ) => { // está escuchando cuando el usuario haga enter

    if ( event.keyCode === 13 && txtInput.value.length > 0 ) { // si la persona apreta enter (que vale 13, && la persona ingreso al menos 1 caracter)

        // console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value ); // a la constante nuevoTodo le agregamos el valor de lo que se escribe en el txtInput
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo ); // Este método permitirá generar el nuevoTodo como un HTML
        txtInput.value = ''; // una vez agregado un valor, se resetea el valor a ''
    }


});

// ELIMINAR UN ELEMENTO SEGÚN ID
divTodoList.addEventListener('click', (event) => {


    const nombreElemento = event.target.localName; // input, label, button, para saber donde estoy dando click
    const todoElemento   = event.target.parentElement.parentElement; // permite hacer referencia completa al <li>
    const todoId         = todoElemento.getAttribute('data-id'); // nos permite conseguir el atributo de un elemento, como por ejemplo, el data-id

    if (  nombreElemento.includes('input') ){ // Si el usuario, al dar click en un elemento, este corresponde al elemento input...
        todoList.marcarCompletado( todoId ); // va a marcar como completado aquel elemento que considere la id todoId
        todoElemento.classList.toggle('completed'); // Tomará el li seleccionado, y al classList del li lo tornará completed

    } else if( nombreElemento.includes('button') ) { // Si el elemento clickeado corresponde a un boton,

        todoList.eliminarTodo( todoId ); // Llamará al nuevo arreglo con el elemento de id TodoId eliminado
        divTodoList.removeChild( todoElemento ); // Eliminar elemento HTML

    }

});

//Eliminar Completados
btnBorrar.addEventListener('click', () => { //no lleva event como variable, ya que no importa que elemento aprete. Siempre será el botón de class = clear-completed

    todoList.eliminarCompletados(); //Elimina de arreglo

    for( let i = divTodoList.children.length-1; i >= 0; i-- ) { // FOR INVERSO: ELIMINAR DE ABAJO HACIA ARRIBA 

        const elemento = divTodoList.children[i];
        
        if (elemento.classList.contains('completed') ){

            divTodoList.removeChild(elemento); //Eliminar de HTML

        }
    }

});


ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;

        }


    }



});