<template>
    <div class="container flexRowCenterAll">
        <h1>show text effect</h1>
    </div>
</template>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');
    .container{
        background: #eee;
    }
    h1{
        font-size: 20vmin;
        line-height: 1;
        margin: 0;
        letter-spacing: 5px;
        color: #e6e6e6;
        text-align: center;
        font-family: 'Luckiest Guy';
        text-shadow: 1px -1px #fff,
        -1px 1px #999,
        -10px 10px 5px #80808080;
    }
</style>