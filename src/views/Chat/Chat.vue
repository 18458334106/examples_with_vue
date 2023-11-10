<template>
    <div class="container">
        <button @click="send">发送</button>
    </div>
</template>

<script setup>
    import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
    const socket = io("https://flask-py.vercel.app/chat");

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