particlesJS('smoke-layer', {
  particles: {
    number: {
      value: 20,
      density: { enable: true, value_area: 800 }
    },
    color: { value: "#999999" },
    shape: { type: "circle" },
    opacity: {
      value: 0.2,
      random: true,
      anim: {
        enable: true,
        speed: 0.2,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 60,
      random: true,
      anim: {
        enable: false
      }
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "top",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: { detect_on: "canvas", events: { onhover: { enable: false }, onclick: { enable: false } } },
  retina_detect: true
});
