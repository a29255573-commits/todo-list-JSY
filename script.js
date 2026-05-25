// 저장된 데이터 가져오기
let todos =
JSON.parse(localStorage.getItem("todos"))
|| [];

// 처음 화면 출력
renderTodos();


// Enter 키 입력
document.querySelector("#todoInput")
.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        addTodo();
    }

});


// 할 일 추가
function addTodo(){

    let input =
    document.querySelector("#todoInput");

    let text = input.value;

    if(text === ""){
        alert("할 일을 입력하세요");
        return;
    }

    todos.push({
        text : text,
        completed : false
    });

    saveTodos();

    renderTodos();

    input.value = "";
}


// 화면 출력
function renderTodos(){

    let list =
    document.querySelector("#todoList");

    list.innerHTML = "";

    for(let i=0; i<todos.length; i++){

        list.innerHTML += `

        <li class="${todos[i].completed ? 'completed' : ''}">

            ${todos[i].text}

            <button onclick="completeTodo(${i})">
                완료
            </button>

            <button onclick="editTodo(${i})">
                수정
            </button>

            <button onclick="deleteTodo(${i})">
                삭제
            </button>

        </li>

        `;
    }

}


// 완료 기능
function completeTodo(index){

    todos[index].completed =
    !todos[index].completed;

    saveTodos();

    renderTodos();
}


// 수정 기능
function editTodo(index){

    let newText = prompt(
        "수정할 내용을 입력하세요",
        todos[index].text
    );

    if(newText !== null){

        todos[index].text = newText;

        saveTodos();

        renderTodos();
    }

}


// 삭제 기능
function deleteTodo(index){

    todos.splice(index, 1);

    saveTodos();

    renderTodos();
}


// localStorage 저장
function saveTodos(){

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

}