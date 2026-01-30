// Variables globales
let appData = null;

// Inicializar la aplicación
async function initApp() {
    try {
        const response = await fetch('data/data.json');
        appData = await response.json();
        
        // Renderizar todos los componentes
        renderQuote();
        renderDashboard();
        renderGoals();
        renderHabits();
        updateLastUpdate();
        
        // Configurar event listeners
        setupEventListeners();
        
        console.log('✅ App inicializada correctamente');
    } catch (error) {
        console.error('❌ Error cargando datos:', error);
        document.getElementById('quote-text').innerText = 'Error al cargar los datos. Por favor, recarga la página.';
    }
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
        goalsContainer.innerHTML = '<p style="color: #9ca3af;">No hay objetivos configurados.</p>';
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
        habitsContainer.innerHTML = '<p style="color: #9ca3af;">No hay hábitos configurados.</p>';
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

// Configurar event listeners
function setupEventListeners() {
    // Botón registrar ahorro
    document.getElementById('add-savings').addEventListener('click', () => {
        const amount = prompt('¿Cuánto quieres registrar como ahorro?');
        if (amount && !isNaN(amount)) {
            appData.finance.savings += parseFloat(amount);
            renderDashboard();
            showNotification(`✅ ¡${amount}€ añadidos a tus ahorros!`);
            saveData();
        }
    });
    
    // Botón completar hábito
    document.getElementById('toggle-habit').addEventListener('click', () => {
        const habitName = prompt('¿Qué hábito quieres marcar? Escribe el nombre:');
        if (habitName) {
            const habit = appData.habits.find(h => 
                h.name.toLowerCase().includes(habitName.toLowerCase())
            );
            
            if (habit) {
                habit.completed = !habit.completed;
                if (habit.completed) {
                    habit.streak += 1;
                }
                renderHabits();
                showNotification(`✅ Hábito "${habit.name}" actualizado!`);
                saveData();
            } else {
                alert('No se encontró ese hábito');
            }
        }
    });
    
    // Botón actualizar
    document.getElementById('refresh-data').addEventListener('click', () => {
        initApp();
        showNotification('🔄 Datos actualizados');
    });
    
    // Click en tarjetas de hábitos
    document.getElementById('habits').addEventListener('click', (e) => {
        const habitCard = e.target.closest('.habit-card');
        if (habitCard) {
            const habitId = parseInt(habitCard.dataset.habitId);
            const habit = appData.habits.find(h => h.id === habitId);
            
            if (habit) {
                habit.completed = !habit.completed;
                if (habit.completed && habitCard.classList.contains('completed') === false) {
                    habit.streak += 1;
                }
                renderHabits();
                saveData();
            }
        }
    });
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

// Guardar datos (en localStorage como backup)
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
    
    // Notificación visual en la página
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
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

// Añadir estilos de animación
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar la app cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
