let employees = [];
let weeklyTheme = '';
const weeklyThemeElement = document.getElementById('weekly-theme');
const employeeList = document.getElementById('employees');
const selectedEmployeeDiv = document.getElementById('selected-employee');

// Carregar dados salvos
function loadData() {
    const savedEmployees = localStorage.getItem('employees');
    const savedTheme = localStorage.getItem('weeklyTheme');
    const lastUpdateDate = localStorage.getItem('lastUpdateDate');

    if (savedEmployees) {
        employees = JSON.parse(savedEmployees);
        updateEmployeeList();
    }

    if (savedTheme && lastUpdateDate) {
        const currentDate = new Date();
        const lastUpdate = new Date(lastUpdateDate);
        const daysSinceLastUpdate = Math.floor((currentDate - lastUpdate) / (1000 * 60 * 60 * 24));

        if (daysSinceLastUpdate >= 7) {
            weeklyTheme = 'É hora de definir um novo tema!';
        } else {
            weeklyTheme = savedTheme;
        }
    } else {
        weeklyTheme = 'É hora de definir um novo tema!';
    }

    weeklyThemeElement.textContent = weeklyTheme;
}

// Salvar dados
function saveData() {
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('weeklyTheme', weeklyTheme);
    localStorage.setItem('lastUpdateDate', new Date().toISOString());
}

// Atualizar lista de colaboradores
function updateEmployeeList() {
    employeeList.innerHTML = '';
    employees.forEach(employee => {
        const li = document.createElement('li');
        li.textContent = employee;
        employeeList.appendChild(li);
    });
}

// Adicionar novo colaborador
document.getElementById('employee-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const newEmployee = document.getElementById('new-employee').value.trim();
    if (newEmployee && !employees.includes(newEmployee)) {
        employees.push(newEmployee);
        updateEmployeeList();
        saveData();
        document.getElementById('new-employee').value = '';
    }
});

// Atualizar tema da semana
document.getElementById('theme-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const newTheme = document.getElementById('new-theme').value.trim();
    if (newTheme) {
        weeklyTheme = newTheme;
        weeklyThemeElement.textContent = weeklyTheme;
        saveData();
        document.getElementById('new-theme').value = '';
    }
});

// Sortear colaborador
document.getElementById('draw-button').addEventListener('click', function() {
    if (employees.length > 0) {
        const randomIndex = Math.floor(Math.random() * employees.length);
        const selectedEmployee = employees[randomIndex];
        selectedEmployeeDiv.textContent = `Colaborador sorteado: ${selectedEmployee}`;
    } else {
        selectedEmployeeDiv.textContent = 'Nenhum colaborador na lista para sortear.';
    }
});

// Inicializar app
loadData();