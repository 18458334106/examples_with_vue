<template>
    <div class="container flexRowCenterAll">
        <div class="chatView flexRow">
            <div class="chatList">
                <div class="createChat flexRowCenterAll">
                    <el-icon><CirclePlus /></el-icon>
                    <span style="margin: 0 1rem;">
                        新建聊天
                    </span>
                </div>
                <div v-if="chatList.length > 0" class="list flexColumn">
                    <div class="listItem flexRow" v-for="item in chatList" @click="chooseUser(item)">
                        <div class="userAvatar">
                            <img :src="require('@/assets/avatar.png')" alt="">
                        </div>
                        <div class="username ellipsis">
                            {{ item.username }}
                        </div>
                    </div>
                </div>
                <div v-else class="empty flexColumnCenterAll">空空如也</div>
            </div>
            <div class="chatDetail">
                <div class="chatDetailView" v-if="chatDetail.username">
                    <div class="chatDetailHeader flexRow">{{ chatDetail.username }}</div>
                    <div class="chatDetailRecode">
                        <div class="recodeItem flexRow" v-for="item in chatDetail.recode">
                            <div class="recodeDetail flexRow" v-if="item.userId === chatDetail.userId">
                                <div class="userAvatar" style="margin: 0 1rem 0 0;">
                                    <img :src="require('@/assets/avatar.png')" alt="">
                                </div>
                                <div class="content" style="background: white;">
                                    {{ item.content }}
                                </div>
                            </div>
                            <div class="recodeDetail flexRow" v-if="item.userId !== chatDetail.userId"
                                style="justify-content: flex-end;">
                                <div class="content" style="background: #95ec69;">
                                    {{ item.content }}
                                </div>
                                <div class="userAvatar" style="margin: 0 0 0 1rem;">
                                    <img :src="require('@/assets/avatar.png')" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chatDetailInput">
                        <textarea placeholder="请输入……" id="chatDetailTextarea" cols="30" rows="10"></textarea>
                        <div class="submit flexRow">
                            <el-button type="success">发送</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
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

    const chatList = ref([
        { userId:2,username:'test',recode:null }
    ]);

    const chooseUser = (item) => {
        console.log(item);
    }
    const chatDetail = ref({
        userId:2,
        username:'test',
        recode:[
            {userId:2,username:'test',content:'你好，很高兴见到你'},
            {userId:1,username:'admin',content:'你好，我也是'},
        ]
    });
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
            .list{
                width: 100%;
                height: calc(90% - 1px);
                font-size: 1.2rem;
                color: #000;
                .listItem{
                    width: 100%;
                    height: 12%;
                    border-bottom: 1px solid #eee;
                    padding: 0 2rem;
                    align-items: center;
                    cursor: pointer;
                    .userAvatar{
                        width: 4rem;
                        height: 4rem;
                        border-radius: .5rem;
                        margin-right: 1rem;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: .5rem;
                        }
                    }
                    .username{
                        width: calc(100% - 5rem);
                    }
                }
            }
        }
        .chatDetail{
            width: 70%;
            height: 100%;
            .chatDetailView{
                width: 100%;
                height: 100%;
                .chatDetailHeader{
                    width: 100%;
                    height: 10%;
                    padding: 0 2rem;
                    border-bottom: 1px solid #eee;
                    align-items: center;
                    font-size: 2rem;
                }
                .chatDetailRecode{
                    width: 100%;
                    height: 60%;
                    padding: 2rem;
                    border-bottom: 1px solid #eee;
                    background: rgba($color: #000000, $alpha: .04);
                    align-items: center;
                    font-size: 2rem;
                    overflow-y: scroll;
                    .recodeItem{
                        width: 100%;
                        font-size: 1.2rem;
                        position: relative;
                        .recodeDetail{
                            width: 100%;
                            .userAvatar{
                                width: 3rem;
                                height: 3rem;
                                border-radius: .5rem;
                                img{
                                    width: 100%;
                                    height: 100%;
                                    border-radius: .5rem;
                                }
                            }
                            .content{
                                min-height: 3rem;
                                line-height: 3rem;
                                padding: 0 1rem;
                                border-radius: .5rem;
                                max-width: 50%;
                                text-wrap: wrap;
                                text-overflow: wrap;
                            }
                        }
                    }
                }
                .chatDetailInput{
                    width: 100%;
                    height: 30%;
                    border-bottom: 1px solid #eee;
                    align-items: center;
                    font-size: 2rem;
                    overflow-y: scroll;
                    position: relative;
                    #chatDetailTextarea{
                        width: 100%;
                        height: 78%;
                        border: none;
                        outline: none;
                        resize: none;
                        font-size: 1.2rem;
                        padding: 1rem;
                    }
                    .submit{
                        position: absolute;
                        right: 1rem;
                        bottom: 1rem;
                        justify-content: flex-end;
                    }
                }
            }
        }
    }
    /* 隐藏滚动条 */
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
    }
    /* 隐藏滚动条轨道 */
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    /* 隐藏滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
</style>