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
    } else if (currentPage.includes('vsts.html')) { // CONTROLADOR DE LA PESTAÑA VST
        initVstsPage();
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

    let currentAudio = new Audio();
    let currentPlayingId = null;

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
                    <div class="kit-cover free-kit" style="padding: 0; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                        <img src="images/luvme-cover.png" alt="${kit.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </a>
                <div class="kit-info">
                    <h3>${kit.title}</h3>
                    <p>${kit.description}</p>
                    <div class="kit-footer">
                        <span class="kit-price free">${kit.price}</span>
                        <a href="https://www.beatstars.com/luvbesly/sound-kits/271767" target="_blank" class="kit-btn free-btn" style="text-align: center;">${kit.btnText}</a>
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

// ==========================================
// MÓDULO: ARCHIVO DE VSTs & MOTOR BÚSQUEDA
// ==========================================
function initVstsPage() {
    console.log("MODULE: Launching VST Archive core engine with real-time search support...");

    // 1. BASE DE DATOS DE TUS PLUGINS (ORDEN COMPLETO, CORRELATIVO Y ADICIÓN UNIFICADA)
    const vstsData = [
        {
            id: 1,
            title: "KILOHEARTS ULTIMATE BUNDLE",
            description: "Complete collection of premium modular effects and host plugins.",
            system: "WIN / MAC",
            downloadUrl: "https://kilohearts.com/products/kilohearts_ultimate",
            image: "images/vst-kilohearts.png",
            coverText: "BUNDLE"
        },
        {
            id: 2,
            title: "XFER RECORDS OTT",
            description: "Legendary aggressive multiband upward/downward compressor plugin.",
            system: "WIN / MAC",
            downloadUrl: "https://splice.com/plugins/3788-ott-vst-au-by-xfer-records",
            image: "images/vst-ott.png",
            coverText: "DYNAMICS"
        },
        {
            id: 3,
            title: "KOMCOMPLETE START",
            description: "Ultimate free production suite loaded with synths, instruments, and effects.",
            system: "WIN / MAC",
            downloadUrl: "https://www.native-instruments.com/es/products/komplete/bundles/komplete-start/",
            image: "images/vst-komplete.png",
            coverText: "BUNDLE"
        },
        {
            id: 4,
            title: "VALHALLA SUPERMASSIVE",
            description: "Advanced free plugin for cosmic reverbs and massive delays.",
            system: "WIN / MAC",
            downloadUrl: "https://valhalladsp.com/shop/reverb/valhalla-supermassive/",
            image: "images/vst-supermassive.png",
            coverText: "REVERB"
        },
        {
            id: 5,
            title: "VITAL AUDIO",
            description: "Spectral warping wavetable synthesizer for advanced modern sound design.",
            system: "WIN / MAC",
            downloadUrl: "https://vital.audio/",
            image: "images/vst-vital.png",
            coverText: "SYNTH"
        },
        {
            id: 6,
            title: "SURGE XT",
            description: "Incredibly powerful open-source hybrid synthesizer engine.",
            system: "WIN / MAC / LINUX",
            downloadUrl: "https://surge-synthesizer.github.io/",
            image: "images/vst-surge.png",
            coverText: "SYNTH"
        },
        {
            id: 7,
            title: "ZL AUDIO EQUALIZER",
            description: "Extremely clean and precise 16-band parametric equalizer plugin.",
            system: "WIN / MAC / LINUX",
            downloadUrl: "https://zl-audio.github.io/plugins/zlequalizer/",
            image: "images/vst-zlequalizer.png",
            coverText: "EQ"
        },
        {
            id: 8,
            title: "VLADG LIMITER N6",
            description: "Architectural mastering limiter with precise dynamics and brickwall protection.",
            system: "WIN / MAC",
            downloadUrl: "https://www.tokyodawn.net/vladg-limiter-n6/",
            image: "images/vst-limitern6.png",
            coverText: "LIMITER"
        },
        {
            id: 9,
            title: "VARIETY OF SOUND FERRIC TDS MKII",
            description: "Classic tape dynamics simulator designed to add warm analog saturation.",
            system: "WIN",
            downloadUrl: "https://varietyofsound.wordpress.com/2021/09/06/ferrictds-mkii-released/",
            image: "images/vst-ferrictds.png",
            coverText: "SATURATION"
        },
        {
            id: 10,
            title: "TOKYO DAWN RECORDS TDR NOVA",
            description: "Parallel dynamic equalizer combining precise parametric control with compression.",
            system: "WIN / MAC",
            downloadUrl: "https://www.tokyodawn.net/tdr-nova/",
            image: "images/vst-tdrnova.png",
            coverText: "DYNEQ"
        },
        {
            id: 11,
            title: "DECENT SAMPLES DECENT SAMPLER",
            description: "Lightweight and flexible sample playback engine for custom underground libraries.",
            system: "WIN / MAC / LINUX",
            downloadUrl: "https://www.decentsamples.com/product/decent-sampler-plugin/",
            image: "images/vst-decentsampler.png",
            coverText: "SAMPLER"
        },
        {
            id: 12,
            title: "FREAKSHOW INDUSTRIES BUNDLE",
            description: "Collection of chaotic, anarchic audio effects for extreme glitch and anti-traditional sound design.",
            system: "WIN / MAC",
            downloadUrl: "https://freakshowindustries.com/",
            image: "images/vst-freakshow.png",
            coverText: "GLITCH"
        }
    ];

    const vstsGrid = document.getElementById('vsts-grid');
    const searchInput = document.getElementById('vst-search');
    if (!vstsGrid) return;

    // 2. FUNCIÓN DE RENDERIZADO FILTRADA
    function renderVsts(searchTerm = "") {
        vstsGrid.innerHTML = "";

        const filteredVsts = vstsData.filter(vst => 
            vst.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredVsts.length === 0) {
            vstsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #444444; padding: 40px; font-family: 'Orbitron', sans-serif; letter-spacing: 2px;">NO PLUGINS FOUND</p>`;
            return;
        }

        filteredVsts.forEach(vst => {
            const vstCard = document.createElement('div');
            vstCard.classList.add('kit-card');

            vstCard.innerHTML = `
                <div class="kit-cover free-kit" style="padding: 0; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                    <img src="${vst.image}" alt="${vst.title}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="kit-info">
                    <h3>${vst.title}</h3>
                    <p>${vst.description}</p>
                    <div class="kit-footer">
                        <span class="kit-price" style="font-size: 0.75rem; color: #666; font-family: 'Orbitron', sans-serif;">${vst.system}</span>
                        <a href="${vst.downloadUrl}" target="_blank" class="kit-btn free-btn" style="text-align: center;">GET VST</a>
                    </div>
                </div>
            `;
            vstsGrid.appendChild(vstCard);
        });
    }

    // 3. LISTENERS PARA EL INPUT DE BÚSQUEDA
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderVsts(e.target.value);
        });

        searchInput.addEventListener('focus', () => searchInput.style.borderColor = '#ffffff');
        searchInput.addEventListener('blur', () => searchInput.style.borderColor = '#222222');
    }

    // Renderizado inicial al cargar la página
    renderVsts();
}