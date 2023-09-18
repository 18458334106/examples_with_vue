<template>
    <div class="AppMain">
        <transition name="el-fade-in-linear">
            <router-view />
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    .AppMain {
        width: 100%;
        height: calc(100vh - 50px);
    }
</style>