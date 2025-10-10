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

    // --- LÓGICA PARA EL FORMULARIO DE SUGERENCIAS ---
    const suggestionForm = document.getElementById('suggestionForm');

    suggestionForm.addEventListener('submit', (e) => {
        // Previene que la página se recargue al enviar el formulario
        e.preventDefault();

        // Simula el envío y da una respuesta al usuario
        alert('¡Gracias por tu sugerencia! La revisaremos pronto.');

        // Limpia los campos del formulario
        suggestionForm.reset();
    });

});
