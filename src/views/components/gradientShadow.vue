<template>
    <div class="container flexRowCenterAll">
        <div class="box"></div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        .box{
            width: 16rem;
            height: 25rem;
            background: url('http://picsum.photos/250/400');
            position: relative;

            --x: 20px;
            --y: 20px;
            &::after{
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                filter: blur(10px);
                left: var(--x);
                top: var(--y);
                z-index: -1;
                background: conic-gradient(
                    #ffd700,
                    #f79d03,
                    #ee6907,
                    #e6390a,
                    #de0d0d,
                    #d61039,
                    #cf1261,
                    #c71585,
                    #cf1261,
                    #d61039,
                    #de0d0d,
                    #ee6907,
                    #f79d03,
                    #ffd700,
                    #ffd700,
                    #ffd700
                );
                clip-path: polygon(
                    -100vmax -100vmax,
                    100vmax -100vmax,
                    100vmax 100vmax,
                    -100vmax 100vmax,
                    -100vmax -100vmax,
                    calc(0px - var(--x)) calc(0px - var(--y)),
                    calc(0px - var(--x)) calc(100% - var(--y)),
                    calc(100% - var(--x)) calc(100% - var(--y)),
                    calc(100% - var(--x))calc(0px - var(--y)),
                    calc(0px - var(--x)) calc(0px - var(--y))
                );
            }
        }
    }
</style>