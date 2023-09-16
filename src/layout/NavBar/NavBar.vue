<template>
    <div class="NavBar flexRowCenterAll">
        <router-link class="flexRowCenterAll" to="/home">Home</router-link>
        <router-link class="flexRowCenterAll" to="/about">About</router-link>

        <!-- <div class="rightMenu">
            <span v-if="!name" @click="showLoginView">登陆 / 注册</span>
            <span v-else> {{ name }} </span>
        </div>

        <div class="loginView flexColumnCenterAll" v-if="showLogin" @click.capture="showLogin = false">
            <div class="loginForm">

            </div>
        </div> -->
    </div>
</template>

<!-- <script lang="ts" setup>
    import userStore from '@/store/user';
    import { storeToRefs } from 'pinia';
    const store = userStore();
    const { name } = storeToRefs(store)
    const { showLogin } = storeToRefs(store)
    const showLoginView = () => {
        showLogin.value = true;
        console.log(showLogin.value);
    }
</script> -->

<style lang="scss" scoped>
    .NavBar{
        width: 100%;
        height: 50px;
        padding: 0 2rem;
        box-shadow: 0 0 16px #b8b8b8;
        position: relative;
        a{
            width: 8em;
            height: 100%;
            color: black;
            text-decoration: none;
        }
        .router-link-active{
            color: red;
        }
        .rightMenu{
            position: absolute;
            right: 2rem;
        }
        .loginView{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99999;
            .loginForm{
                width: 50rem;
                height: 25rem;
                background: white;
            }
        }
    }
</style>