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

    // Base de datos de tus Sound Kits
    const soundKitsData = [
        {
            id: 1,
            title: "! LUVME DRUMKIT",
            description: "Essential high-quality sounds for modern trap, phonk and underground beats.",
            price: "FREE",
            isFree: true,
            link: "kit-luvme.html",
            coverText: "LUVME",
            btnText: "DOWNLOAD"
        },
        {
            id: 2,
            title: "COMING SOON",
            description: "Premium underground sounds currently in development.",
            price: "$19.99",
            isFree: false,
            link: "#",
            coverText: "NEXT KIT",
            btnText: "LOCKED"
        }
    ];

    const kitsGrid = document.getElementById('kits-grid');
    if (!kitsGrid) return;

    // Limpiamos el contenedor por seguridad antes de rellenar
    kitsGrid.innerHTML = "";

    soundKitsData.forEach(kit => {
        const kitCard = document.createElement('div');
        kitCard.classList.add('kit-card');

        // Generamos la estructura condicional según si el kit es gratuito o de pago
        if (kit.isFree) {
            kitCard.innerHTML = `
                <a href="${kit.link}" class="kit-link">
                    <div class="kit-cover free-kit">
                        <span>${kit.coverText}</span>
                    </div>
                </a>
                <div class="kit-info">
                    <h3>${kit.title}</h3>
                    <p>${kit.description}</p>
                    <div class="kit-footer">
                        <span class="kit-price free">${kit.price}</span>
                        <a href="${kit.link}" class="kit-btn free-btn" style="text-align: center;">${kit.btnText}</a>
                    </div>
                </div>
            `;
        } else {
            kitCard.innerHTML = `
                <div class="kit-cover">
                    <span>${kit.coverText}</span>
                </div>
                <div class="kit-info">
                    <h3>${kit.title}</h3>
                    <p>${kit.description}</p>
                    <div class="kit-footer">
                        <span class="kit-price">${kit.price}</span>
                        <button class="kit-btn" disabled style="opacity: 0.3; cursor: not-allowed;">${kit.btnText}</button>
                    </div>
                </div>
            `;
        }

        kitsGrid.appendChild(kitCard);
    });
}

function initVideosPage() {
    console.log("MODULE: Videos section initialized. Ready for YouTube API integration.");

    // Base de datos de tus vídeos (Extrayendo el código identificador de la URL de YouTube)
    const videosData = [
        {
            id: 1,
            title: "BESLY x UNDERGROUND - \"DARKNESS\" | Hard Trap Type Beat",
            youtubeId: "dQw4w9WgXcQ"
        },
        {
            id: 2,
            title: "CREATING A BEAT FROM SCRATCH | Studio Vlog #01",
            youtubeId: "dQw4w9WgXcQ"
        },
        {
            id: 3,
            title: "EMPIRE - Aggressive Drill Instrumental",
            youtubeId: "dQw4w9WgXcQ"
        }
    ];

    const videosGrid = document.getElementById('videos-grid');
    if (!videosGrid) return;

    // Limpiamos el contenedor por seguridad antes de rellenar
    videosGrid.innerHTML = "";

    // Mapeamos los datos para inyectar cada tarjeta de vídeo
    videosData.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');

        videoCard.innerHTML = `
            <div class="video-wrapper">
                <iframe 
                    src="https://www.youtube.com/embed/${video.youtubeId}" 
                    title="${video.title}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
            </div>
        `;

        videosGrid.appendChild(videoCard);
    });
}