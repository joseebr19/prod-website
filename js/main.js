import { CONFIG } from '../config.js';

// ==========================================
// NÚCLEO PRINCIPAL DE LA WEB (MAIN.JS)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("SYSTEM: BESLY platform core loaded successfully.");

    const currentPage = window.location.pathname;

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
    console.log("MODULE: Launching automated beats engine with luvbesly Shop redirection...");

    const beatsList = document.getElementById('beats-list');
    if (!beatsList) return;

    // 1. BASE DE DATOS LOCAL DE BEATS (SNIPPETS Y ENLACES DE COMPRA REALES)
    const beatsData = [
        {
            id: 1,
            title: "DARKNESS",
            bpm: 140,
            mood: "hard",
            tag: "#DarkTrap",
            price: "$29.95",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
            buyUrl: "https://www.beatstars.com/luvbesly" 
        },
        {
            id: 2,
            title: "EMPIRE",
            bpm: 144,
            mood: "melodic",
            tag: "#Drill",
            price: "$29.95",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            buyUrl: "https://www.beatstars.com/luvbesly"
        },
        {
            id: 3,
            title: "TOXIC AUDIO",
            bpm: 130,
            mood: "experimental",
            tag: "#Phonk",
            price: "$34.95",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            buyUrl: "https://www.beatstars.com/luvbesly"
        },
        {
            id: 4,
            title: "VAMP",
            bpm: 150,
            mood: "hard",
            tag: "#Rage #PlayboiCarti",
            price: "$39.95",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            buyUrl: "https://www.beatstars.com/luvbesly"
        }
    ];

    // INSTANCIA DE AUDIO GLOBAL ÚNICA
    let currentAudio = new Audio();
    let currentPlayingId = null;

    // 2. MOTOR DE RENDERIZADO
    function renderBeats(filter = "all") {
        beatsList.innerHTML = "";

        const filteredBeats = beatsData.filter(beat => filter === "all" || beat.mood === filter);

        if (filteredBeats.length === 0) {
            beatsList.innerHTML = `<p style="text-align: center; color: #444444; padding: 20px; font-family: 'Orbitron', sans-serif;">NO BEATS FOUND</p>`;
            return;
        }

        filteredBeats.forEach(beat => {
            const beatRow = document.createElement('div');
            beatRow.classList.add('beat-row');
            beatRow.setAttribute('data-mood', beat.mood);

            const isPlaying = (beat.id === currentPlayingId && !currentAudio.paused);
            const btnIcon = isPlaying ? "⏸" : "▶";

            beatRow.innerHTML = `
                <div class="beat-main">
                    <button class="play-btn" data-id="${beat.id}">${btnIcon}</button>
                    <div class="beat-details">
                        <h3>${beat.title}</h3>
                        <span class="beat-bpm">${beat.bpm} BPM</span>
                        <span class="beat-tag">${beat.tag}</span>
                    </div>
                </div>
                <div class="beat-actions">
                    <span class="beat-price">${beat.price}</span>
                    <a href="${beat.buyUrl}" target="_blank" class="buy-link-btn">
                        <button class="buy-btn">BUY LICENSE</button>
                    </a>
                </div>
            `;
            
            const playBtn = beatRow.querySelector('.play-btn');
            playBtn.addEventListener('click', () => toggleAudio(beat, playBtn));

            beatsList.appendChild(beatRow);
        });
    }

    // 3. LÓGICA DE CONTROL DEL REPRODUCTOR
    function toggleAudio(beat, clickedBtn) {
        if (currentPlayingId === beat.id) {
            if (currentAudio.paused) {
                currentAudio.play();
                clickedBtn.innerText = "⏸";
            } else {
                currentAudio.pause();
                clickedBtn.innerText = "▶";
            }
        } else {
            currentAudio.pause();
            currentAudio.src = beat.audioUrl;
            currentAudio.play();
            currentPlayingId = beat.id;

            document.querySelectorAll('.play-btn').forEach(btn => btn.innerText = "▶");
            clickedBtn.innerText = "⏸";
        }
    }

    currentAudio.addEventListener('ended', () => {
        currentPlayingId = null;
        document.querySelectorAll('.play-btn').forEach(btn => btn.innerText = "▶");
    });

    renderBeats();

    // 4. CONTROL DE FILTROS (HARD, MELODIC, EXPERIMENTAL)
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeBtn = document.querySelector('.filter-btn.active');
            if (activeBtn) activeBtn.classList.remove('active');
            button.classList.add('active');

            const selectedMood = button.getAttribute('data-mood');
            renderBeats(selectedMood);
        });
    });
}

function initKitsPage() {
    console.log("MODULE: Sound Kits store initialized. Ready for product data mapping.");

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

    kitsGrid.innerHTML = "";

    soundKitsData.forEach(kit => {
        const kitCard = document.createElement('div');
        kitCard.classList.add('kit-card');

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

async function initVideosPage() {
    console.log("MODULE: Launching live YouTube API channel connection...");

    const videosGrid = document.getElementById('videos-grid');
    if (!videosGrid) return;

    // LEEMOS LA LLAVE DESDE EL ARCHIVO EXTERNO CONFIG.JS PROTEGIDO POR .GITIGNORE
    const API_KEY = CONFIG.YOUTUBE_API_KEY; 
    const CHANNEL_ID = "UCSrZwcNfFed4TqlEaQS6IAQ";
    const MAX_RESULTS = 3; 

    videosGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #444444; font-family: 'Orbitron', sans-serif; letter-spacing: 2px;">
            LOADING LIVE FEED...
        </div>
    `;

    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&type=video`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`YouTube API responded with status: ${response.status}`);
        }

        const data = await response.json();
        const liveVideos = data.items;

        videosGrid.innerHTML = "";

        if (!liveVideos || liveVideos.length === 0) {
            videosGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #444444;">No videos found on this channel.</p>`;
            return;
        }

        liveVideos.forEach(video => {
            const videoId = video.id.videoId;
            const videoTitle = video.snippet.title;

            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');

            videoCard.innerHTML = `
                <div class="video-wrapper">
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}" 
                        title="${videoTitle}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    <h3>${videoTitle}</h3>
                </div>
            `;

            videosGrid.appendChild(videoCard);
        });

        console.log(`SYSTEM: YouTube live feed synchronized successfully. Rendered ${liveVideos.length} videos.`);

    } catch (error) {
        console.error("CIBERSEGURIDAD / API ERROR:", error);
        videosGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: #ff3333; padding: 20px; font-size: 0.9rem; font-family: 'Montserrat', sans-serif; letter-spacing: 1px;">
                FEED TEMPORARILY UNAVAILABLE. PLEASE CHECK BACK LATER.
            </div>
        `;
    }
}