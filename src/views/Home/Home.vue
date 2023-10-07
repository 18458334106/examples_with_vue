<template>
    <div class="container">
        <div class="examples flexRow">
            <div class="example" v-for="item in examples" @click="jumpTo(item.path)">
                <img src="../../assets/SassStarSky.jpg" alt="" srcset="">
                <span class="ellipsis">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref,onMounted } from 'vue'
    import { useRouter } from 'vue-router';

    const examples = ref([]);
    onMounted(() => {
        let arr = []
        arr = useRouter().options.routes[0].children[0].children
        arr = JSON.parse(JSON.stringify(arr))
        arr = arr.filter(item => !item.hidden)
        examples.value = arr
    })

    const router = useRouter();
    const jumpTo = (url) => {
        router.push(url);
    }
</script>

<style lang="scss" scoped>
    .examples {
        width: 100%;
        height: 100%;
        padding: 2rem;
        .example{
            width: 8rem;
            height: 8rem;
            border: 1px solid #000;
            margin-right: 1rem;
            flex-wrap: wrap;
            position: relative;
            cursor: pointer;
            border-radius: .5rem;
            img{
                width: 100%;
                height: 100%;
                overflow: hidden;
                border-radius: .5rem;
            }
            span{
                position: absolute;
                bottom: .5rem;
                left: .5rem;
                color: white;
                font-size: .75rem;
                width: calc(100% - 1rem);
            }
            &:hover{ transform: scale(1.2);transition: all .3s; }
        }
    }
</style>