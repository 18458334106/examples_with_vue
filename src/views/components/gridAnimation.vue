<template>
    <div class="container flexColumnCenterAll">
        <div class="content">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        background: #23262d;
        .content{
            width: 25rem;
            height: 25rem;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            gap: 10px;
            transition: all .3s;
        }
        @for $i from 0 to 9 {
            .item:nth-child(#{$i + 1}){
                background: hsl($i * 144deg, 100%, 74%);
            }
            .content:has(.item:nth-child(#{$i + 1}):hover){
                $r: floor(calc($i / 3)) + 1;
                $c: $i % 3 + 1;
                $arr: 1fr 1fr 1fr;
                $rows: set-nth($arr, $r, 2fr);
                $columns: set-nth($arr, $c, 2fr);
                grid-template-columns: $columns;
                grid-template-rows: $rows;
            }
        }
    }
</style>