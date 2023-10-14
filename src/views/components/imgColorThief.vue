<template>
    <div class="container flexRowCenterAll">
        <div class="all">
            <img v-for="(item) in arr"
            :src="item" alt=""
            crossorigin="anonymous"
            @mouseenter="handleEnter($event.target)"
            @mouseleave="handleLeave">
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { setFontSize } from '@/main';
    const ColorThief = require('colorthief');
    const colorthief = new ColorThief();
    let arr:any = []
    for (let index = 0; index < 4; index++) {
        let timeId = new Date().getTime() + index
        let size = parseInt(setFontSize().toFixed(2)) * 20
        arr.push(`http://picsum.photos/${size}/${size}?t=${timeId}`)
    }
    const html = document.documentElement
    html.style.setProperty('--c1', '#fff')
    html.style.setProperty('--c2', '#fff')
    html.style.setProperty('--c3', '#fff')
    const handleEnter = async(img:any) => {
        let colors = await colorthief.getPalette(img,3)
        colors = colors.map((item:any) => `rgb(${item[0]},${item[1]},${item[2]})`)
        html.style.setProperty('--c1', colors[0])
        html.style.setProperty('--c2', colors[1])
        html.style.setProperty('--c3', colors[2])
    }
    const handleLeave = () => {
        html.style.setProperty('--c1', '#fff')
        html.style.setProperty('--c2', '#fff')
        html.style.setProperty('--c3', '#fff')
    }
</script>

<style lang="scss" scoped>
    .container{
        flex-wrap: wrap;
        transition: all .5s;
        background: linear-gradient(to bottom,var(--c1),var(--c2),var(--c3));
        .all{
            width: 50%;
            img{
                margin: 1rem;
                transition: all .5s;
                border-radius: 1rem;
                width: calc(50% - 2rem);
            &:hover{
                transform: scale(1.1);
            }
        }
        }
    }
</style>