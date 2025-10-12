document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Sin Tablero - Inicializando...');

    // --- CONFIGURACIÓN INICIAL ---
    const filtrosPrincipales = document.querySelectorAll('.filtro-principal-btn');
    const subcategoriasContainers = document.querySelectorAll('.subcategorias');
    const categoriasJuegos = document.querySelectorAll('.categoria-juegos');
    const juegosTodosContainer = document.getElementById('juegos-todos');
    const gameCards = document.querySelectorAll('.game-card');

    // --- INICIALIZACIÓN ---
    function inicializar() {
        console.log('🎯 Inicializando categorías...');
        
        // Ocultar todas las categorías
        categoriasJuegos.forEach(categoria => {
            categoria.style.display = 'none';
        });
        
        // Ocultar todas las subcategorías
        subcategoriasContainers.forEach(container => {
            container.style.display = 'none';
        });
        
        // Mostrar solo "Sin Materiales" por defecto
        document.getElementById('juegos-sin-materiales').style.display = 'block';
        document.getElementById('subcategorias-sin-materiales').style.display = 'block';
        
        // Activar filtro "Todos" en Sin Materiales
        const filtroTodosSin = document.querySelector('[data-filter="todos-sin"]');
        if (filtroTodosSin) {
            filtroTodosSin.classList.add('activo');
        }

        console.log('✅ Inicialización completada');
    }

    // --- LÓGICA PARA CATEGORÍAS PRINCIPALES ---
    filtrosPrincipales.forEach(boton => {
        boton.addEventListener('click', () => {
            console.log('📌 Clic en categoría:', boton.dataset.categoriaPrincipal);
            
            // Manejar estado activo
            filtrosPrincipales.forEach(btn => btn.classList.remove('activo'));
            boton.classList.add('activo');

            const categoriaPrincipal = boton.dataset.categoriaPrincipal;

            // Manejar categoría "todos" de forma especial
            if (categoriaPrincipal === 'todos') {
                mostrarTodosLosJuegos();
                return;
            }

            // Para categorías normales
            manejarCategoriaNormal(categoriaPrincipal);
        });
    });

    function manejarCategoriaNormal(categoriaPrincipal) {
        // Ocultar todos los juegos primero
        categoriasJuegos.forEach(categoria => {
            categoria.style.display = 'none';
        });
        
        // Ocultar todas las subcategorías
        subcategoriasContainers.forEach(container => {
            container.style.display = 'none';
        });

        // Mostrar subcategorías correspondientes
        const subcategoriaContainer = document.getElementById(`subcategorias-${categoriaPrincipal}`);
        if (subcategoriaContainer) {
            subcategoriaContainer.style.display = 'block';
        }

        // Mostrar juegos correspondientes
        const juegosCategoria = document.getElementById(`juegos-${categoriaPrincipal}`);
        if (juegosCategoria) {
            juegosCategoria.style.display = 'block';
        }

        // Resetear filtros de subcategorías
        if (subcategoriaContainer) {
            const filtrosSub = subcategoriaContainer.querySelectorAll('.filtro-btn');
            filtrosSub.forEach(btn => btn.classList.remove('activo'));
            const filtroTodos = subcategoriaContainer.querySelector('[data-filter^="todos-"]');
            if (filtroTodos) {
                filtroTodos.classList.add('activo');
                aplicarFiltroSubcategoria(categoriaPrincipal, filtroTodos.dataset.filter);
            }
        }
    }

    function mostrarTodosLosJuegos() {
        console.log('🌟 Mostrando todos los juegos...');
        
        // Ocultar todas las categorías normales
        categoriasJuegos.forEach(categoria => {
            categoria.style.display = 'none';
        });
        
        // Ocultar todas las subcategorías
        subcategoriasContainers.forEach(container => {
            container.style.display = 'none';
        });

        // Mostrar contenedor de "todos"
        if (juegosTodosContainer) {
            juegosTodosContainer.style.display = 'block';
            
            // Limpiar y llenar con todos los juegos
            juegosTodosContainer.innerHTML = '<div class="juegos-grilla"></div>';
            const grilla = juegosTodosContainer.querySelector('.juegos-grilla');
            
            gameCards.forEach(card => {
                const cardClone = card.cloneNode(true);
                grilla.appendChild(cardClone);
            });

            console.log(`✅ Mostrando ${gameCards.length} juegos en "Ver Todo"`);
        }
    }

    // --- LÓGICA PARA FILTROS DE SUBCATEGORÍAS ---
    function aplicarFiltroSubcategoria(categoriaPrincipal, filtro) {
        console.log('🔍 Aplicando filtro:', filtro, 'en categoría:', categoriaPrincipal);
        
        const juegosCategoria = document.querySelectorAll(`#juegos-${categoriaPrincipal} .game-card`);
        let juegosVisibles = 0;
        
        juegosCategoria.forEach(card => {
            const subcategorias = card.dataset.subcategoria.split(' ');
            
            const coincide = filtro.startsWith('todos-') || subcategorias.includes(filtro);
            
            if (coincide) {
                card.style.display = 'block';
                juegosVisibles++;
            } else {
                card.style.display = 'none';
            }
        });
        
        console.log(`📊 Juegos visibles: ${juegosVisibles}/${juegosCategoria.length}`);
    }

    // Event listeners para subcategorías
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filtro-btn')) {
            console.log('🎯 Clic en subcategoría:', e.target.dataset.filter);
            
            // Manejar estado activo
            const filtrosGrupo = e.target.parentElement.querySelectorAll('.filtro-btn');
            filtrosGrupo.forEach(btn => btn.classList.remove('activo'));
            e.target.classList.add('activo');

            // Obtener categoría principal activa
            const categoriaPrincipalActiva = document.querySelector('.filtro-principal-btn.activo');
            if (categoriaPrincipalActiva && categoriaPrincipalActiva.dataset.categoriaPrincipal !== 'todos') {
                const categoriaPrincipal = categoriaPrincipalActiva.dataset.categoriaPrincipal;
                aplicarFiltroSubcategoria(categoriaPrincipal, e.target.dataset.filter);
            }
        }
    });

    // --- GAME CARDS CLICKEABLES ---
    function hacerGameCardsClickeables() {
        document.addEventListener('click', (e) => {
            const gameCard = e.target.closest('.game-card');
            if (gameCard) {
                const gameId = gameCard.dataset.id;
                console.log('🎮 Clic en juego:', gameId);
                
                if (gameId && gameId !== 'undefined') {
                    window.location.href = `juego-${gameId}.html`;
                } else {
                    alert('Este juego aún no tiene página de detalles. ¡Próximamente!');
                }
            }
        });
    }

    // --- FORMULARIO DE SUGERENCIAS ---
    const suggestionForm = document.getElementById('suggestionForm');
    const categoriaPrincipalForm = document.getElementById('categoria-principal-form');
    const subcategoriaForm = document.getElementById('subcategoria-form');
    const charCount = document.getElementById('charCount');
    const descripcionTextarea = document.querySelector('textarea[name="descripcion"]');

    // Mapeo de subcategorías
    const subcategoriasMap = {
        'sin-materiales': [
            { value: 'juntadas-sin', label: 'Juntadas' },
            { value: 'citas-sin', label: 'Citas' },
            { value: 'familia-sin', label: 'Familia' },
            { value: 'rompehielo-sin', label: 'Rompehielo' }
        ],
        'con-materiales': [
            { value: 'papel-lapiz', label: 'Papel y Lápiz' },
            { value: 'objetos-cotidianos', label: 'Objetos Cotidianos' },
            { value: 'exteriores', label: 'Exteriores' }
        ],
        'cartas': [
            { value: 'familia-cartas', label: 'Familia' },
            { value: 'apuestas-cartas', label: 'Apuestas' },
            { value: 'estrategia-cartas', label: 'Estrategia' },
            { value: 'rapidos-cartas', label: 'Rápidos' }
        ]
    };

    // Configurar formulario
    if (categoriaPrincipalForm) {
        categoriaPrincipalForm.addEventListener('change', () => {
            const categoriaSeleccionada = categoriaPrincipalForm.value;
            const subcategorias = subcategoriasMap[categoriaSeleccionada] || [];
            
            subcategoriaForm.innerHTML = '<option value="">Subcategoría *</option>';
            subcategorias.forEach(subcat => {
                const option = document.createElement('option');
                option.value = subcat.value;
                option.textContent = subcat.label;
                subcategoriaForm.appendChild(option);
            });
        });
    }

    // Contador de caracteres
    if (descripcionTextarea && charCount) {
        descripcionTextarea.addEventListener('input', () => {
            const length = descripcionTextarea.value.length;
            charCount.textContent = length;
            
            if (length > 450) {
                charCount.style.color = '#dc2626';
            } else {
                charCount.style.color = 'inherit';
            }
        });
    }

    // Envío del formulario
    if (suggestionForm) {
        suggestionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(suggestionForm);
            const suggestion = {
                nombre: formData.get('nombre') || 'Anónimo',
                juego: formData.get('juego'),
                categoria_principal: formData.get('categoria-principal'),
                subcategoria: formData.get('subcategoria'),
                jugadores_min: formData.get('jugadores_min'),
                jugadores_max: formData.get('jugadores_max'),
                duracion: formData.get('duracion'),
                descripcion: formData.get('descripcion'),
                materiales: formData.get('materiales') || 'No especificados',
                fecha: new Date().toLocaleString('es-AR')
            };

            // Validar
            if (!suggestion.juego || !suggestion.categoria_principal || !suggestion.subcategoria || !suggestion.descripcion) {
                alert('Por favor completa todos los campos obligatorios (*)');
                return;
            }

            // Guardar en localStorage
            const existingSuggestions = JSON.parse(localStorage.getItem('sugerenciasSinTablero') || '[]');
            existingSuggestions.push(suggestion);
            localStorage.setItem('sugerenciasSinTablero', JSON.stringify(existingSuggestions));

            alert(`¡Gracias ${suggestion.nombre}! Tu sugerencia "${suggestion.juego}" fue guardada.`);
            
            // Limpiar formulario
            suggestionForm.reset();
            if (charCount) charCount.textContent = '0';
            if (subcategoriaForm) {
                subcategoriaForm.innerHTML = '<option value="">Subcategoría *</option>';
            }
        });
    }

    // --- EJECUCIÓN INICIAL ---
    inicializar();
    hacerGameCardsClickeables();
    
    console.log('🎉 Sin Tablero completamente cargado!');
    console.log('📊 Estadísticas:');
    console.log('  - Categorías principales:', filtrosPrincipales.length);
    console.log('  - Juegos totales:', gameCards.length);
});
