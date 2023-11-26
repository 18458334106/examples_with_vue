<template>
  <div class="container">
    <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="options"
      />
  </div>
</template>
<script lang="ts" setup>
  import type { Engine } from "tsparticles-engine";
  import { loadFull } from "tsparticles";

  const options:any = {
      background: {
          color: {
              value: '#999'
          }
      },
      fpsLimit: 120,
      interactivity: {
          events: {
              onClick: {
                  enable: true,
                  mode: 'push'
              },
              onHover: {
                  enable: true,
                  mode: 'repulse'
              },
              resize: true
          },
          modes: {
              bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40
              },
              push: {
                  quantity: 4
              },
              repulse: {
                  distance: 200,
                  duration: 0.4
              }
          }
      },
      particles: {
          color: {
              value: '#ffffff'
          },
          links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1
          },
          collisions: {
              enable: true
          },
          move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 6,
              straight: false
          },
          number: {
              density: {
                  enable: true,
                  area: 800
              },
              value: 80
          },
          opacity: {
              value: 0.5
          },
          shape: {
              type: 'circle'
          },
          size: {
              random: true,
              value: 5
          }
      },
      detectRetina: true
  }

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };
 
  const particlesLoaded = async (container: any) => {
    console.log("Particles container loaded", container);
  };
</script>