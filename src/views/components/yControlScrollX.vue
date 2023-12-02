<template>
    <div class="container" id="scroll-container">
        <div class="v-scroll" v-if="scroll_container" v-bind:style="{
            'width': scroll_container.offsetHeight + 'px',
            'height': scroll_container.offsetWidth + 'px',
            'transform': `translateY(${scroll_container.offsetHeight}px) rotate(-90deg)`
        }">
            <div class="content" v-bind:style="{
                'left':`${scroll_container.offsetHeight}px`,
                'height':`${scroll_container.offsetHeight}px`
            }">
                <div class="card-list" v-bind:style="{
                    'left':`0`,
                    'height':`${scroll_container.offsetHeight}px`,
                    'transform': `translateY(${scroll_container.offsetHeight}px) rotate(-90deg)`
                }">
                    <div class="card-item" v-for="item in imgArr">
                        <img :src="item" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    let scroll_container = ref(null);
    let imgArr = ref([])
    onMounted(()=>{
        scroll_container.value = document.getElementById('scroll-container');
        const { offsetWidth,offsetHeight } = scroll_container.value
        for (let index = 0; index < 5; index++) {
            imgArr.value.push(`http://picsum.photos/${offsetHeight}/${offsetWidth}?t=${new Date().getTime()}`)
        }
    })
</script>
<style lang="scss" scoped>
    #scroll-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .v-scroll {
            transform-origin: left top;
            position: relative;
            overflow-x: hidden;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                width: 0;
                height: 0;
                background-color: transparent;
            }
            /* 隐藏滚动条轨道 */
            &::-webkit-scrollbar-track {
                background-color: transparent;
            }
                /* 隐藏滚动条滑块 */
            &::-webkit-scrollbar-thumb {
                background-color: transparent;
            }
            .content,.card-list{
                position: absolute;
                top: 0;
                transform-origin: left top;
                transform: rotate(90deg);
            }
        }
    }
</style>