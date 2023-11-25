<template>
    <div class="container">
        <img class="snowBg" :src="imgUrl" alt="">
        <canvas id="myCanvas"></canvas>
    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';

    let imgUrl = ref(``)
    
    const AppMains = document.querySelectorAll('.AppMain')
    const AppMain = AppMains[AppMains.length - 1]
    const { offsetWidth,offsetHeight } = AppMain
    let canvas,ctx;
    let nums = 200
    let snows = []
    onMounted(()=>{
        imgUrl.value = `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime()}`
        canvas = document.getElementById('myCanvas')
        ctx = canvas?.getContext('2d')
        canvas.width = offsetWidth
        canvas.height = offsetHeight
        for (let i = 0; i < nums; i++) {
            snows.push({
                x: Math.random() * offsetWidth,
                y: Math.random() * offsetHeight,
                r: Math.random() * 4 + 1,
            })
        }
        setInterval(draw, 1)
    })

    const move = () => {
        snows.forEach((snow, index) => {
            snow.x += Math.random() * 2 + 1
            snow.y += Math.random() * 2 + 1
            if (snow.y > offsetHeight) {
                snow.y = 0
            }
            if (snow.x > offsetWidth) {
                snow.x = 0
            }
        })
    }

    const draw = () => {
        ctx.clearRect(0, 0, offsetWidth, offsetHeight)
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, offsetWidth, offsetHeight)
        snows.forEach((snow) => {
            ctx.clearRect(0,0,offsetWidth,offsetHeight)
            ctx.beginPath()
            ctx.fillStyle = '#fff'
            ctx.shadowColor = '#fff'
            ctx.shadowBlur = 10
            snows.forEach(snow=>{
                ctx.moveTo(snow.x,snow.y)
                ctx.arc(snow.x,snow.y,snow.r,0,Math.PI * 2,true)
            })
            ctx.fill()
            ctx.closePath()
        })
        move()
    }
</script>
<style lang="scss" scoped>
    .container{
        overflow: hidden;
        .snowBg,canvas{
            width: 100%;
            height: 100%;
        }
        canvas{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 20;
        }
    }
</style>