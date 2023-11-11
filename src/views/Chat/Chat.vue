<template>
    <div class="container flexRowCenterAll">
        <div class="chatView">
            <div class="chatList">
                <div class="createChat flexRowCenterAll">
                    <el-icon><CirclePlus /></el-icon>
                    <span style="margin: 0 1rem;">
                        新建聊天
                    </span>
                </div>
                <div class="empty flexColumnCenterAll">空空如也</div>
            </div>
            <div class="chatDetail"></div>
        </div>
    </div>
</template>

<script setup>
    import { CirclePlus } from "@element-plus/icons-vue";
    import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
    const socket = io("http://127.0.0.1:5001/chat");

    socket.on("connect", () => {
        console.log(socket.connected); // true
    });

    socket.on("disconnect", () => {
        console.log(socket.connected); // false
    });

    socket.on("message event", (msg) => {
        console.log("新消息",msg); // false
    });

    const send = () => {
        socket.emit("message event", "Hello World_message event!");
        socket.emit("message", "Hello World!");
    }
</script>
<style lang="scss" scoped>
    .chatView{
        width: 80vw;
        height: 80vh;
        box-shadow: 0 0 1rem #b8b8b8;
        border-radius: .5rem;
        .chatList{
            width: 30%;
            height: 100%;
            border-right: 1px solid #eee;
            .createChat{
                height: 10%;
                font-size: 1.2rem;
                border-bottom: 1px solid #eee;
                cursor: pointer;
            }
            .empty{
                width: 100%;
                height: calc(90% - 1px);
                font-size: 1.5rem;
                color: #b8b8b8;
            }
        }
        .chatDetail{
            width: 70%;
            height: 100%;
        }
    }
</style>