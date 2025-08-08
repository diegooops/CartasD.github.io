// Base de datos de cartas
const cartas = {
    1: {
        titulo: "Primera Carta",
        fecha: "Diciembre 2024",
        mensajeInicial: "Me diste la oportunidad de quererte, me diste el privilegio de ser tu persona favorita y de formar parte de tu vida. Sé que aún somos jóvenes, pero tengo claro que quiero estar contigo por la eternidad. <br>Eres mi lugar seguro, mi refugio, ese rincón del mundo al que siempre voy a elegir volver.",
        mensajes: [
            "Me ilusiona pensar en un futuro contigo... en los días normales y en los especiales, en nuestras conversaciones eternas, en los silencios que nos brindan paz, en los “buenos días” y en los “ya llegué”.<br> Me emociona la idea de conocer cada una de tus versiones, de poder compartir mis días contigo, planeando aventuras inolvidables.",
            "En una vida junto a ti. Donde pueda cuidarte con todo mi amor, y elegirte cada día con la misma certeza del primero. Donde la decisión de amarte crezca con cada amanecer, de caminar contigo sin soltar tu mano, y de construir poco a poco ese “para siempre” que tanto anhelo vivir a tu lado.",
            "De: Mi<br>Para: Tú"
        ]
    },
    2: {
        titulo: "Segundo Mensaje",
        fecha: "Enero 2025",
        mensajeInicial: "Sé que el amor existe, porque existes tú. Y yo te amo de la manera más sincera y pura que puede nacer dentro de mí.<br>Tu amor me mostró que la felicidad no es un momento, sino una forma de vivir cada día, tu amor me saco versiones de mí mismo que solo contigo pueden existir, porque tu sacas lo mejort de mi",
        mensajes: [
            "Tambien sé que puedes sola, porque eres fuerte, valiente, esforzada, perseverante, sabia, bondadosa y muchisimo más. Pero también quiero que sepas que no estás sola, porque aquí estoy yo, para acompañarte siempre que lo necesites:)",
            "Porque todo lo bonito empieza con D... Diamantes, Donas, Duraznos, Dias soleados, Dios y Deborah <br>En fin D todos tenemos un motivo por el cual sonreír... y el mío, eres tú, Mi chica preciosa, mi alegría diaria, mi bendición constante.<br> Porque amar así, sin condiciones ni miedos, es lo más bonito que me ha pasado",
            "Con amor infinito,<br>Te amooo❤️"
        ]
    },
    3: {
        titulo: "Pensamientos",
        fecha: "Febrero 2025",
        mensajeInicial: "Antes pensaba que las mejores historias de amor son las que tienen finales perfectos o momentos perfectos, pero no siempre es así, los momentos más valiosos son aquellos que nos enseñan, que nos hacen crecer y que aun con sus imperfecciones, se vuelven inolvidables, porque el verdadero amor no se mide por la perfeccion",
        mensajes: [
            "Tambien me he dado cuenta de que hay personas que llegan y transforman tu mundo, y tú eres una de ellas. <br>No solo por cada detalle que sin saberlo, queda grabado dentrot de mi corazón, sino también porque me ayudas en mi caminar con Cristo, enseñandome o guiándome a conocer más de Dios y acercándome cada día más a Él.",
            "Por eso quiero que cada día sea una oportunidad para agradecer, reír, amar, como tambien construir y conseguir contigo bajo la promesa de que 'el amor nunca deja de ser'",
            "Hasta siempre,<br>Con cariño"
        ]
    }
};

// Variables globales
let cartaActual = null;
let mensajeIndex = 0;
let mensajesActuales = [];
let mensajeOriginal = '';

// Elementos del DOM
const modal = document.getElementById('letterModal');
const mainMessageElement = document.getElementById('mainMessage');
const btnOpen = document.getElementById('open');
const btnNext = document.getElementById('next');
const btnClose = document.getElementById('close');
const btnCloseModal = document.getElementById('closeModal');

// Elementos de audio
const audio = document.getElementById('backgroundMusic');
const playPauseBtn = document.getElementById('playPauseBtn');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeAudio();
    initializeLetterControls();
});

// Inicializar galería
function initializeGallery() {
    const cardPreviews = document.querySelectorAll('.card-preview');
    
    cardPreviews.forEach(card => {
        card.addEventListener('click', function() {
            const cardId = this.getAttribute('data-card-id');
            openLetter(cardId);
        });
    });
    
    // Evento para cerrar modal
    btnCloseModal.addEventListener('click', closeLetter);
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeLetter();
        }
    });
}

// Abrir carta
function openLetter(cardId) {
    cartaActual = cartas[cardId];
    if (!cartaActual) return;
    
    // Resetear variables
    mensajeIndex = 0;
    mensajesActuales = cartaActual.mensajes;
    mensajeOriginal = cartaActual.mensajeInicial;
    
    // Configurar mensaje inicial
    mainMessageElement.innerHTML = mensajeOriginal;
    
    // Resetear estado de los botones
    btnOpen.disabled = false;
    btnClose.disabled = true;
    btnNext.disabled = true;
    
    // Resetear estado visual de la carta
    resetLetterVisual();
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

// Cerrar carta
function closeLetter() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
    resetLetterVisual();
}

// Resetear estado visual de la carta
function resetLetterVisual() {
    const coverElement = document.querySelector('.cover');
    const paperElement = document.querySelector('.paper');
    const heartElement = document.querySelector('.heart');
    
    // Resetear clases
    coverElement.classList.remove('open-cover');
    paperElement.classList.remove('open-paper', 'close-paper');
    
    // Resetear estilos
    coverElement.style.zIndex = '0';
    heartElement.style.display = 'none';
    
    // Resetear mensaje
    if (cartaActual) {
        mainMessageElement.innerHTML = mensajeOriginal;
        mainMessageElement.style.display = "block";
        mainMessageElement.style.justifyContent = "flex-start";
        mainMessageElement.style.alignItems = "flex-start";
        mainMessageElement.style.height = "280px";
    }
    
    mensajeIndex = 0;
}

// Inicializar controles de la carta
function initializeLetterControls() {
    // Botón abrir
    btnOpen.addEventListener('click', function() {
        mainMessageElement.style.display = "flex";
        mainMessageElement.style.justifyContent = "flex-start";
        mainMessageElement.style.alignItems = "flex-start";
        mainMessageElement.style.height = "280px";

        btnOpen.disabled = true;
        btnClose.disabled = false;
        btnNext.disabled = false;
        
        const coverElement = document.querySelector('.cover');
        coverElement.classList.add('open-cover');

        setTimeout(() => {
            coverElement.style.zIndex = -1;
            
            const paperElement = document.querySelector('.paper');
            paperElement.classList.remove('close-paper');
            paperElement.classList.add('open-paper');

            // Animación del corazón
            const heartElement = document.querySelector('.heart');
            heartElement.style.display = 'block';
        }, 500);
    });

    // Botón cerrar
    btnClose.addEventListener('click', function() {
        btnOpen.disabled = false;
        btnClose.disabled = true;
        btnNext.disabled = true;

        const coverElement = document.querySelector('.cover');
        const paperElement = document.querySelector('.paper');
        paperElement.classList.remove('open-paper');
        paperElement.classList.add('close-paper');
        
        setTimeout(() => {
            coverElement.style.zIndex = 0;
            coverElement.classList.remove('open-cover');

            // Animación del corazón
            const heartElement = document.querySelector('.heart');
            heartElement.style.display = 'none';

            mainMessageElement.innerHTML = mensajeOriginal;
            mensajeIndex = 0;
        }, 500);
    });

    // Botón siguiente
    btnNext.addEventListener('click', function() {
        if (mensajeIndex < mensajesActuales.length) {
            mainMessageElement.innerHTML = mensajesActuales[mensajeIndex];

            if (mensajesActuales[mensajeIndex].includes("De: Mi<br>Para: Tú") || 
                mensajesActuales[mensajeIndex].includes("Con amor infinito") ||
                mensajesActuales[mensajeIndex].includes("Hasta siempre")) {
                mainMessageElement.style.display = "flex";
                mainMessageElement.style.justifyContent = "center";
                mainMessageElement.style.alignItems = "center";
            } else {
                mainMessageElement.style.display = "flex";
                mainMessageElement.style.justifyContent = "flex-start";
                mainMessageElement.style.alignItems = "flex-start";
                mainMessageElement.style.height = "280px";
            }
            
            mensajeIndex++;
            
            // Deshabilitar botón si es el último mensaje
            if (mensajeIndex >= mensajesActuales.length) {
                btnNext.disabled = true;
            }
        }
    });
}

// Inicializar audio
function initializeAudio() {
    const volumePercentage = 20;
    audio.volume = volumePercentage / 100;
    
    const startTime = 144;
    audio.currentTime = startTime;
    
    let isPlaying = false;
    
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = '🔊';
        } else {
            audio.play();
            playPauseBtn.textContent = '🔇';
        }
        isPlaying = !isPlaying;
    });
    
    audio.addEventListener('ended', function() {
        playPauseBtn.textContent = '🔊';
        isPlaying = false;
    });
}

// Función para agregar nuevas cartas (para uso futuro)
function agregarNuevaCarta(id, titulo, fecha, mensajeInicial, mensajes) {
    cartas[id] = {
        titulo: titulo,
        fecha: fecha,
        mensajeInicial: mensajeInicial,
        mensajes: mensajes
    };
    
    // Aquí podrías agregar código para actualizar la interfaz
    // Por ejemplo, crear dinámicamente una nueva card-preview
    console.log(`Nueva carta agregada: ${titulo}`);
}

// Función para obtener parámetros URL (compatibilidad con versión anterior)
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Cargar carta específica desde URL (compatibilidad)
const cardIdFromUrl = getUrlParameter('card');
if (cardIdFromUrl && cartas[cardIdFromUrl]) {
    // Esperar a que el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            openLetter(cardIdFromUrl);
        }, 500);
    });
}
