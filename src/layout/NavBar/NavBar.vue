<template>
    <div class="NavBar flexRowCenterAll">
        <router-link class="flexRowCenterAll" to="/home">Home</router-link>
        <router-link class="flexRowCenterAll" to="/about">About</router-link>
    </div>
</template>

<style lang="scss" scoped>
    .NavBar{
        width: 100%;
        height: 50px;
        box-shadow: 0 0 16px #b8b8b8;
        a{
            width: 8em;
            height: 100%;
            color: black;
            text-decoration: none;
        }
        .router-link-active{
            color: red;
        }
    }
</style>