<template>
    <div class="NavBar flexRow">
        <!-- <div class="leftMenu">
            <a href="https://examples-with-react.vercel.app" target="_self"> React版本 </a>
        </div> -->

        <router-link class="flexRowCenterAll" to="/home">首页</router-link>
        <router-link class="flexRowCenterAll" to="/msg">留言</router-link>
        <router-link class="flexRowCenterAll" to="/chat">聊天</router-link>
        <router-link class="flexRowCenterAll" to="/about">关于我</router-link>

        <div class="rightMenu">
            <span v-if="!name" @click="showLoginView">登陆 / 注册</span>
            <div class="flexRowCenterAll" v-else>
                <span> {{ name }} </span>
                <img :src="require('@/assets/avatar.png')"
                    alt="" crossorigin="anonymous">
            </div>
        </div>

        <transition name="el-fade-in-linear">
            <div class="loginView flexRowCenterAll" v-if="showLogin" @click.self="showLogin = false">
                <div class="loginMain flexColumn">
                    <h1 class="loginTitle">Sign In</h1>
                    <span class="loginText">
                        Sign in to your account
                    </span>
                    <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef"
                        label-position="top">
                        <span class="formLabel">Username</span>
                        <el-form-item prop="username">
                            <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User"></el-input>
                        </el-form-item>
                        <span class="formLabel">Password</span>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" :prefix-icon="Lock"></el-input>
                        </el-form-item>
                        <div class="submit flexRow">
                            <el-button type="primary" size="small" @click="login(loginFormRef)">登陆</el-button>
                        </div>
                    </el-form>
                    <span class="defaultAuth flexRow">用户名：admin 密码：123456</span>
                </div>
            </div>
        </transition>

    </div>
</template>

<script lang="ts" setup>
    import userStore from '@/store/user';
    import { storeToRefs } from 'pinia';
    import { ref,reactive } from 'vue';
    import { User,Lock } from '@element-plus/icons-vue'
    import type { FormInstance, FormRules } from 'element-plus'
    const store = userStore();
    const { name } = storeToRefs(store)
    const { showLogin } = storeToRefs(store)
    const showLoginView = () => {
        showLogin.value = true;
        console.log(showLogin.value);
    }
    interface LoginForm {
        username: string;
        password: string;
    }
    const loginForm = reactive<LoginForm>({
        username: '',
        password: ''
    })
    const loginFormRules = reactive<FormRules<LoginForm>>({
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ]
    })
    const loginFormRef = ref<FormInstance>()
    const login = async (formEl: FormInstance | undefined) => {
        if(!formEl) return;
        await formEl.validate(async(valid) => {
            if (valid) {
                const res = await store.login(loginForm)
                res ? store.showLogin = false : ''
                await store.getInfo()
            }
        })
    }

    window.addEventListener('storage',(e)=>{
        console.log(e);
        
    })
</script>

<style lang="scss" scoped>
    .NavBar{
        width: 100%;
        height: 50px;
        padding: 0 2rem;
        box-shadow: 0 0 16px #b8b8b8;
        position: relative;
        align-items: center;
        z-index: 1000;
        a{
            width: 4em;
            height: 100%;
            font-size: 1.2rem;
            color: black;
            text-decoration: none;
        }
        .router-link-active{
            color: red;
            transition: all .3s;
        }
        .leftMenu{
            position: absolute;
            left: 1rem;
        }
        .rightMenu{
            position: absolute;
            right: 2rem;
            height: 50px;
            line-height: 50px;
            font-size: 1.2rem;
            img{
                width: 3rem;
                height: 3rem;
                border-radius: .25rem;
                margin: 0 0 0 1rem;
            }
        }
        .loginView{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            .loginMain{
                width: 40rem;
                height: 30rem;
                background: white;
                padding: 2rem;
                border-radius: .5rem;
                .loginTitle{
                    width: 100%;
                    height: 3rem;
                    text-align: right;
                }
                .loginText{
                    margin: 1rem 0;
                    font-size: 1rem;
                    color: #687076;
                    text-align: right;
                }
                .el-form{
                    width: 100% !important;
                    height: 18rem !important;
                    overflow: hidden;
                    .formLabel{
                        font-size: 1rem;
                        height: auto;
                        color: #687076;
                    }
                    .el-form-item{
                        height: 5rem;
                        margin-bottom: unset !important;
                        .el-input{
                            height: 3rem !important;
                        }
                    }
                    .submit{
                        width: 100% !important;
                        justify-content: flex-end !important;
                        margin-bottom: unset;
                        height: 4rem;
                        .el-button{
                            width: 8rem;
                            height: 3rem !important;
                        }
                    }
                }
                .defaultAuth{
                    height: 2rem;
                    color: #687076;
                }
            }
        }
    }
</style>