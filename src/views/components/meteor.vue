<template>
    <div class="container">
        <canvas id="myCanvas"></canvas>
    </div>
</template>
<script setup>
    import { onMounted } from 'vue';

    let canvas,ctx;
    let meteors = []
    let allstar = 40

    onMounted(()=>{
        canvas = document.getElementById('myCanvas')
        ctx = canvas?.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - 50
        init()
        setInterval(draw, 10)
    })

    function init() {
        for (let i= 0; i< allstar; i++) {
            newmeteor()
        }
    }
    function newmeteor(){
        meteors.push({
            lines: [{
                x: parseInt(Math.random()*canvas.width),
                y: parseInt(Math.random()*canvas.height * 0.7),
            }],
            life: parseInt(Math.random() * 100) + 100,
            age: 0
        })
    }
    function draw(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        for(let i = 0; i < meteors.length; i++){
            let meteor = meteors[i]
            let lines = meteor.lines
            for(let j = 0;j < lines.length; j++) {
                ctx.fillStyle = `rgba(255,255,255,${j / lines.length})`
                ctx.fillRect(lines[j].x,lines[j].y,1,1)
            }
            ctx.fillstyle = 'yellow'
            let s_head = lines[lines.length-1]
            ctx.fillRect(s_head.x, s_head.y,2,2)
            if(meteor.age <= meteor.life / 2){
                lines.push({x: s_head.x - 1,y: s_head.y + 0.3})
            }else{
                lines.shift()
            }
            meteor.age++
            if(meteor.age >= meteor.life){
                meteors.splice(i,1)
                newmeteor()
            }
        }
    }
</script>
<style scoped>
    .container {
        background: url('../../assets/night.png') no-repeat;
        background-size: cover;
    }
</style>