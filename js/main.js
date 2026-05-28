// ==========================================
// NÚCLEO PRINCIPAL DE LA WEB (MAIN.JS)
// ==========================================

// Nos aseguramos de que todo el HTML esté cargado antes de arrancar la lógica
document.addEventListener('DOMContentLoaded', () => {
    console.log("SYSTEM: BESLY platform core loaded successfully.");

    // Detectamos la ruta de la página actual en el navegador
    const currentPage = window.location.pathname;

    // Ejecutamos la función correcta según la página donde esté el usuario
    if (currentPage.includes('beats.html')) {
        initBeatsPage();
    } else if (currentPage.includes('kits.html') || currentPage.includes('kit-')) {
        initKitsPage();
    } else if (currentPage.includes('videos.html')) {
        initVideosPage();
    }
});

// ==========================================
// MÓDULOS DE CONTROL POR PÁGINA
// ==========================================

function initBeatsPage() {
    console.log("MODULE: Beats catalogue initialized. Ready for BeatStars API integration.");

    // Seleccionamos los elementos del HTML necesarios
    const filterButtons = document.querySelectorAll('.filter-btn');
    const beatRows = document.querySelectorAll('.beat-row');

    // Escuchamos los clics en cada uno de los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // 1. Gestión de estilos del botón activo
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            // 2. Capturamos el mood seleccionado
            const selectedMood = button.getAttribute('data-mood');
            console.log("ACTION: User requested filtering by mood: " + selectedMood);

            // 3. Lógica de filtrado visual de las filas de beats
            beatRows.forEach(row => {
                // Obtenemos el mood de esta fila en concreto
                const rowMood = row.getAttribute('data-mood');

                // Si el usuario pulsa 'all', mostramos todo. Si no, comparamos los moods.
                if (selectedMood === 'all' || selectedMood === rowMood) {
                    row.style.display = 'flex'; // Muestra la fila
                } else {
                    row.style.display = 'none'; // Oculta la fila
                }
            });
        });
    });
}

function initKitsPage() {
    console.log("MODULE: Sound Kits store initialized. Ready for product data mapping.");
}

function initVideosPage() {
    console.log("MODULE: Videos section initialized. Ready for YouTube API integration.");
}