// Variables globales
let appData = null;
let charts = {};

// Inicializar la aplicación
async function initApp() {
    try {
        const response = await fetch('data/data.json');
        appData = await response.json();
        
        // Renderizar todos los componentes
        renderQuote();
        renderQuickStats();
        renderDashboard();
        renderGoals();
        renderHabits();
        renderHistory();
        updateLastUpdate();
        
        // Crear gráficos
        createCharts();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Cargar tema guardado
        loadTheme();
        
        console.log('✅ App inicializada correctamente');
    } catch (error) {
        console.error('❌ Error cargando datos:', error);
        document.getElementById('quote-text').innerText = 'Error al cargar los datos. Por favor, recarga la página.';
    }
}

// Renderizar estadísticas rápidas
function renderQuickStats() {
    const { savings, goal, monthly_income, monthly_expenses } = appData.finance;
    const monthlySavings = monthly_income - monthly_expenses;
    const globalProgress = ((savings / goal) * 100).toFixed(1);
    
    // Encontrar racha más larga
    const longestStreak = Math.max(...appData.habits.map(h => h.streak), 0);
    
    document.getElementById('quick-savings').textContent = `${savings.toLocaleString('es-ES')} €`;
    document.getElementById('quick-progress').textContent = `${globalProgress}%`;
    document.getElementById('quick-streak').textContent = `${longestStreak} días`;
    document.getElementById('quick-monthly').textContent = `${monthlySavings.toLocaleString('es-ES')} €`;
}

// Renderizar cita motivacional
function renderQuote() {
    const quoteText = document.getElementById('quote-text');
    const randomQuote = appData.motivation[Math.floor(Math.random() * appData.motivation.length)];
    quoteText.innerText = randomQuote;
}

// Renderizar dashboard financiero
function renderDashboard() {
    const dashboard = document.getElementById('dashboard');
    const { savings, goal, monthly_income, monthly_expenses, investments } = appData.finance;
    
    const savingsPercentage = ((savings / goal) * 100).toFixed(1);
    const monthlySavings = monthly_income - monthly_expenses;
    
    dashboard.innerHTML = `
        <div class="card">
            <div class="card-title">💰 Ahorro Total</div>
            <div class="card-value">${savings.toLocaleString('es-ES')} €</div>
            <div class="card-subtitle">${savingsPercentage}% del objetivo</div>
        </div>
        
        <div class="card">
            <div class="card-title">🎯 Objetivo 2026</div>
            <div class="card-value">${goal.toLocaleString('es-ES')} €</div>
            <div class="card-subtitle">Meta anual</div>
        </div>
        
        <div class="card">
            <div class="card-title">📈 Ahorro Mensual</div>
            <div class="card-value">${monthlySavings.toLocaleString('es-ES')} €</div>
            <div class="card-subtitle">${monthly_income} - ${monthly_expenses}</div>
        </div>
        
        <div class="card">
            <div class="card-title">📊 Inversiones</div>
            <div class="card-value">${investments.toLocaleString('es-ES')} €</div>
            <div class="card-subtitle">Capital invertido</div>
        </div>
    `;
}

// Renderizar objetivos
function renderGoals() {
    const goalsContainer = document.getElementById('goals');
    
    if (!appData.goals || appData.goals.length === 0) {
        goalsContainer.innerHTML = '<p style="color: var(--text-tertiary);">No hay objetivos configurados.</p>';
        return;
    }
    
    const goalsHTML = appData.goals.map(goal => {
        const percentage = ((goal.current / goal.target) * 100).toFixed(1);
        const deadline = new Date(goal.deadline).toLocaleDateString('es-ES');
        const remaining = goal.target - goal.current;
        
        return `
            <div class="goal-card">
                <div class="goal-header">
                    <span class="goal-name">${goal.name}</span>
                    <span class="goal-percentage">${percentage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="goal-details">
                    <span>${goal.current} € / ${goal.target} €</span>
                    <span>Faltan: ${remaining} €</span>
                    <span>📅 ${deadline}</span>
                </div>
            </div>
        `;
    }).join('');
    
    goalsContainer.innerHTML = goalsHTML;
}

// Renderizar hábitos
function renderHabits() {
    const habitsContainer = document.getElementById('habits');
    
    if (!appData.habits || appData.habits.length === 0) {
        habitsContainer.innerHTML = '<p style="color: var(--text-tertiary);">No hay hábitos configurados.</p>';
        return;
    }
    
    const habitsHTML = appData.habits.map(habit => {
        const completedClass = habit.completed ? 'completed' : '';
        const checkIcon = habit.completed ? '✓' : '';
        
        return `
            <div class="habit-card ${completedClass}" data-habit-id="${habit.id}">
                <div class="habit-info">
                    <div class="habit-checkbox">${checkIcon}</div>
                    <span class="habit-name">${habit.name}</span>
                </div>
                <div class="habit-streak">🔥 ${habit.streak} días</div>
            </div>
        `;
    }).join('');
    
    habitsContainer.innerHTML = habitsHTML;
}

// Renderizar historial
function renderHistory() {
    const historyContainer = document.getElementById('history');
    
    if (!appData.history || appData.history.length === 0) {
        historyContainer.innerHTML = '<p style="color: var(--text-tertiary); text-align: center;">No hay movimientos registrados.</p>';
        return;
    }
    
    // Ordenar por fecha más reciente
    const sortedHistory = [...appData.history].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const historyHTML = sortedHistory.slice(0, 10).map(item => {
        const date = new Date(item.date).toLocaleDateString('es-ES');
        const amountClass = item.type === 'income' ? 'positive' : 'negative';
        const icon = item.type === 'income' ? '💰' : '💸';
        const sign = item.type === 'income' ? '+' : '-';
        
        return `
            <div class="history-item">
                <div class="history-info">
                    <span class="history-icon">${icon}</span>
                    <div>
                        <div class="history-text">${item.description}</div>
                        <div class="history-date">${date}</div>
                    </div>
                </div>
                <div class="history-amount ${amountClass}">${sign}${item.amount} €</div>
            </div>
        `;
    }).join('');
    
    historyContainer.innerHTML = historyHTML;
}

// Crear todos los gráficos
function createCharts() {
    createSavingsChart();
    createDistributionChart();
    createGoalsChart();
    createHabitsChart();
}

// Gráfico de evolución de ahorros
function createSavingsChart() {
    const ctx = document.getElementById('savingsChart').getContext('2d');
    
    // Datos de ejemplo (últimos 6 meses)
    const months = ['Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero'];
    const savings = [1200, 1500, 1800, 2100, 2250, appData.finance.savings];
    
    if (charts.savings) charts.savings.destroy();
    
    charts.savings = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Ahorros (€)',
                data: savings,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    padding: 12,
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#3b82f6',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(75, 85, 99, 0.2)'
                    },
                    ticks: {
                        color: '#9ca3af',
                        callback: function(value) {
                            return value + ' €';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                }
            }
        }
    });
}

// Gráfico de distribución financiera
function createDistributionChart() {
    const ctx = document.getElementById('distributionChart').getContext('2d');
    
    const { savings, investments, monthly_expenses } = appData.finance;
    
    if (charts.distribution) charts.distribution.destroy();
    
    charts.distribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Ahorros', 'Inversiones', 'Gastos Mensuales'],
            datasets: [{
                data: [savings, investments, monthly_expenses],
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#ef4444'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#9ca3af',
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    padding: 12,
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + ' €';
                        }
                    }
                }
            }
        }
    });
}

// Gráfico de progreso de objetivos
function createGoalsChart() {
    const ctx = document.getElementById('goalsChart').getContext('2d');
    
    const goalNames = appData.goals.map(g => g.name);
    const goalProgress = appData.goals.map(g => ((g.current / g.target) * 100).toFixed(1));
    
    if (charts.goals) charts.goals.destroy();
    
    charts.goals = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: goalNames,
            datasets: [{
                label: 'Progreso (%)',
                data: goalProgress,
                backgroundColor: '#10b981',
                borderRadius: 8,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return 'Progreso: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(75, 85, 99, 0.2)'
                    },
                    ticks: {
                        color: '#9ca3af',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                }
            }
        }
    });
}

// Gráfico de hábitos (últimos 7 días)
function createHabitsChart() {
    const ctx = document.getElementById('habitsChart').getContext('2d');
    
    // Datos de ejemplo: porcentaje de hábitos completados por día
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const completion = [75, 100, 50, 100, 75, 25, 100];
    
    if (charts.habits) charts.habits.destroy();
    
    charts.habits = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Completados (%)',
                data: completion,
                backgroundColor: days.map((_, i) => 
                    completion[i] >= 75 ? '#10b981' : completion[i] >= 50 ? '#f59e0b' : '#ef4444'
                ),
                borderRadius: 8,
                barThickness: 50
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(75, 85, 99, 0.2)'
                    },
                    ticks: {
                        color: '#9ca3af',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                }
            }
        }
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Botón registrar ahorro
    document.getElementById('add-savings').addEventListener('click', addSavings);
    
    // Botón registrar gasto
    document.getElementById('add-expense').addEventListener('click', addExpense);
    
    // Botón completar hábito
    document.getElementById('toggle-habit').addEventListener('click', toggleHabitPrompt);
    
    // Botón exportar datos
    document.getElementById('export-data').addEventListener('click', exportData);
    
    // Botón actualizar
    document.getElementById('refresh-data').addEventListener('click', () => {
        initApp();
        showNotification('🔄 Datos actualizados');
    });
    
    // Toggle de tema
    document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
    
    // Click en tarjetas de hábitos
    document.getElementById('habits').addEventListener('click', (e) => {
        const habitCard = e.target.closest('.habit-card');
        if (habitCard) {
            const habitId = parseInt(habitCard.dataset.habitId);
            toggleHabit(habitId);
        }
    });
}

// Agregar ahorro
function addSavings() {
    const amount = prompt('¿Cuánto quieres registrar como ahorro?');
    if (amount && !isNaN(amount)) {
        const numAmount = parseFloat(amount);
        appData.finance.savings += numAmount;
        
        // Agregar al historial
        if (!appData.history) appData.history = [];
        appData.history.push({
            date: new Date().toISOString(),
            type: 'income',
            description: 'Ahorro registrado',
            amount: numAmount
        });
        
        renderDashboard();
        renderQuickStats();
        renderHistory();
        createSavingsChart();
        createDistributionChart();
        showNotification(`✅ ¡${numAmount}€ añadidos a tus ahorros!`);
        saveData();
    }
}

// Agregar gasto
function addExpense() {
    const amount = prompt('¿Cuánto fue el gasto?');
    if (amount && !isNaN(amount)) {
        const numAmount = parseFloat(amount);
        const description = prompt('Descripción del gasto:') || 'Gasto general';
        
        appData.finance.savings -= numAmount;
        
        // Agregar al historial
        if (!appData.history) appData.history = [];
        appData.history.push({
            date: new Date().toISOString(),
            type: 'expense',
            description: description,
            amount: numAmount
        });
        
        renderDashboard();
        renderQuickStats();
        renderHistory();
        createSavingsChart();
        createDistributionChart();
        showNotification(`💸 Gasto de ${numAmount}€ registrado`);
        saveData();
    }
}

// Toggle hábito con prompt
function toggleHabitPrompt() {
    const habitName = prompt('¿Qué hábito quieres marcar? Escribe el nombre:');
    if (habitName) {
        const habit = appData.habits.find(h => 
            h.name.toLowerCase().includes(habitName.toLowerCase())
        );
        
        if (habit) {
            toggleHabit(habit.id);
        } else {
            alert('No se encontró ese hábito');
        }
    }
}

// Toggle hábito por ID
function toggleHabit(habitId) {
    const habit = appData.habits.find(h => h.id === habitId);
    
    if (habit) {
        habit.completed = !habit.completed;
        if (habit.completed) {
            habit.streak += 1;
        }
        renderHabits();
        renderQuickStats();
        createHabitsChart();
        showNotification(`✅ Hábito "${habit.name}" actualizado!`);
        saveData();
    }
}

// Exportar datos a CSV
function exportData() {
    const csv = convertToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `libertad-2026-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showNotification('📥 Datos exportados correctamente');
}

// Convertir datos a CSV
function convertToCSV() {
    let csv = 'Tipo,Descripción,Cantidad,Fecha\n';
    
    if (appData.history) {
        appData.history.forEach(item => {
            csv += `${item.type},${item.description},${item.amount},${item.date}\n`;
        });
    }
    
    return csv;
}

// Toggle tema claro/oscuro
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Cambiar icono
    const icon = document.getElementById('theme-icon');
    icon.textContent = newTheme === 'light' ? '☀️' : '🌙';
    
    // Recrear gráficos con nuevo tema
    setTimeout(() => {
        createCharts();
    }, 300);
}

// Cargar tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = document.getElementById('theme-icon');
    icon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
}

// Actualizar fecha de última actualización
function updateLastUpdate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const dateString = now.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    document.getElementById('last-update').innerText = `${dateString} a las ${timeString}`;
}

// Guardar datos
function saveData() {
    try {
        localStorage.setItem('libertad2026_data', JSON.stringify(appData));
        console.log('💾 Datos guardados en localStorage');
    } catch (error) {
        console.error('Error guardando datos:', error);
    }
}

// Mostrar notificación
function showNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Sistema Libertad 2026', {
            body: message,
            icon: 'icon-192.png'
        });
    }
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.innerText = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('✅ Service Worker registrado', reg))
        .catch(err => console.error('❌ Error registrando Service Worker:', err));
}

// Solicitar permiso para notificaciones
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('✅ Permisos de notificación concedidos');
        }
    });
}

// Inicializar la app cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
