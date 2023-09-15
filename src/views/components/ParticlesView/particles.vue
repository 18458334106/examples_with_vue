<script setup lang="ts">
  import { options } from "./options.ts";
  import { loadFull } from "tsparticles"
  // @ts-ignore
  const particlesInit = async (engine:object) => {
    // @ts-ignore
    await loadFull(engine)
  }
  // @ts-ignore
  const particlesLoaded = async (container) => {
    // @ts-ignore
    console.log('Particles container loaded', container)
  }
</script>

<template>
  <div class="all">
    <Particles id="tsparticles" class="login-particles" :particlesInit="particlesInit"
               :particlesLoaded="particlesLoaded" :options="options" />
  </div>
</template>

<style scoped lang="scss">
  .all{
    width: 100%;
    height: 100%;
  }
</style>