<template>
    <div class="AppMain">
        <router-view v-slot="{ Component }">
            <transition name="el-fade-in-linear">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<style lang="scss" scoped>
    .AppMain {
        width: 100%;
        height: calc(100vh - 50px);
    }
</style>