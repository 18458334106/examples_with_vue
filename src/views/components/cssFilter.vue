<template>
    <div class="container" v-bind:style="{'background':`url(${imgUrl})`}">
        <div class="modal"></div>
    </div>
</template>

<script lang="ts" setup>
    const { innerWidth,innerHeight } = window;
    let imgUrl = `http://picsum.photos/${innerWidth}/${innerHeight}`;
</script>

<style lang="scss" scoped>
    .container{
        background-repeat: no-repeat;
        .modal{
            width: 100%;
            height: 100%;
            backdrop-filter: grayscale(1);
            transition: all 2s;
            &:hover{
                width: 0;
            }
        }
    }
</style>