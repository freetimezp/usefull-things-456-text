gsap.registerPlugin(ScrollTrigger, SplitText, Physics2DPlugin);

const text = document.getElementById("fall-text");
const splitText = SplitText.create(text, {
    type: "chars",
    charsClass: "char",
});

const fallAnimation = gsap.to(splitText.chars, {
    duration: 5,
    physics2D: {
        velocity: "random(150, 200)",
        angle: "random(30, 80)",
        gravity: 1000,
        friction: 0.005,
    },
    rotation: "random(-180, 180)",
    stagger: {
        each: 0.05,
        from: "random",
    },
    paused: true,
});

ScrollTrigger.create({
    trigger: "#fall-text",
    start: "top top",
    onEnter: () => {
        fallAnimation.timeScale(1).play();
    },
    onLeaveBack: () => {
        fallAnimation.timeScale(4).reverse();
    },
});
