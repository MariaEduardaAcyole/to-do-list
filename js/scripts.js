//Seleçao de elementos

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

//Funçoes
const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");//cria uma div e adiciona a classe "todo"

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle); //adiciona o elemento filho dentro do pai todoTitle adicionado em todo 

    //adiciona aos finalizados 
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    //edita ao apertar o botao
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    //deleta ao apertar o botao
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    //utilizando dados da localStorage

    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({ text, done: 0 });
    }

    todoList.appendChild(todo);

    todoInput.value = "";
};



const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

            //utilizando dados da localStorage

            updateTodoLocalStorage(oldInputValue, text);
        }
    });
};

//BUSCA
const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        todo.style.display = "flex";

        console.log(todoTitle);

        if (!todoTitle.includes(search)) {
            todo.style.display = "none";
        }
    });
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (filterValue) {
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));
            break;

        case "done":
            todos.forEach((todo) =>
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")

            );

            break;


        case "todo":

            todos.forEach((todo) =>
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")

            );

            break;

        default:
            break;

    }
};


//Eventos

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
});


document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText || "";
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");

        updateTodoStatusLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();

        //utilizando dados da localStorage
        removeTodoLocalStorage(todoTitle);

    }

    if (targetEl.classList.contains("edit-todo")) {
        //esconder
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;

    }

});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
        updateTodo(editInputValue);
        //atualizar
    }


    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
   const search = e.target.value;
getSearchedTodos(search);

});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});


//Local storage

const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos"))|| [];


    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text != todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
const todos = getTodosLocalStorage();

todos.map((todo) => 
 todo.text === todoText ? (todo.done = !todo.done) : null
);

localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();

//QUEM FEZ
function quemFez(){

    const texto = `@Maria Acyole & @Hora de codar`

    const elemento = document.createElement("h1").innerText = texto;

    const campo = document.getElementById('campo');
    campo.innerHTML = elemento;


    }
    

/*
    const todo = document.createElement("div");
    todo.classList.add("todo");//cria uma div e adiciona a classe "todo"

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle); //adiciona o elemento filho dentro do pai todoTitle adicionado em todo 

    res.innerHTML = `Detectamos com anos.`

Para criar um botão que, ao ser clicado, apresente um texto no HTML usando JavaScript, você pode usar o seguinte código:

HTML:
```html
<button id="meuBotao">Clique para exibir o texto</button>
<p id="textoExibido"></p>
```

JavaScript:
```javascript
document.getElementById("meuBotao").addEventListener("click", function() {
  document.getElementById("textoExibido").innerHTML = "Texto a ser exibido";
});
```

Neste exemplo, estamos adicionando um evento de clique ao botão com o id "meuBotao". Quando o botão for clicado, a função anônima será executada. Dentro dessa função, estamos definindo o conteúdo do elemento com o id "textoExibido" como "Texto a ser exibido". Assim, ao clicar no botão, o texto será exibido na página HTML.

Sure! Here's an example code in JavaScript that creates a button and displays a text on the HTML page when the button is clicked:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Button Click</title>
    <script>
        function displayText() {
            var text = "This text is displayed!";
            document.getElementById("output").innerHTML = text;
        }
    </script>
</head>
<body>
    <button onclick="displayText()">Click Me</button>
    <br>
    <p id="output"></p>
</body>
</html>
```

In this code, we define a JavaScript function `displayText()` that updates the content of the `<p>` element with the id "output" to display the text "This text is displayed!".

The `<button>` element is created with the attribute `onclick="displayText()"`, which triggers the `displayText()` function when the button is clicked.

The `<p>` element with the id "output" is where the text will be displayed. Initially, it's empty, but when the button is clicked, the `displayText()` function is called and updates its content.

Hope this helps!
*/