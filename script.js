document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA LOS FILTROS DE JUEGOS ---
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const gameCards = document.querySelectorAll('.game-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manejar el estado activo del botón
            filterButtons.forEach(btn => btn.classList.remove('activo'));
            button.classList.add('activo');

            const filter = button.dataset.filter;

            // Filtrar las tarjetas
            gameCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                
                if (filter === 'todos' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- HACER LOS GAME CARDS CLICKEABLES ---
    gameCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const gameId = card.dataset.id;
            window.location.href = `juego-${gameId}.html`;
        });
    });

    // --- LÓGICA MEJORADA PARA EL FORMULARIO DE SUGERENCIAS ---
const suggestionForm = document.getElementById('suggestionForm');
const charCount = document.getElementById('charCount');
const descripcionTextarea = document.querySelector('textarea[name="descripcion"]');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.querySelector('.btn-text');
const loadingSpinner = document.querySelector('.loading-spinner');
const formMessage = document.getElementById('formMessage');

// Contador de caracteres para la descripción
if (descripcionTextarea && charCount) {
    descripcionTextarea.addEventListener('input', () => {
        const length = descripcionTextarea.value.length;
        charCount.textContent = length;
        
        if (length > 450) {
            charCount.style.color = '#ff6b6b';
        } else {
            charCount.style.color = 'inherit';
        }
    });
}

// URL de tu Google Form (REEMPLAZA ESTO con tu URL real)
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/TU_ID_DEL_FORMULARIO_AQUI/formResponse';

// Campos del Google Form (REEMPLAZA con los entry IDs reales de tu form)
const FORM_ENTRY_IDS = {
    nombre: 'entry.554210182',      // Reemplaza con tu entry ID real
    juego: 'entry.1198269658',       // Reemplaza con tu entry ID real
    categoria: 'entry.389479982',   // Reemplaza con tu entry ID real
    jugadores_min: 'entry.449667703', // Reemplaza con tu entry ID real
    jugadores_max: 'entry.2034137364', // Reemplaza con tu entry ID real
    duracion: 'entry.1823919321',    // Reemplaza con tu entry ID real
    descripcion: 'entry.1639158699', // Reemplaza con tu entry ID real
    materiales: 'entry.1786874970'   // Reemplaza con tu entry ID real
};

suggestionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Mostrar estado de carga
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando...';
    loadingSpinner.style.display = 'block';
    formMessage.style.display = 'none';

    try {
        // Obtener datos del formulario
        const formData = new FormData(suggestionForm);
        const data = {
            nombre: formData.get('nombre') || 'Anónimo',
            juego: formData.get('juego'),
            categoria: formData.get('categoria'),
            jugadores_min: formData.get('jugadores_min') || '',
            jugadores_max: formData.get('jugadores_max') || '',
            duracion: formData.get('duracion') || '',
            descripcion: formData.get('descripcion'),
            materiales: formData.get('materiales') || 'No especificados'
        };

        // Validación adicional
        if (!data.juego || !data.descripcion || !data.categoria) {
            throw new Error('Por favor completa los campos obligatorios');
        }

        // Preparar datos para Google Forms
        const params = new URLSearchParams();
        params.append(FORM_ENTRY_IDS.nombre, data.nombre);
        params.append(FORM_ENTRY_IDS.juego, data.juego);
        params.append(FORM_ENTRY_IDS.categoria, data.categoria);
        params.append(FORM_ENTRY_IDS.jugadores_min, data.jugadores_min);
        params.append(FORM_ENTRY_IDS.jugadores_max, data.jugadores_max);
        params.append(FORM_ENTRY_IDS.duracion, data.duracion);
        params.append(FORM_ENTRY_IDS.descripcion, data.descripcion);
        params.append(FORM_ENTRY_IDS.materiales, data.materiales);

        // Enviar a Google Forms
        const response = await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        // Mostrar mensaje de éxito (aunque no podamos ver la respuesta por no-cors)
        showMessage('¡Sugerencia enviada con éxito! La revisaremos pronto.', 'success');
        suggestionForm.reset();
        charCount.textContent = '0';

    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        showMessage('Error al enviar la sugerencia. Por favor intenta nuevamente.', 'error');
    } finally {
        // Restaurar estado normal del botón
        submitBtn.disabled = false;
        btnText.textContent = 'Enviar sugerencia';
        loadingSpinner.style.display = 'none';
    }
});

// Función para mostrar mensajes al usuario
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

});

