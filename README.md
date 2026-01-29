# 🚀 Sistema Libertad 2026 PRO

Una Progressive Web App (PWA) para ayudarte a alcanzar tu libertad financiera en 2026.

## ✨ Características

- 📊 **Dashboard Financiero**: Visualiza tus ahorros, inversiones y progreso
- 🎯 **Seguimiento de Objetivos**: Define y monitorea tus metas financieras
- ✅ **Hábitos Diarios**: Mantén el seguimiento de tus hábitos productivos
- 💡 **Motivación Diaria**: Frases inspiradoras para mantenerte enfocado
- 📱 **PWA Offline**: Funciona sin conexión a internet
- 🔔 **Notificaciones Push**: Recordatorios y actualizaciones

## 🚀 Instalación

1. Abre el archivo `index.html` en tu navegador web
2. En Chrome/Edge: Click en el icono de instalación en la barra de direcciones
3. En móvil: Menú → "Añadir a pantalla de inicio"

## 📦 Estructura del Proyecto

```
sistema-libertad-2026/
├── index.html          # Página principal
├── style.css          # Estilos de la aplicación
├── app.js             # Lógica de la aplicación
├── sw.js              # Service Worker (funcionalidad offline)
├── manifest.json      # Configuración de la PWA
├── data/
│   └── data.json      # Datos de la aplicación
└── README.md          # Este archivo
```

## 💾 Datos

Los datos se almacenan en dos lugares:
1. **data/data.json**: Archivo principal con toda la información
2. **localStorage**: Backup automático en el navegador

### Estructura de datos:

```json
{
  "motivation": ["Frases motivacionales"],
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
      "name": "Ejercicio matutino",
      "completed": true,
      "streak": 15
    }
  ],
  "goals": [
    {
      "name": "Fondo de emergencia",
      "target": 6000,
      "current": 2450,
      "deadline": "2026-06-30"
    }
  ]
}
```

## 🎮 Uso

### Registrar Ahorro
1. Click en "💰 Registrar Ahorro"
2. Ingresa la cantidad
3. El dashboard se actualiza automáticamente

### Completar Hábitos
- **Opción 1**: Click en "✓ Completar Hábito" y escribe el nombre
- **Opción 2**: Click directamente en la tarjeta del hábito

### Actualizar Datos
- Click en "🔄 Actualizar" para recargar la información

## 🛠️ Personalización

### Cambiar Objetivos
Edita el archivo `data/data.json` en la sección `goals`:

```json
"goals": [
  {
    "name": "Tu objetivo",
    "target": 5000,
    "current": 1000,
    "deadline": "2026-12-31"
  }
]
```

### Añadir Hábitos
Edita el archivo `data/data.json` en la sección `habits`:

```json
"habits": [
  {
    "id": 5,
    "name": "Nuevo hábito",
    "completed": false,
    "streak": 0
  }
]
```

### Modificar Frases Motivacionales
Edita el array `motivation` en `data/data.json`:

```json
"motivation": [
  "Tu frase motivacional aquí",
  "Otra frase inspiradora"
]
```

## 📱 Características PWA

- ✅ Funciona offline después de la primera carga
- ✅ Se puede instalar como app nativa
- ✅ Notificaciones push
- ✅ Actualización automática en background
- ✅ Responsive design (móvil y escritorio)

## 🔧 Tecnologías Utilizadas

- HTML5
- CSS3 (Gradientes, Flexbox, Grid)
- JavaScript (ES6+)
- Service Workers
- Web Notifications API
- LocalStorage API
- Progressive Web App

## 🎨 Personalizar Colores

Los colores principales están definidos en `style.css`:

```css
/* Fondo principal */
background: linear-gradient(135deg, #111827 0%, #1f2937 100%);

/* Color de acento */
color: #3b82f6;

/* Gradiente de éxito */
background: linear-gradient(90deg, #3b82f6 0%, #10b981 100%);
```

## 📊 Consejos de Uso

1. **Actualiza tus datos diariamente** para mantener el seguimiento preciso
2. **Revisa tu progreso semanalmente** para ajustar tu estrategia
3. **Completa tus hábitos diarios** para mantener las rachas
4. **Establece objetivos realistas** y alcanzables
5. **Celebra tus logros** cuando alcances tus metas

## 🔐 Privacidad

Todos los datos se almacenan localmente en tu dispositivo. No se envía información a ningún servidor externo.

## 📈 Próximas Mejoras

- [ ] Gráficos de progreso histórico
- [ ] Exportar datos a CSV/Excel
- [ ] Categorías de gastos
- [ ] Calculadora de inversiones
- [ ] Modo oscuro/claro
- [ ] Múltiples idiomas
- [ ] Integración con bancos (opcional)

## 🤝 Contribuir

¿Ideas para mejorar el Sistema Libertad 2026? ¡Todas las sugerencias son bienvenidas!

## 📄 Licencia

Proyecto personal - Uso libre

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2026  

¡Hacia tu libertad financiera! 🚀💰
