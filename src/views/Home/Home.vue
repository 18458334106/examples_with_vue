<template>
    <div class="container">
        <div class="examples">
            <div class="example" v-for="item in examples" @click="jumpTo(item.path)">
                <span class="ellipsis">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref,onMounted } from 'vue'
    import { asyncRoutes } from '@/router';
    import { useRouter } from 'vue-router';
    const examples = asyncRoutes
    const router = useRouter();
    const jumpTo = (url) => {
        router.push(url);
    }
</script>

<style lang="scss" scoped>
    .examples {
        width: 100%;
        padding: 2rem;
        transition: all .5s;
        .example{
            width: 8rem;
            height: 8rem;
            position: relative;
            cursor: pointer;
            border-radius: .5rem;
            background: url('../../assets/SassStarSky.jpg') no-repeat;
            background-size: cover;
            overflow: hidden;
            float: left;
            transition: all .3s;
            margin: 0 1rem 1rem 0;
            &:hover{ transform: scale(1.2); }
            &:last-child{ margin-right: 0; }
            animation: toBig 1s ease-in-out;
            @keyframes toBig {
                from{
                    transform: scale(0);
                }
                to{
                    transform: scale(1);
                }
            }
            span{
                position: absolute;
                bottom: 0rem;
                left: 0;
                color: white;
                font-size: .75rem;
                padding: .5rem 1rem;
                width: 100%;
                border-radius: .5rem;
            }
        }
    }
</style>