
window.onload = function() {
  
  // Display the todo items.
  todoDB.open(refreshTodos);
  
  
  // Get references to the form elements.
  var newTodoForm = document.getElementById('new-todo-form');
  var newTodoInput = document.getElementById('new-todo');
  
  
  // Handle new todo item form submissions.
  newTodoForm.onsubmit = function() {
    // Get the todo text.
    var text = newTodoInput.value;
    
    // Check to make sure the text is not blank (or just spaces).
    if (text.replace(/ /g,'') != '') {
      // Create the todo item.
      todoDB.createTodo(text, function(todo) {
        refreshTodos();
      });
    }
    
    // Reset the input field.
    newTodoInput.value = '';
    
    // Don't send the form.
    return false;
  };

}


function refreshSelect() {
  todoDB.fetchTodos(function(todos) {
    for(var i = 0; i < todos.length; i++) {
      var todo = todos[(todos.length - 1 - i)];

      var select = document.getElementById('picker');
      var option = document.createElement('option');
      option.innerHTML = todo.text;
      option.setAttribute("data-id", todo.timestamp);
      select.appendChild(option);
    }  
  })

}

$(document).on('change','select',function(){
  let id = $(this).children(":selected").attr("data-id")
  getChlid(id)
})

function getChlid(id) {
  todoDB.fetchTodos(function(todos) {
    let item = todos.find(x=> x.timestamp = id)
    item.list.forEach(todo => {
      var todoList = document.getElementById('todo-items');
      let newTodo = document.createElement("li")
      newTodo.innerHTML = todo;
      todoList.appendChild(newTodo)
    });
  })
}




// Update the list of todo items.
function refreshTodos() {  
  todoDB.fetchTodos(function(todos) {
    var todoList = document.getElementById('todo-items');
    todoList.innerHTML = '';
    
    for(var i = 0; i < todos.length; i++) {
      // Read the todo items backwards (most recent first).
      var todo = todos[(todos.length - 1 - i)];
      var li = document.createElement('li');
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.className = "todo-checkbox";
      checkbox.setAttribute("data-id", todo.timestamp);
      
      li.appendChild(checkbox);
      
      var span = document.createElement('span');
      span.innerHTML = todo.text;
      
      li.appendChild(span);
      
      todoList.appendChild(li);

      var ul = document.createElement('ul');
      li.appendChild(ul);

      for (var j=0; j < todo.list.length; j++) {
        var newLi = document.createElement('li');
        newLi.innerHTML = todo.list[j];
        ul.appendChild(newLi);
      }
      
      // TODO: Setup an event listener for the checkbox.
      // hint: you have to get the id of the clicked element, and then call the deleteTodo function on that element

      checkbox.addEventListener( 'change', function(e) {
          if(this.checked) {
              // Checkbox is checked..
              var id = this.getAttribute("data-id");
              todoDB.deleteTodo(id, function(todo) {
              });
              this.parentElement.remove();
          }
      });

    }

    refreshSelect();

  });
}


