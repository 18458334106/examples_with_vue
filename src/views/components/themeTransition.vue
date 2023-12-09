<template>
    <div id="curContainer" class="container flexColumn">
        <el-button type="primary" @click="switchTheme">切换</el-button>
    </div>
</template>

<script setup>
    const switchTheme = (e) => {
        document.documentElement.style.setProperty('--x',e.clientX + 'px');
        document.documentElement.style.setProperty('--y',e.clientY + 'px');
        if(document.startViewTransition){
            document.startViewTransition(()=>{
                document.getElementById('curContainer').classList.toggle('dark');
            });
        }else{
            document.getElementById('curContainer').classList.toggle('dark');
        }
    }
</script>

<style>
    #curContainer{
        padding: 1rem;
        justify-content: flex-end;
    }
    .dark{
        background: black;
    }
    ::view-transition-old(*) {
        animation: none;
    }
    ::view-transition-new(*) {
        animation: effects 1s ease-in;
    }
    @keyframes effects {
        from{
            clip-path: circle(0% at var(--x) var(--y));
        }
        to{
            clip-path: circle(100% at var(--x) var(--y));
        }
    }
</style>