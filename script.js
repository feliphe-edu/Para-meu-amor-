/* =========================================
   DATA DO NAMORO
========================================= */

const inicio = new Date("2026-02-21T00:00:00");


/* =========================================
   CONTADOR
========================================= */

function atualizarContador() {

    const agora = new Date();

    let anos =
        agora.getFullYear() -
        inicio.getFullYear();

    let meses =
        agora.getMonth() -
        inicio.getMonth();

    let dias =
        agora.getDate() -
        inicio.getDate();

    let horas =
        agora.getHours() -
        inicio.getHours();

    let minutos =
        agora.getMinutes() -
        inicio.getMinutes();

    let segundos =
        agora.getSeconds() -
        inicio.getSeconds();


    if (segundos < 0) {

        segundos += 60;

        minutos--;

    }


    if (minutos < 0) {

        minutos += 60;

        horas--;

    }


    if (horas < 0) {

        horas += 24;

        dias--;

    }


    if (dias < 0) {

        const ultimoDiaMesAnterior =
            new Date(
                agora.getFullYear(),
                agora.getMonth(),
                0
            ).getDate();

        dias += ultimoDiaMesAnterior;

        meses--;

    }


    if (meses < 0) {

        meses += 12;

        anos--;

    }


    const mesesTotais =
        anos * 12 + meses;


    document.getElementById("meses")
        .textContent = mesesTotais;

    document.getElementById("dias")
        .textContent = dias;

    document.getElementById("horas")
        .textContent = horas;

    document.getElementById("minutos")
        .textContent = minutos;

    document.getElementById("segundos")
        .textContent = segundos;

}


atualizarContador();

setInterval(
    atualizarContador,
    1000
);


/* =========================================
   ENTRAR NO SITE
========================================= */

const enterButton =
    document.getElementById(
        "enterButton"
    );


const app =
    document.getElementById("app");


enterButton.addEventListener(
    "click",
    () => {

        app.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   NAVEGAÇÃO
========================================= */

const navigationButtons =
    document.querySelectorAll(
        ".bottom-nav button"
    );


navigationButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    document.getElementById(
                        button.dataset.target
                    );


                if (!target) {
                    return;
                }


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    }
);


/* =========================================
   DESTACAR ITEM DO MENU
========================================= */

const sections =
    document.querySelectorAll(
        ".screen-section"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    navigationButtons
                        .forEach(
                            (button) => {

                                button.classList.remove(
                                    "active"
                                );

                            }
                        );


                    const active =
                        document.querySelector(
                            `[data-target="${entry.target.id}"]`
                        );


                    if (active) {

                        active.classList.add(
                            "active"
                        );

                    }

                }
            );

        },
        {
            rootMargin: "-30% 0px -55% 0px"
        }
    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================
   MÚSICA
========================================= */

const musicButton =
    document.getElementById(
        "musicButton"
    );


const music =
    document.getElementById(
        "backgroundMusic"
    );


const musicIcon =
    musicButton.querySelector(
        ".music-icon"
    );


musicButton.addEventListener(
    "click",
    async () => {

        try {

            if (music.paused) {

                await music.play();

                musicIcon.textContent = "❚❚";

                musicButton.classList.add(
                    "playing"
                );

            } else {

                music.pause();

                musicIcon.textContent = "▶";

                musicButton.classList.remove(
                    "playing"
                );

            }

        } catch (error) {

            console.error(
                "Não foi possível reproduzir a música:",
                error
            );

        }

    }
);


/* =========================================
   QUANDO A MÚSICA TERMINAR
========================================= */

music.addEventListener(
    "pause",
    () => {

        musicIcon.textContent = "▶";

        musicButton.classList.remove(
            "playing"
        );

    }
);


/* =========================================
   CORAÇÕES FLUTUANTES
========================================= */

const heartsContainer =
    document.querySelector(
        ".floating-hearts"
    );


function criarCoracao() {

    const heart =
        document.createElement(
            "div"
        );


    heart.className = "heart";


    heart.textContent =
        Math.random() > 0.5
            ? "♥"
            : "♡";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        Math.random() * 16 + 10 + "px";


    const cores = [
        "#ff91aa",
        "#ffd0da",
        "#ff7895"
    ];


    heart.style.color =
        cores[
            Math.floor(
                Math.random() * cores.length
            )
        ];


    const duration =
        Math.random() * 5 + 6;


    heart.style.animationDuration =
        duration + "s";


    heartsContainer.appendChild(
        heart
    );


    setTimeout(
        () => {

            heart.remove();

        },
        duration * 1000
    );

}


setInterval(
    criarCoracao,
    850
);


/* =========================================
   GALERIA / LIGHTBOX
========================================= */

const photoButtons =
    document.querySelectorAll(
        ".photo-card"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


photoButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const image =
                    button.querySelector(
                        "img"
                    );


                if (!image) {
                    return;
                }


                lightboxImage.src =
                    image.src;


                lightboxImage.alt =
                    image.alt;


                lightbox.classList.add(
                    "active"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


/* =========================================
   FECHAR LIGHTBOX
========================================= */

function fecharLightbox() {

    lightbox.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


closeLightbox.addEventListener(
    "click",
    fecharLightbox
);


lightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target === lightbox
        ) {

            fecharLightbox();

        }

    }
);


/* =========================================
   FECHAR LIGHTBOX COM ESC
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            fecharLightbox();

        }

    }
);


/* =========================================
   VOLTAR AO INÍCIO
========================================= */

const restartButton =
    document.getElementById(
        "restartButton"
    );


restartButton.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);