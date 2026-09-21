// ==========================================
// CONTROL DE ESCENAS
// ==========================================

let currentScene = 1;
const totalScenes = 7;

function goToScene(sceneNumber) {

    // Ocultar todas las escenas
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });

    // Mostrar la escena solicitada
    const nextScene = document.getElementById(`scene-${sceneNumber}`);

    if (nextScene) {

        nextScene.classList.add('active');

        currentScene = sceneNumber;

        // Ejecutar lógicas específicas de cada escena
        if (currentScene === 2) initScene2();
        if (currentScene === 3) initScene3();
        if (currentScene === 4) initScene4();
        if (currentScene === 5) initScene5();
        if (currentScene === 6) initScene6();
        if (currentScene === 7) initScene7();

    }
}


// ==========================================
// MÚSICA DE FONDO
// ==========================================

const backgroundMusic = document.getElementById('background-music');


// Intentar comenzar automáticamente
function startMusic() {

    if (!backgroundMusic) return;

    backgroundMusic.volume = 1;

    const playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {
                console.log('Música iniciada.');
            })
            .catch(() => {
                console.log('El navegador bloqueó el autoplay. Se intentará nuevamente con la primera interacción.');
            });

    }
}


// Intentar reproducir al cargar la página
window.addEventListener('load', () => {
    startMusic();
});


// Si el navegador bloquea el autoplay,
// comenzar con la primera interacción del usuario.
// No aparece ningún botón de música.

function startMusicOnInteraction() {

    if (!backgroundMusic) return;

    backgroundMusic.volume = 1;

    backgroundMusic.play()
        .then(() => {
            console.log('Música iniciada después de la interacción.');
        })
        .catch(() => {
            console.log('No se pudo reproducir la música.');
        });

    document.removeEventListener('click', startMusicOnInteraction);
    document.removeEventListener('touchstart', startMusicOnInteraction);
    document.removeEventListener('keydown', startMusicOnInteraction);
}

document.addEventListener('click', startMusicOnInteraction);
document.addEventListener('touchstart', startMusicOnInteraction);
document.addEventListener('keydown', startMusicOnInteraction);


// ==========================================
// ESCENA 1: BOTONES SÍ / NO
// ==========================================

const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const noMessage = document.getElementById('no-message');

let noAttempts = 0;


// Hacer que el botón NO huya
function evadeCursor() {

    noAttempts++;

    // Cambiar a posición fija
    if (!btnNo.classList.contains('running')) {
        btnNo.classList.add('running');
    }

    // Calcular nueva posición dentro de la pantalla
    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;

    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);

    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;

    // Mostrar mensaje después de algunos intentos
    if (noAttempts === 3) {
        noMessage.classList.add('show');
    }
}


btnNo.addEventListener('mouseover', evadeCursor);

btnNo.addEventListener('touchstart', (e) => {

    e.preventDefault();

    evadeCursor();

});


// Botón SÍ
btnYes.addEventListener('click', () => {

    // Asegurar que la música esté reproduciéndose
    startMusic();

    goToScene(2);

});


// ==========================================
// ESCENA 2: FELIZ CUMPLEAÑOS
// ==========================================

function initScene2() {

    const btnContinue = document.getElementById('btn-continue-s2');

    setTimeout(() => {

        btnContinue.classList.add('show');

    }, 4000);


    btnContinue.addEventListener('click', () => {

        goToScene(3);

    });

}


// ==========================================
// ESCENA 3: CRECIMIENTO DE FLORES
// ==========================================

function initScene3() {

    const seed = document.getElementById('seed');
    const stem = document.querySelector('.stem');
    const canopy = document.querySelector('.heart-canopy');

    const texts = document.querySelectorAll('.flower-texts p');

    const container = document.querySelector('.flower-scene-container');

    const textsContainer = document.getElementById('flower-texts');

    const btnContinue = document.getElementById('btn-continue-s3');


    // 1. Cae la semilla
    seed.classList.add('falling');


    setTimeout(() => {

        // 2. Crece el tallo
        stem.classList.add('grow');


        setTimeout(() => {

            // 3. Aparece la copa
            canopy.classList.add('bloom');


            // 4. Generar girasoles
            createSunflowers(canopy);


            setTimeout(() => {

                // 5. Desplazar planta y mostrar textos
                container.classList.add('shift-right');

                textsContainer.classList.add('show');


                // Mostrar textos progresivamente
                texts.forEach((p, index) => {

                    setTimeout(() => {

                        p.classList.add('reveal');


                        // Mostrar botón al final
                        if (index === texts.length - 1) {

                            setTimeout(() => {

                                btnContinue.classList.add('show');

                            }, 2000);

                        }

                    }, index * 2000);

                });

            }, 3000);

        }, 3000);

    }, 3000);


    btnContinue.addEventListener('click', () => {

        goToScene(4);

    });

}


// ==========================================
// GENERAR GIRASOLES
// ==========================================

function createSunflowers(container) {

    // Limpiar flores anteriores
    container.innerHTML = '';


    const numOutline = window.innerWidth > 768 ? 90 : 60;

    const numFill = window.innerWidth > 768 ? 250 : 150;


    function spawnFlower(index, total, isOutline) {

        const flower = document.createElement('div');

        flower.classList.add('sunflower');


        const t = isOutline
            ? (index / total) * Math.PI * 2
            : Math.random() * Math.PI * 2;


        const r = isOutline
            ? 1
            : Math.sqrt(Math.random());


        let x =
            16 *
            Math.pow(Math.sin(t), 3) *
            r;


        let y =
            -(
                13 * Math.cos(t)
                - 5 * Math.cos(2 * t)
                - 2 * Math.cos(3 * t)
                - Math.cos(4 * t)
            ) *
            r;


        const scaleFactor =
            window.innerWidth > 768
                ? 2.2
                : 1.5;


        const noiseX =
            isOutline
                ? 0
                : (Math.random() - 0.5) * 3;


        const noiseY =
            isOutline
                ? 0
                : (Math.random() - 0.5) * 3;


        const posX =
            50 +
            (x * scaleFactor) +
            noiseX;


        const posY =
            50 +
            (y * scaleFactor) +
            noiseY;


        const rot =
            Math.random() * 360;


        const scale =
            0.4 +
            Math.random() * 0.7;


        flower.style.left = `${posX}%`;

        flower.style.top = `${posY}%`;

        flower.style.setProperty('--rot', rot);

        flower.style.transform = 'scale(0)';


        container.appendChild(flower);


        requestAnimationFrame(() => {

            flower.classList.add('open');

            flower.style.transform =
                `scale(${scale}) rotate(${rot}deg)`;

        });

    }


    // Crear borde
    for (let i = 0; i < numOutline; i++) {

        setTimeout(() => {

            spawnFlower(
                i,
                numOutline,
                true
            );

        }, (1000 / numOutline) * i);

    }


    // Rellenar corazón
    const fillDuration = 10000;


    for (let i = 0; i < numFill; i++) {

        setTimeout(() => {

            spawnFlower(
                i,
                numFill,
                false
            );

        }, 1000 + (fillDuration / numFill) * i);

    }

}


// ==========================================
// ESCENA 4: 10 RAZONES
// ==========================================

function initScene4() {

    const reasons =
        document.querySelectorAll('.reason');

    const btnContinue =
        document.getElementById('btn-continue-s4');


    let currentIndex = 0;


    function showNextReason() {

        if (currentIndex > 0) {

            reasons[currentIndex - 1]
                .classList.remove('active');

            reasons[currentIndex - 1]
                .classList.add('exit');

        }


        if (currentIndex < reasons.length) {

            reasons[currentIndex]
                .classList.remove('exit');

            reasons[currentIndex]
                .classList.add('active');

            currentIndex++;


            setTimeout(
                showNextReason,
                2000
            );

        }

        else {

            btnContinue.classList.remove('hidden');

            setTimeout(() => {

                btnContinue.classList.add('show');

            }, 100);

        }

    }


    setTimeout(
        showNextReason,
        1000
    );


    btnContinue.addEventListener('click', () => {

        goToScene(5);

    });

}


// ==========================================
// ESCENA 5: GALERÍA
// ==========================================

function initScene5() {

    const cards =
        document.querySelectorAll('.photo-card');


    // Distribuir las 4 fotografías
    cards.forEach((card, index) => {

        const rot =
            -15 +
            Math.random() * 30;


        // Ahora se distribuyen 4 fotos
        const offsetX =
            (index - 1.5) *
            (
                window.innerWidth > 768
                    ? 200
                    : 80
            );


        const offsetY =
            -20 +
            Math.random() * 40;


        card.style.transform =
            `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${rot}deg)`;


        card.dataset.baserot = rot;

        card.dataset.basex = offsetX;

        card.dataset.basey = offsetY;


        // Efecto flotante
        floatElement(card);

    });


    // Mostrar botón de carta
    const btnCarta =
        document.getElementById('btn-carta');


    setTimeout(() => {

        btnCarta.classList.add('show');

        btnCarta.classList.remove('hidden');

    }, 6000);


    btnCarta.addEventListener('click', () => {

        goToScene(6);

    });

}


// ==========================================
// EFECTO FLOTANTE DE FOTOS
// ==========================================

function floatElement(element) {

    let t =
        Math.random() * 100;


    function update() {

        t += 0.02;


        if (!element.matches(':hover')) {

            const basex =
                parseFloat(element.dataset.basex);

            const basey =
                parseFloat(element.dataset.basey);

            const baserot =
                parseFloat(element.dataset.baserot);


            const moveY =
                Math.sin(t) * 15;


            const moveX =
                Math.cos(t * 0.8) * 10;


            element.style.transform =
                `translate(calc(-50% + ${basex + moveX}px), calc(-50% + ${basey + moveY}px)) rotate(${baserot}deg)`;

        }


        requestAnimationFrame(update);

    }


    update();

}


// ==========================================
// ESCENA 6: CARTA
// ==========================================

function initScene6() {

    const btnContinue =
        document.getElementById('btn-continue-s6');


    setTimeout(() => {

        btnContinue.classList.add('show');

    }, 5000);


    btnContinue.addEventListener('click', () => {

        goToScene(7);

    });

}


// ==========================================
// ESCENA 7: FINAL
// ==========================================

function initScene7() {

    particleSpeed = 2;

}


// ==========================================
// PARTÍCULAS DEL FONDO
// ==========================================

const canvas =
    document.getElementById('particles-canvas');

const ctx =
    canvas.getContext('2d');


let particlesArray = [];

let particleSpeed = 0.5;


canvas.width =
    window.innerWidth;

canvas.height =
    window.innerHeight;


window.addEventListener('resize', () => {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

});


class Particle {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;

        this.size =
            Math.random() * 3 + 1;

        this.speedX =
            Math.random() * 1 - 0.5;

        this.speedY =
            Math.random() * 1 + particleSpeed;

        this.opacity =
            Math.random() * 0.5 + 0.1;

    }


    update() {

        this.y += this.speedY;

        this.x += this.speedX;


        if (this.y > canvas.height) {

            this.y =
                0 - this.size;

            this.x =
                Math.random() * canvas.width;

        }

    }


    draw() {

        ctx.fillStyle =
            `rgba(212, 175, 55, ${this.opacity})`;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}


// ==========================================
// INICIAR PARTÍCULAS
// ==========================================

function initParticles() {

    const numParticles =
        window.innerWidth > 768
            ? 50
            : 25;


    for (
        let i = 0;
        i < numParticles;
        i++
    ) {

        particlesArray.push(
            new Particle()
        );

    }

}


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    for (
        let i = 0;
        i < particlesArray.length;
        i++
    ) {

        particlesArray[i].update();

        particlesArray[i].draw();

    }


    requestAnimationFrame(
        animateParticles
    );

}


initParticles();

animateParticles();