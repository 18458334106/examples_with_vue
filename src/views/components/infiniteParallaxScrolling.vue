<template>
    <div class="scroll-container">
    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    const AppMains = document.querySelectorAll('.AppMain')
    const AppMain = AppMains[AppMains.length - 1]
    const { offsetWidth,offsetHeight } = AppMain
    const imgArr = [
        `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime() + 1}`,
        `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime() + 2}`,
        `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime() + 3}`,
        `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime() + 4}`,
        `http://picsum.photos/${offsetWidth}/${offsetHeight}?t=${new Date().getTime() + 5}`
    ]

    let container = document.querySelector('.scroll-container');
    let curIndex = 0
    const getPrevIndex = () => {
        return curIndex === 0 ? imgArr.length - 1 : curIndex - 1
    }
    const getNextIndex = () => {
        return curIndex === imgArr.length - 1 ? 0 : curIndex + 1
    }
    const createElement = (i) => {
        const div = document.createElement('div')
        div.className = 'item'
        const img = document.createElement('img')
        img.src = imgArr[i]
        div.appendChild(img)
        container.appendChild(div)
        return div;
    }
    const resetElement = () => {
        container.innerHTML = ''
        let prevIndex = getPrevIndex();
        let nextIndex = getNextIndex();
        createElement(prevIndex).classList.add('pre');
        createElement(curIndex).classList.add('cur');
        createElement(nextIndex).classList.add('next');
    }
    let isAnimation = false
    onMounted(()=>{
        container = document.querySelector('.scroll-container');
        resetElement()
        window.addEventListener('wheel',(e)=>{
            if(!e.deltaY || isAnimation){
                return
            }
            isAnimation = true
            console.log(e.deltaY);
            if(e.deltaY > 0){
                curIndex = getNextIndex()
                container.classList.add('scroll-down')
            }else{
                curIndex = getPrevIndex()
                container.classList.add('scroll-up')
            }
        })

        container.addEventListener('transitionend',()=>{
            container.classList.remove('scroll-down')
            container.classList.remove('scroll-up')
            isAnimation = false
            resetElement()
        })
    })
</script>
<style lang="scss">
    .scroll-container {
        height: calc(100vh - 50px);
        position: relative;
        .item {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            transition: 1s ease-in-out;
            img {
                position: absolute;
                width: 100%;
                height: 100vh;
                object-fit: cover;
                transition: 1s ease-in-out;
            }
        }
        .item.pre,
        .item.next {
            z-index: 1;
            height: 0;
        }
        
        .item.pre {
            top: 0;
        }
        
        .item.next {
            bottom: 0
        }
        
        .item.pre img {
            transform: translateY(-10%);
        }
        
        .item.next img {
            bottom: 0;
            transform: translateY(10%);
        }
    }
    .scroll-up .pre,
    .scroll-down .next {
        height: 100%;
    }
    
    .scroll-up .pre img {
        transform: translateY(0);
    }
    
    .scroll-up .cur img {
        transform: translateY(10%);
    }
    
    .scroll-down .next img {
        transform: translateY(0);
    }
    
    .scroll-down .cur img {
        transform: translateY(-10%);
    }
</style>