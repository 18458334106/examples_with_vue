<template>
    <div class="container flexRowCenterAll">
        <div class="chatView flexRow">
            <div class="chatList">
                <div class="createChat flexRowCenterAll" @click="newChat">
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
                        <div v-if="item.unread" class="dot"></div>
                    </div>
                </div>
                <div v-else class="empty flexColumnCenterAll">空空如也</div>
            </div>
            <div class="chatDetail">
                <div class="chatDetailView" v-if="chatDetail && chatDetail.username">
                    <div class="chatDetailHeader flexRow">{{ chatDetail.username }}</div>
                    <div class="chatDetailRecode" @scroll="scrollFunc">
                        <div class="recodeItem flexRow" v-for="item in chatDetail.recode">
                            <div class="recodeDetail flexRow" v-if="item.userId === chatDetail.userId">
                                <div class="userAvatar" style="margin: 0 1rem 0 0;">
                                    <img :src="require('@/assets/avatar.png')" alt="">
                                </div>
                                <div class="content" style="background: white;">
                                    {{ item.chatContent }}
                                </div>
                            </div>
                            <div class="recodeDetail flexRow" v-if="item.userId !== chatDetail.userId"
                                style="justify-content: flex-end;">
                                <div class="content" style="background: #95ec69;">
                                    {{ item.chatContent }}
                                </div>
                                <div class="userAvatar" style="margin: 0 0 0 1rem;">
                                    <img :src="require('@/assets/avatar.png')" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chatDetailInput">
                        <textarea placeholder="请输入……" id="chatDetailTextarea" cols="30" rows="10" @focus="inputFocus"></textarea>
                        <div class="submit flexRow">
                            <el-button type="success" @click="send">发送</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog title="新建聊天" v-model="dialogVisible">
            <el-input v-model="username" placeholder="账号搜索" :prefix-icon="Search">
                <template #append>
                    <el-button class="searchBtn" type="primary" :icon="Search" />
                </template>
            </el-input>
            <div class="userList flexColumn">
                <div class="user flexRow" v-for="item in userList">
                    <div class="userAvatar" style="margin: 0 1rem 0 0;">
                        <img :src="require('@/assets/avatar.png')" alt="">
                    </div>
                    <div class="userInfo flexColumn">
                        <span>昵称：{{ item.name }}</span>
                        <span>账号：{{ item.username }}</span>
                    </div>
                    <div class="newChatBtn">
                        <el-button type="success" @click="newChatSub(item)">发消息</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { ElMessage } from "element-plus";
    import { CirclePlus,Search } from "@element-plus/icons-vue";
    import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
    import userStore from '@/store/user'
    import { storeToRefs } from "pinia";
    import { queryChatRecode,queryUserList } from '@/api/user'
    let socket;
    const _userStore = userStore()
    const initSocket = () => {
        socket = io("https://flask-py.vercel.app/chat")
        // socket = io("http://127.0.0.1:5001/chat")
        socket.on("connect", () => {
            console.log(`连接socket服务器:${socket.connected}`);
        });
        socket.on("disconnect", () => { console.log(`断开socket服务器:${socket.connected}`); });
        socket.on("message", (msg) => { 
            console.log("新消息",msg);
            chatDetail.value.recode.push({
                userId:chatDetail.value.userId,
                username: chatDetail.value.username,
                chatContent: msg
            })
        });
        socket.on("message update",(msg)=>{
            console.log("消息更新",msg);
            let userId_msg = msg.userId
            let toUserId_msg = msg.toUserId
            let type = false
            let { userId } = storeToRefs(_userStore)
            if(userId.value === toUserId_msg){
                chatList.value.map((i,index)=>{
                    if(i.userId === userId_msg){
                        chatList.value[index].recode.push(msg)
                        type = true
                        i.unread = true
                    }
                })
                if(!type){
                    chatList.value.push({
                        userId:userId_msg,
                        username:msg.username,
                        recode:[msg],
                        unread:true
                    })
                }
            }
        })
    }
    const send = () => {
        let value = document.getElementById("chatDetailTextarea").value;
        let { userId,name } = storeToRefs(_userStore)
        if(value.length > 0){
            socket.emit("message",{
                userId:userId.value,
                username: name.value,
                toUserId: chatDetail.value.userId,
                toUsername: chatDetail.value.username,
                chatContent: value
            });
            chatDetail.value.recode.push({
                userId:userId.value,
                username: name.value,
                chatContent: value
            })
            document.getElementById("chatDetailTextarea").value = ''
            chatDetailRecodeScrollToBottom()
        }else{
            ElMessage.error("不能发送空消息！");
        }
    }

    const chatDetailRecodeScrollToBottom = () => {
        let ele = document.getElementsByClassName('chatDetailRecode')
        setTimeout(()=>{
            ele[0].scrollTo(0,ele[0].scrollHeight)
        },500)
    }

    const scrollFunc = (e) => {
        console.log(e)
    }

    const chatList = ref([]);
    const chatDetail = ref(null);
    const chooseUser = (item) => {
        item.unread = false
        chatDetail.value = item;
        let { userId,name } = storeToRefs(_userStore)
        queryChatRecode({
            userId:userId.value,
            username: name.value,
            toUserId: item.userId,
            toUsername: item.username
        }).then(res=>{
            chatDetail.value.recode = res
            chatDetailRecodeScrollToBottom()
        })
    }


    const dialogVisible = ref(false);
    const username = ref("");
    const userList = ref([]);
    const getUserList = () => {
        let params = {}
        if(username.value){
            params.username = username.value
        }
        queryUserList(params).then(res=>{
            userList.value = res
        })
    }
    const newChat = () => {
        getUserList()
        dialogVisible.value = true;
    }

    const newChatSub = (item) => {
        let obj = JSON.parse(JSON.stringify(item))
        chatList.value.push({
            userId: obj.id,
            username: obj.name,
            recode:[]
        })
        dialogVisible.value = false
    }

    const inputFocus = () => {
        let userId = chatDetail.value.userId
        chatList.value.forEach(i=>{
            if(i.userId == userId){
                i.unread = false
            }
        })
    }

    onMounted(()=>{
        initSocket()
    })
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
                height: 4rem;
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
                height: calc(100% - 4rem);
                font-size: 1.2rem;
                color: #000;
                transition: all .3s;
                .listItem{
                    width: 100%;
                    height: 6rem;
                    border-bottom: 1px solid #eee;
                    padding: 0 2rem;
                    align-items: center;
                    cursor: pointer;
                    position: relative;
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
                    .dot{
                        position: absolute;
                        right: 2rem;
                        width: 1rem;
                        height: 1rem;
                        background: red;
                        border-radius: 50%;
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
                    transition: all .5s;
                    .recodeItem{
                        width: 100%;
                        font-size: 1.2rem;
                        position: relative;
                        margin-bottom: 1rem;
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
    .searchBtn{
        width: 6rem;
        background: #409eff !important;
        color: white !important;
        font-weight: bolder !important;
        border-radius: 0 4px 4px 0;
    }
    .userList{
        width: 100%;
        margin-top: 1rem;
        max-height: calc(50rem);
        overflow-y: scroll;
        transition: all .3s;
        .user{
            align-items: center;
            height: 8rem;
            position: relative;
            .userAvatar{
                width: 6rem;
                height: 6rem;
                border-radius: .5rem;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: .5rem;
                }
            }
            .userInfo{

            }
            .newChatBtn{
                position: absolute;
                right: 0;
            }
        }
    }
</style>