particlesJS('particles-js', {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 900
      }
    },
    color: {
      value: ["#ff2d00", "#ff6600", "#ff9900"]
    },
    shape: {
      type: "circle",
      image: {
        src: "assets/spark.png",
        width: 10,
        height: 10
      }
    },
    shadow: {                // добавляем свечения
      enable: true,
      color: "rgba(255, 100, 0, 0.8)",
      blur: 15
    },
    line_linked: {
      enable: false
    },
    opacity: {
      value: 1.0,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 6,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.3,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 1.8,
      direction: "bottom",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  },
  retina_detect: true
});
