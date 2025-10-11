document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA CATEGORÍAS PRINCIPALES ---
    const filtrosPrincipales = document.querySelectorAll('.filtro-principal-btn');
    const subcategoriasContainers = document.querySelectorAll('.subcategorias');
    const categoriasJuegos = document.querySelectorAll('.categoria-juegos');

    // Inicializar: mostrar solo "Sin Materiales" al cargar
    function inicializarCategorias() {
        // Ocultar todas las categorías de juegos
        categoriasJuegos.forEach(categoria => {
            categoria.style.display = 'none';
        });
        
        // Ocultar todas las subcategorías
        subcategoriasContainers.forEach(container => {
            container.style.display = 'none';
        });
        
        // Mostrar solo "Sin Materiales"
        document.getElementById('juegos-sin-materiales').style.display = 'block';
        document.getElementById('subcategorias-sin-materiales').style.display = 'block';
        
        // Activar filtro "Todos" en Sin Materiales
        const filtroTodosSin = document.querySelector('[data-filter="todos-sin"]');
        if (filtroTodosSin) {
            filtroTodosSin.classList.add('activo');
        }
    }

    // Configurar event listeners para categorías principales
    filtrosPrincipales.forEach(boton => {
        boton.addEventListener('click', () => {
            console.log('Clic en categoría principal:', boton.dataset.categoriaPrincipal);
            
            // Manejar estado activo de categorías principales
            filtrosPrincipales.forEach(btn => btn.classList.remove('activo'));
            boton.classList.add('activo');

            const categoriaPrincipal = boton.dataset.categoriaPrincipal;

            // Mostrar/ocultar subcategorías correspondientes
            subcategoriasContainers.forEach(container => {
                if (container.id === `subcategorias-${categoriaPrincipal}`) {
                    container.style.display = 'block';
                    console.log('Mostrando subcategorías:', container.id);
                } else {
                    container.style.display = 'none';
                }
            });

            // Mostrar/ocultar juegos de la categoría correspondiente
            categoriasJuegos.forEach(categoria => {
                if (categoria.id === `juegos-${categoriaPrincipal}`) {
                    categoria.style.display = 'block';
                    console.log('Mostrando juegos:', categoria.id);
                } else {
                    categoria.style.display = 'none';
                }
            });

            // Resetear a "Todos" en las subcategorías
            const subcategoriaContainer = document.querySelector(`#subcategorias-${categoriaPrincipal}`);
            if (subcategoriaContainer) {
                const filtrosSub = subcategoriaContainer.querySelectorAll('.filtro-btn');
                filtrosSub.forEach(btn => btn.classList.remove('activo'));
                const filtroTodos = subcategoriaContainer.querySelector('[data-filter^="todos-"]');
                if (filtroTodos) {
                    filtroTodos.classList.add('activo');
                    // Aplicar filtro "todos" inmediatamente
                    aplicarFiltroSubcategoria(categoriaPrincipal, filtroTodos.dataset.filter);
                }
            }
        });
    });

    // --- LÓGICA PARA FILTROS DE SUBCATEGORÍAS ---
    function aplicarFiltroSubcategoria(categoriaPrincipal, filtro) {
        console.log('Aplicando filtro:', filtro, 'en categoría:', categoriaPrincipal);
        
        const juegosCategoria = document.querySelectorAll(`#juegos-${categoriaPrincipal} .game-card`);
        console.log('Juegos encontrados:', juegosCategoria.length);
        
        let juegosVisibles = 0;
        
        juegosCategoria.forEach(card => {
            const subcategorias = card.dataset.subcategoria.split(' ');
            
            // Verificar si el juego coincide con el filtro
            const coincide = filtro.startsWith('todos-') || subcategorias.includes(filtro);
            
            if (coincide) {
                card.style.display = 'block';
                card.classList.remove('hidden');
                juegosVisibles++;
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
        
        console.log('Juegos visibles después del filtro:', juegosVisibles);
    }

    // Agregar event listeners a todos los filtros de subcategorías
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filtro-btn')) {
            console.log('Clic en subcategoría:', e.target.dataset.filter);
            
            // Manejar estado activo del botón de subcategoría
            const filtrosGrupo = e.target.parentElement.querySelectorAll('.filtro-btn');
            filtrosGrupo.forEach(btn => btn.classList.remove('activo'));
            e.target.classList.add('activo');

            // Obtener categoría principal activa
            const categoriaPrincipalActiva = document.querySelector('.filtro-principal-btn.activo');
            if (categoriaPrincipalActiva) {
                const categoriaPrincipal = categoriaPrincipalActiva.dataset.categoriaPrincipal;
                
                // Aplicar filtro
                aplicarFiltroSubcategoria(categoriaPrincipal, e.target.dataset.filter);
            }
        }
    });

    // --- LÓGICA PARA HACER LOS GAME CARDS CLICKEABLES ---
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Prevenir que el clic se propague a otros event listeners
            e.stopPropagation();
            
            const gameId = card.dataset.id;
            console.log('Clic en juego:', gameId);
            
            // Verificar si el juego existe antes de redirigir
            if (gameId && gameId !== 'undefined') {
                window.location.href = `juego-${gameId}.html`;
            } else {
                console.warn('Juego sin ID definido:', card);
                // Mostrar un mensaje al usuario
                alert('Este juego aún no tiene página de detalles. ¡Próximamente!');
            }
        });
    });

    // --- LÓGICA PARA EL FORMULARIO DE SUGERENCIAS ---
    const suggestionForm = document.getElementById('suggestionForm');
    const categoriaPrincipalForm = document.getElementById('categoria-principal-form');
    const subcategoriaForm = document.getElementById('subcategoria-form');
    const charCount = document.getElementById('charCount');
    const descripcionTextarea = document.querySelector('textarea[name="descripcion"]');

    // Mapeo de subcategorías por categoría principal
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

    // Actualizar subcategorías cuando cambia la categoría principal en el formulario
    if (categoriaPrincipalForm) {
        categoriaPrincipalForm.addEventListener('change', () => {
            const categoriaSeleccionada = categoriaPrincipalForm.value;
            const subcategorias = subcategoriasMap[categoriaSeleccionada] || [];
            
            // Limpiar y llenar el select de subcategorías
            subcategoriaForm.innerHTML = '<option value="">Subcategoría *</option>';
            subcategorias.forEach(subcat => {
                const option = document.createElement('option');
                option.value = subcat.value;
                option.textContent = subcat.label;
                subcategoriaForm.appendChild(option);
            });
        });
    }

    // Contador de caracteres para la descripción
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

    // Envío del formulario (versión temporal con localStorage)
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

            // Validar campos obligatorios
            if (!suggestion.juego || !suggestion.categoria_principal || !suggestion.subcategoria || !suggestion.descripcion) {
                alert('Por favor completa todos los campos obligatorios (*)');
                return;
            }

            // Guardar en localStorage
            const existingSuggestions = JSON.parse(localStorage.getItem('sugerenciasSinTablero') || '[]');
            existingSuggestions.push(suggestion);
            localStorage.setItem('sugerenciasSinTablero', JSON.stringify(existingSuggestions));

            // Mostrar mensaje de éxito
            alert(`¡Gracias ${suggestion.nombre}! Tu sugerencia "${suggestion.juego}" fue guardada. La revisaremos pronto.`);
            
            // Limpiar formulario
            suggestionForm.reset();
            if (charCount) charCount.textContent = '0';
            
            // Resetear subcategorías
            if (subcategoriaForm) {
                subcategoriaForm.innerHTML = '<option value="">Subcategoría *</option>';
            }
        });
    }

    // --- INICIALIZACIÓN ---
    inicializarCategorias();
    console.log('Sin Tablero - JavaScript cargado correctamente');

    // Debug: mostrar estado inicial
    console.log('Categorías principales:', filtrosPrincipales.length);
    console.log('Subcategorías containers:', subcategoriasContainers.length);
    console.log('Categorías juegos:', categoriasJuegos.length);
    console.log('Game cards:', gameCards.length);

});
