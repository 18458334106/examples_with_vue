<template>
    <div class="container">
        <div class="content">
            <div class="inner">
                <img v-for="(index) in 6" 
                    :src="`http://picsum.photos/640/640?t=${new Date().getTime() + index}`" 
                    alt="" srcset="">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
    @use 'sass:math';
    .container{
        background: black;
        justify-content: center;
        $size: 200px;
        $n: 6;
        $pDeg: 360deg / $n;
        $r: $size / 2;
        $R: $r / math.sin($pDeg / 2);
        $innnerSize: $R * 2;
        .content{
            width: $size;
            height: $size;
            border-radius: 50%;
            outline: 5px solid white;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            overflow: hidden;
            .inner{
                width: $innnerSize;
                height: $innnerSize;
                border-radius: 50%;
                margin-top: $r;
                position: relative;
                animation: moving 5s infinite;
               img{
                    width: $size;
                    height: $size;
                    border-radius: 50%;
                    position: absolute;
                    left: 50%;
                    margin-left: -$size / 2;
                    top:-$r;
                    transform-origin: center #{$r + $R};
                    @for $i from 1 through $n{
                        &:nth-child(#{$i}){
                            transform: rotate($pDeg * ($i + 1));
                        }
                    }
               } 
            }
            $u: 1 / $n * 100%;
            $stopPercent: 0.6 * $u;
            @keyframes moving {
                @for $i from 1 through $n{
                    $p:$u * $i;
                    $Deg:$pDeg * $i;
                    #{$p - $stopPercent},
                    #{$p}{
                        transform: rotate(-$Deg);
                    }
                }
            }
        }
    }
</style>