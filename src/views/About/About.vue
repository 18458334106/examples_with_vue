<template>
    <div class="container flexColumnCenterAll">
        <h1>About Author [ 某公司摸鱼前端 ]</h1>
        <div class="infos flexRowCenterAll">
            <div class="item" v-for="item in arr">
                <a class="flexColumnCenterAll" target="_blank" :href="item.link">
                    <img :src="item.imgUrl" :alt="item.title">
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    const arr = [
        { imgUrl:require('../../assets/about/gitee.png'), title:'Gitee', link:'https://gitee.com/zhaojc-077399' },
        { imgUrl:require('../../assets/about/github.png'), title:'GitHub', link:'https://github.com/18458334106' },
        { imgUrl:require('../../assets/about/csdn.png'), title:'CSDN', link:'https://blog.csdn.net/weixin_59685936' },
        { imgUrl:require('../../assets/about/blog.png'), title:'blog', link:'https://blog-1790.vercel.app/' }
    ]
</script>

<style lang="scss" scoped>
    @keyframes toBig {
        from{
            transform: scale(0);
        }
        to{
            transform: scale(1);
        }
    }
    h1{
        animation: toBig 1s ease-in-out;
    }
    .infos{
        margin: 2rem 0;
        animation: toBig 1s ease-in-out;
        .item{
            margin: 0 2rem;
            img{
                width: 3rem;
                height: 3rem;
                transition: all 0.3s;
                &:hover{
                    cursor: pointer;
                    transform: scale(1.2);
                }
            }
        }
    }
</style>