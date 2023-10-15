<template>
    <div class="NavBar flexRowCenterAll">
        <div class="leftMenu">
            <a href="https://examples-with-react.vercel.app" target="_self"> React版本 </a>
        </div>

        <router-link class="flexRowCenterAll" to="/">Home</router-link>
        <router-link class="flexRowCenterAll" to="/about">About</router-link>

        <div class="rightMenu">
            <span v-if="!name" @click="showLoginView">登陆 / 注册</span>
            <span v-else> {{ name }} </span>
        </div>

        <transition name="el-fade-in-linear">
            <div class="loginView flexRowCenterAll" v-if="showLogin" @click.self="showLogin = false">
                <div class="loginMain flexColumnCenterAll">
                    <h1 class="loginTitle">Login In</h1>
                    <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
                        <el-form-item prop="username">
                            <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名" size="large" :prefix-icon="User"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" size="large" :prefix-icon="Lock"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="login(loginFormRef)" size="large">登陆</el-button>
                        </el-form-item>
                    </el-form>
                    <span class="defaultAuth">用户名：admin 密码：123456</span>
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
</script>

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
            font-size: 1rem;
            color: black;
            text-decoration: none;
        }
        .router-link-active{
            color: red;
            transition: all .3s;
        }
        .leftMenu{
            position: absolute;
            left: 2rem;
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
            z-index: 2000;
            .loginMain{
                width: 25rem;
                height: 25rem;
                background: white;
                padding: 2rem;
                border-radius: 1rem;
                .loginTitle{
                    margin: 2rem 0;
                }
                .el-form{
                    width: 100% !important;
                    height: 100% !important;
                    padding: 0 2rem;
                    .el-form-item{
                        width: 100% !important;
                        .el-input{ width: 100% !important; }
                        .el-button{ width: 100% !important;margin: 1rem 0; }
                    }
                }
                .defaultAuth{
                    width: 100%;
                    text-align: center;
                    color: #b8b8b8;
                    font-size: 1rem;
                }
            }
        }
    }
</style>