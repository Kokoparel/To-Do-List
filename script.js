const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Fungsi untuk memuat tugas
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = ''; // Menghapus tugas yang lama agar tidak duplikat
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);  // Menandai tugas yang selesai

        li.innerHTML = `
            <span>${task.title}</span>
            <button class="complete" onclick="markComplete(${index})">Mark as Complete</button>
            <button class="delete" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Fungsi untuk menambahkan tugas baru
addTaskBtn.addEventListener('click', () => {
    const taskTitle = taskInput.value.trim();
    if (taskTitle) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ title: taskTitle, completed: false });  // Menambahkan status 'completed' false
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = ''; // Mengosongkan input setelah menambahkan tugas
        loadTasks();
    }
});


// Fungsi untuk menandai tugas sebagai selesai
function markComplete(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = true;  // Mengubah status tugas menjadi selesai
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();  // Memuat ulang daftar tugas
}

// Fungsi untuk menghapus tugas
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);  // Menghapus tugas berdasarkan index
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();  // Memuat ulang daftar tugas
}

// Memuat daftar tugas saat aplikasi dimulai
loadTasks();
