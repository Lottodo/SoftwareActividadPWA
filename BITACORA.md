# Bitácora de Prompts
# Ingeniería de Software
# Meta 1.1: Crear una PWA con asistencia de la IA

Este documento registra los prompts utilizados durante el desarrollo de la actividad del taller de la materia Ingeniería de Software. Se utilizó el chatbot: Claude Sonnet

## Formato de registro

### Prompt #01
**Prompt utilizado:**
> necesito construir una lista de tareas offline para generar los pilares tecnicos manifest y sw
> necesito que me digas paso a paso como debo hacer la estructura de la app, creacion del manifest, creacion del service worker y creacion de la interfaz de manera que se pueda aprender

**Resultado obtenido:**
Se explicó de manera breve la estructura básica de una aplicación web progresiva (PWA), identificando los archivos principales y su función dentro del proyecto. Como resultado, se definió la siguiente organización del proyecto:

```text
todo-pwa/
├── index.html          # Interfaz de usuario
├── styles.css          # Estilos
├── app.js              # Lógica de la aplicación
├── manifest.json       # Configuración PWA
└── sw.js               # Service Worker
```

Se utilizó la separación de archivos mediante `styles.css` y `app.js` con el objetivo de distribuir la lectura del código de la aplicación, facilitando su comprensión, mantenimiento y organización, al dividir la lógica de funcionamiento y el diseño visual en componentes independientes.


---

### Prompt #02
**Prompt utilizado:**
> necesito una demostracion de como seria el manifest.json de la app

**Resultado obtenido:**
Se entregó un ejemplo del código JSON para la PWA, con una explicación de que hace cada campo:

- name: Nombre completo de la app
- short_name: Nombre corto para pantalla de inicio
- display: standalone: La app se ve como app nativa
- theme_color: Color de la barra de navegación
- icons: Íconos para diferentes tamaños (necesitarás crearlos)

---

### Prompt #03
**Prompt utilizado:**
> ayudame con como sería la estructura del service worker de la pwa

**Resultado obtenido:**
Se explicó la función del Service Worker como el componente que ayuda que la app funcione offline, explicando los eventos clave del código:

- install: Se ejecuta al instalar el SW, aquí cacheamos archivos
- activate: Limpia versiones antiguas del cache
- fetch: Intercepta peticiones y sirve desde cache

---

### Prompt #04
**Prompt utilizado:**
> ayudame la ui de la pwa, quiero que tanto el estilo como el código de javascript se mantengan organizados en archivos separados del html

**Resultado obtenido:**
Se entregó el código de los archivos HTML, CSS y JS donde se encuentra la página de la propia PWA

---


## Autores
- Alexandra Martínez Zavala
- José Carlos Ponce Odohui
