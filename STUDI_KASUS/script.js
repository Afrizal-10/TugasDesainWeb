let todoName = document.getElementById("todo-name");
let btnSimpan = document.getElementById("btn-simpan");

// Fungsi untuk menyimpan daftar to-do ke Local Storage
function saveTodoList() {
  let todoItems = [];
  let todos = document.querySelectorAll(".list-group-item span");
  todos.forEach(function (item) {
    todoItems.push(item.textContent);
  });
  localStorage.setItem("todos", JSON.stringify(todoItems));
}

// Fungsi untuk memuat daftar to-do dari Local Storage
function loadTodoList() {
  let todoItems = JSON.parse(localStorage.getItem("todos")) || [];
  let todoContainer = document.querySelector(".list-group");
  todoContainer.innerHTML = "";

  todoItems.forEach(function (todo) {
    let todoHTML = `
      <li class="list-group-item d-flex justify-content-between">
      <div>
      <input class="form-check-input me-1" type="checkbox" />
            <span>${todo}</span></div>
            <button class="badge border-0 bg-danger btn-hapus">Hapus</button>
           </li>`;
    todoContainer.innerHTML += todoHTML;
  });

  // Tambahkan kembali event listener setelah memuat ulang
  addEventListeners();
}

// menambahkan event listener pada checkbox dan tombol hapus
function addEventListeners() {
  // Mengambil input dari checkbox
  let checkTodo = document.querySelectorAll(".form-check-input");
  for (let i = 0; i < checkTodo.length; i++) {
    const input = checkTodo[i];
    input.addEventListener("change", function () {
      let todoSpan = input.nextElementSibling;
      todoSpan.classList.toggle("text-decoration-line-through");
    });
  }

  // Hapus todo
  let btnHapus = document.querySelectorAll(".btn-hapus");
  for (let x = 0; x < btnHapus.length; x++) {
    const hapus = btnHapus[x];
    hapus.addEventListener("click", function () {
      this.parentElement.remove();
      saveTodoList(); // Simpan daftar setelah hapus todolist
    });
  }
}

// Event saat tombol simpan diklik
btnSimpan.addEventListener("click", function () {
  if (todoName.value == "") {
    alert("Nama todolist tidak boleh kosong!");
  } else {
    let todoContainer = document.querySelector(".list-group");
    let todoHTML = `
     <li class="list-group-item d-flex justify-content-between">
     <div>
     <input class="form-check-input me-1" type="checkbox" />
           <span>${todoName.value}</span></div>
           <button class="badge border-0 bg-danger btn-hapus">Hapus</button>
          </li>`;
    todoContainer.innerHTML += todoHTML;
    todoName.value = "";
    todoName.focus();

    // Simpan todolist ke local storage
    saveTodoList();

    // Tambahkan event listener ke elemen baru
    addEventListeners();
  }
});

// supaya ketika di unload ga ke hapus yg telah kita masukan tadi
window.onload = loadTodoList;
