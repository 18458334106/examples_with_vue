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
  import { options } from './options';
  import type { Engine } from "tsparticles-engine";
  import { loadFull } from "tsparticles";

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };
 
  const particlesLoaded = async (container: any) => {
    console.log("Particles container loaded", container);
  };
</script>