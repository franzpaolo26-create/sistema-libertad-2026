# 🚀 Sistema Libertad 2026 PRO+ v2.0

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PWA](https://img.shields.io/badge/PWA-enabled-blue.svg)](https://developers.google.com/web/progressive-web-apps/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4.0-ff6384.svg)](https://www.chartjs.org/)

> Progressive Web App mejorada para gestión financiera personal con análisis visual, seguimiento de objetivos y desarrollo de hábitos productivos.

## 🆕 Novedades Versión 2.0

### ✨ Nuevas Características

- **📊 Gráficos Interactivos** - Visualización de datos con Chart.js
  - Evolución de ahorros en línea temporal
  - Distribución financiera (doughnut chart)
  - Progreso de objetivos (barras)
  - Cumplimiento de hábitos semanal

- **🌓 Modo Claro/Oscuro** - Toggle entre temas con persistencia

- **📜 Historial de Transacciones** - Registro completo de ingresos y gastos

- **📥 Exportar Datos** - Descarga tu información en formato CSV

- **📊 Dashboard de Resumen Rápido** - Métricas clave al instante

- **💸 Registro de Gastos** - Además de ahorros, controla tus gastos

---

## 📸 Capturas de Pantalla

### Dashboard Principal con Gráficos
![Dashboard](./screenshots/dashboard-graphs.png)

### Modo Claro
![Light Mode](./screenshots/light-mode.png)

### Vista Móvil
![Mobile](./screenshots/mobile-view.png)

---

## ✨ Características Completas

### 🏠 Panel Principal
- **Resumen rápido** con métricas clave
- **Dashboard financiero** con 4 tarjetas informativas
- **Frases motivacionales** aleatorias

### 📊 Análisis Visual
- **Gráfico de evolución** - Seguimiento temporal de ahorros
- **Gráfico de distribución** - Visualiza tu asignación financiera
- **Gráfico de objetivos** - Progreso visual de tus metas
- **Gráfico de hábitos** - Cumplimiento semanal

### 🎯 Gestión de Objetivos
- Barras de progreso dinámicas
- Fechas límite
- Cálculo automático de montos restantes
- Actualización en tiempo real

### ✅ Sistema de Hábitos
- Seguimiento de rachas (streaks)
- Marcado interactivo
- Visualización semanal
- Persistencia de datos

### 💰 Control Financiero
- Registro de ahorros
- Registro de gastos
- Historial de transacciones
- Exportación de datos

### 🎨 Interfaz
- **Tema oscuro/claro** con toggle
- **Responsive design** (mobile-first)
- **Animaciones suaves**
- **Notificaciones visuales**

### 📱 PWA Features
- Instalable como app nativa
- Funciona 100% offline
- Cache inteligente
- Notificaciones push

---

## 🛠️ Tecnologías

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Grid, Flexbox, Animations
- **JavaScript (ES6+)** - Async/await, Modules, Arrow Functions
- **Chart.js 4.4.0** - Librería de gráficos

### PWA Stack
- **Service Workers** - Cache offline, push notifications
- **Web App Manifest** - Instalación como app nativa
- **LocalStorage API** - Persistencia de datos
- **Notifications API** - Alertas del sistema

---

## 📦 Instalación

### Opción 1: Clonar repositorio

```bash
git clone https://github.com/TU_USUARIO/sistema-libertad-2026.git
cd sistema-libertad-2026
open index.html
```

### Opción 2: Servidor local

```bash
# Con Python
python3 -m http.server 8000

# Con Node.js
npx serve

# Acceder a: http://localhost:8000
```

---

## 🚀 Uso

### Cambiar entre Modo Claro/Oscuro
- Click en el botón 🌙/☀️ en la esquina superior derecha
- El tema se guarda automáticamente

### Registrar Ahorro
1. Click en **"💰 Registrar Ahorro"**
2. Ingresa la cantidad
3. Se actualiza dashboard, gráficos e historial

### Registrar Gasto
1. Click en **"💸 Registrar Gasto"**
2. Ingresa cantidad y descripción
3. Se resta de tus ahorros y se registra en historial

### Completar Hábitos
- **Método 1:** Click directo en la tarjeta del hábito
- **Método 2:** Botón "✓ Completar Hábito"

### Exportar Datos
- Click en **"📥 Exportar Datos"**
- Descarga archivo CSV con tu historial

---

## 📊 Personalización de Datos

Edita `data/data.json`:

```json
{
  "finance": {
    "savings": 2450,
    "goal": 10000,
    "monthly_income": 1800,
    "monthly_expenses": 1200,
    "investments": 850
  },
  "habits": [
    {
      "id": 1,
      "name": "Tu hábito",
      "completed": false,
      "streak": 0
    }
  ],
  "goals": [
    {
      "name": "Tu objetivo",
      "target": 5000,
      "current": 1000,
      "deadline": "2026-12-31"
    }
  ],
  "history": [
    {
      "date": "2026-01-30T10:00:00Z",
      "type": "income",
      "description": "Descripción",
      "amount": 100
    }
  ]
}
```

---

## 🏗️ Arquitectura

```
sistema-libertad-2026/
├── index.html          # Página principal
├── style.css           # Estilos (tema claro/oscuro)
├── app.js              # Lógica + gráficos Chart.js
├── sw.js               # Service Worker
├── manifest.json       # Web App Manifest
├── data/
│   └── data.json       # Base de datos
├── icon-192.png
├── icon-512.png
└── README.md
```

---

## 📈 Gráficos

### Tipos de gráficos implementados:

1. **Línea** - Evolución temporal de ahorros
2. **Doughnut** - Distribución financiera
3. **Barras** - Progreso de objetivos
4. **Barras** - Cumplimiento de hábitos

### Personalización de gráficos:

Los gráficos se adaptan automáticamente al tema claro/oscuro.

---

## 🆚 Comparación de Versiones

| Feature | v1.0 | v2.0 PRO+ |
|---------|------|-----------|
| Dashboard básico | ✅ | ✅ |
| Objetivos | ✅ | ✅ |
| Hábitos | ✅ | ✅ |
| **Gráficos interactivos** | ❌ | ✅ |
| **Modo claro/oscuro** | ❌ | ✅ |
| **Historial** | ❌ | ✅ |
| **Exportar datos** | ❌ | ✅ |
| **Registro de gastos** | ❌ | ✅ |
| **Resumen rápido** | ❌ | ✅ |

---

## 🗺️ Roadmap

### ✅ Versión 2.0 (Actual)
- [x] Gráficos interactivos con Chart.js
- [x] Modo claro/oscuro
- [x] Historial de transacciones
- [x] Exportar a CSV
- [x] Registro de gastos

### 🔜 Versión 2.1 (Próxima)
- [ ] Filtros de historial por fecha
- [ ] Categorías de gastos personalizables
- [ ] Múltiples monedas
- [ ] Calculadora de interés compuesto
- [ ] Comparador de inversiones

### 🚀 Versión 3.0 (Futuro)
- [ ] Backend con Node.js + MongoDB
- [ ] Autenticación y multi-usuario
- [ ] Sincronización en la nube
- [ ] App móvil nativa (React Native)
- [ ] Integración bancaria (open banking)

---

## 🎨 Temas

### Tema Oscuro (Default)
- Fondo: #111827
- Cards: #1f2937
- Texto: #f9fafb
- Acento: #3b82f6

### Tema Claro
- Fondo: #f3f4f6
- Cards: #ffffff
- Texto: #111827
- Acento: #3b82f6

---

## 🤝 Contribuir

¿Quieres mejorar el proyecto? ¡Todas las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add: AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Changelog

### v2.0.0 (2026-01-30)
- ✨ Añadidos gráficos interactivos con Chart.js
- ✨ Implementado modo claro/oscuro
- ✨ Agregado historial de transacciones
- ✨ Función de exportar datos a CSV
- ✨ Registro de gastos además de ahorros
- ✨ Dashboard de resumen rápido
- 🎨 Mejoras visuales generales
- 🐛 Corrección de bugs menores

### v1.0.0 (2026-01-28)
- 🎉 Lanzamiento inicial
- ✨ Dashboard financiero básico
- ✨ Sistema de objetivos
- ✨ Seguimiento de hábitos
- ✨ PWA offline-first

---

## 📄 Licencia

MIT License - Ver `LICENSE` para más información

---

## 👤 Contacto

**Tu Nombre**

- 📧 Email: tu.email@ejemplo.com
- 💼 LinkedIn: [linkedin.com/in/tu-perfil](https://linkedin.com/in/tu-perfil)
- 🐙 GitHub: [@tu-usuario](https://github.com/tu-usuario)

Proyecto: [github.com/tu-usuario/sistema-libertad-2026](https://github.com/tu-usuario/sistema-libertad-2026)

---

## 🙏 Agradecimientos

- [Chart.js](https://www.chartjs.org/) - Librería de gráficos
- [Google Fonts](https://fonts.google.com) - Tipografías
- Comunidad de desarrolladores web

---

**Hecho con ❤️, ☕ y 📊 para alcanzar la libertad financiera**

⭐ Si te gusta el proyecto, dale una estrella en GitHub!
