gsap.registerPlugin(ScrollTrigger, SplitText);

/* =========================================================
   ELEMENTS
========================================================= */

const text = document.getElementById("fall-text");
const leavesContainer = document.querySelector(".leaves");
const particlesContainer = document.querySelector(".particles");

if (!text) {
    throw new Error("Missing #fall-text element");
}

/* =========================================================
   SPLIT TEXT
========================================================= */

const splitText = SplitText.create(text, {
    type: "chars",
    charsClass: "char",
});

const chars = splitText.chars;

gsap.set(chars, {
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
    scale: 1,
});

/* =========================================================
   NAV — SCROLL GLASS
========================================================= */

const nav = document.querySelector(".nav");

if (nav) {
    ScrollTrigger.create({
        start: "top -80",

        onEnter: () => {
            nav.classList.add("scrolled");
        },

        onLeaveBack: () => {
            nav.classList.remove("scrolled");
        },
    });
}

/* =========================================================
   HERO INTRO
========================================================= */

const heroIntro = gsap.timeline({
    defaults: {
        ease: "power3.out",
    },
});

heroIntro
    .from(".nav", {
        y: -30,
        opacity: 0,
        duration: 1.2,
    })
    .from(
        ".hero-top",
        {
            opacity: 0,
            y: 20,
            duration: 1,
        },
        "-=0.7",
    )
    .from(
        ".eyebrow",
        {
            opacity: 0,
            y: 20,
            duration: 1,
        },
        "-=0.7",
    )
    .from(
        chars,
        {
            opacity: 0,
            y: 100,
            stagger: 0.09,
            duration: 1.2,
            ease: "power4.out",
        },
        "-=0.6",
    )
    .from(
        ".title-bottom",
        {
            opacity: 0,
            y: 30,
            duration: 1,
        },
        "-=0.7",
    )
    .from(
        ".hero-bottom",
        {
            opacity: 0,
            duration: 1,
        },
        "-=0.7",
    );

/* =========================================================
   FALLING LETTERS
========================================================= */

function fallLetters() {
    gsap.killTweensOf(chars);

    chars.forEach((char, index) => {
        gsap.to(char, {
            x: gsap.utils.random(-180, 180),
            y: gsap.utils.random(500, 850),
            rotation: gsap.utils.random(-180, 180),

            opacity: 0,

            duration: gsap.utils.random(1.8, 2.5),

            delay: index * 0.045,

            ease: "power2.in",

            overwrite: true,
        });
    });
}

function restoreLetters() {
    gsap.killTweensOf(chars);

    gsap.fromTo(
        chars,
        {
            x: 0,
            y: 100,
            rotation: gsap.utils.random(-5, 5),
            opacity: 0,
            scale: 0.9,
        },
        {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 1.2,
            ease: "power3.out",
        },
    );
}

ScrollTrigger.create({
    trigger: ".hero",

    start: "top top",
    end: "bottom top",

    onEnter: () => {
        fallLetters();
    },

    onEnterBack: () => {
        restoreLetters();

        requestAnimationFrame(() => {
            fallLetters();
        });
    },

    onLeaveBack: () => {
        restoreLetters();
    },
});

/* =========================================================
   HERO PARALLAX
========================================================= */

gsap.to(".hero-title-wrap", {
    y: -180,
    opacity: 0.2,

    ease: "none",

    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
    },
});

gsap.to(".hero-glow", {
    scale: 1.5,
    opacity: 0,

    ease: "none",

    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
    },
});

gsap.to(".hero-top", {
    y: -100,
    opacity: 0,

    ease: "none",

    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
    },
});

/* =========================================================
   CREATE PARTICLES
========================================================= */

const particleCount = 45;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    particlesContainer.appendChild(particle);

    gsap.to(particle, {
        y: `random(-100, 100)`,
        x: `random(-50, 50)`,

        opacity: `random(0.1, 0.8)`,

        duration: `random(3, 7)`,

        repeat: -1,
        yoyo: true,

        delay: Math.random() * 4,

        ease: "sine.inOut",
    });
}

/* =========================================================
   CREATE LEAVES
========================================================= */

const leafColors = [
    "#8d351e",
    "#b45225",
    "#c76c2f",
    "#7c3d22",
    "#d38b42",
    "#6d3020",
];

const leafCount = 24;

for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement("span");

    leaf.className = "leaf";

    const size = gsap.utils.random(12, 34);

    leaf.style.setProperty("--size", `${size}px`);

    leaf.style.setProperty(
        "--leaf-color",
        leafColors[Math.floor(Math.random() * leafColors.length)],
    );

    leaf.style.setProperty("--opacity", gsap.utils.random(0.25, 0.8));

    leaf.style.setProperty("--rotation", `${gsap.utils.random(-180, 180)}deg`);

    leaf.style.setProperty("--blur", `${gsap.utils.random(0, 1.5)}px`);

    leavesContainer.appendChild(leaf);

    const startX = gsap.utils.random(-10, 110);
    const startY = gsap.utils.random(-20, 100);

    const drift = gsap.utils.random(-180, 180);

    gsap.set(leaf, {
        left: `${startX}%`,
        top: `${startY}%`,
    });

    gsap.to(leaf, {
        x: drift,
        y: window.innerHeight + 250,

        rotation: `+=${gsap.utils.random(180, 720)}`,

        duration: gsap.utils.random(9, 18),

        repeat: -1,

        delay: gsap.utils.random(-18, 0),

        ease: "none",

        modifiers: {
            x: (value) => {
                return `${parseFloat(value) + Math.sin(parseFloat(value) / 100) * 2}px`;
            },
        },
    });
}

/* =========================================================
   INTRO SECTION
========================================================= */

const introKicker = gsap.from(".intro-kicker", {
    opacity: 0,
    y: 30,
    duration: 1.8,
    paused: true,
});

const introTitle = gsap.from(".intro-content h2", {
    y: 120,
    opacity: 0,
    duration: 1.4,
    ease: "power4.out",
    paused: true,
});

const introDescription = gsap.from(".intro-description", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    paused: true,
});

ScrollTrigger.create({
    trigger: ".intro-section",
    start: "top 65%",

    onEnter: () => {
        introKicker.restart();
        introTitle.restart({ delay: 2 });
        introDescription.restart();
    },

    onEnterBack: () => {
        introKicker.restart();
        introTitle.restart();
        introDescription.restart();
    },
});

/* =========================================================
   INTRO LEAF
========================================================= */

gsap.fromTo(
    ".intro-leaf",
    {
        rotation: 0,
        y: 0,
    },
    {
        rotation: 160,
        y: -120,

        ease: "none",

        scrollTrigger: {
            trigger: ".intro-section",

            start: "top bottom",
            end: "bottom top",

            scrub: 1,
        },
    },
);

/* =========================================================
   AUTUMN VIDEO
========================================================= */

const autumnVideo = document.querySelector(".autumn-video");

if (autumnVideo) {
    autumnVideo.play().catch(() => {});
}

/* =========================================================
   VIDEO SECTION
   REPLAY ON EVERY ENTER
========================================================= */

const videoContent = gsap.from(".visual-content", {
    y: 120,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    paused: true,
});

const videoSmall = gsap.from(".visual-small", {
    x: -40,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    paused: true,
});

const videoCoordinates = gsap.from(".visual-coordinates", {
    opacity: 0,
    duration: 1.2,
    paused: true,
});

ScrollTrigger.create({
    trigger: ".visual-section",
    start: "top 65%",

    onEnter: () => {
        videoContent.restart();
        videoSmall.restart();
        videoCoordinates.restart();
    },

    onEnterBack: () => {
        videoContent.restart();
        videoSmall.restart();
        videoCoordinates.restart();
    },
});

/* =========================================================
   END SECTION
   REPLAY ON EVERY ENTER
========================================================= */

const endTitle = gsap.from(".end-section h2", {
    y: 150,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    paused: true,
});

const endDescription = gsap.from(".end-section p", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    paused: true,
});

ScrollTrigger.create({
    trigger: ".end-section",
    start: "top 70%",

    onEnter: () => {
        endTitle.restart();
        endDescription.restart();
    },

    onEnterBack: () => {
        endTitle.restart();
        endDescription.restart();
    },
});

/* =========================================================
   RESIZE
========================================================= */

let resizeTimer;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
