<template>
    <div class="container flexColumnCenterAll" style="justify-content: flex-start;">
        <div class="mainContent">
            <el-form ref="formRef" :model="msgForm" :rules="formRules">
                <el-form-item prop="message">
                    <el-input type="textarea" :rows="10" v-model="msgForm.message" placeholder="留言"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addOneMsg(formRef)" style="width: 100%;">提交</el-button>
                </el-form-item>
            </el-form>
            <div class="messages">
                <div class="item flexColumn" v-for="item in messages">
                    <span class="item-username">{{ item.username }} 留言：</span>
                    <div class="item-usermsg">{{ item.message }}</div>
                    <div class="item-msgtime flexColumn">
                        <span>{{ formatTimeWithYMDHMS(item.created_at) }}</span>
                        <el-button v-if="userStore().userId === item.userId"
                            size="mini" type="text" @click="deleteOneMsg(item.id)"
                            style="color: red;">
                            删除
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import { getMsgList,addMsg,delMsg } from '@/api/msg'
    import { formatTimeWithYMDHMS } from '@/utils/format'
    import type { FormInstance,FormRules } from 'element-plus'
    import userStore from '@/store/user';
    import { ElMessage } from 'element-plus';
    import { storeToRefs } from 'pinia';
    const formRef = ref<FormInstance>()
    const formRules = reactive<FormRules>({
        message: [{ required: true, message: '请输入留言', trigger: 'blur' }]
    })
    const msgForm = ref({} as any);
    const addOneMsg = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        const store = userStore()
        const { token,name } = storeToRefs(store)
        if(!token.value || !name.value){
            store.showLogin = true
            ElMessage({ message: '请先登录', duration: 2000 })
            return
        }
        formEl.validate((valid) => {
            if (valid) {
                addMsg(msgForm.value).then(()=>{
                    getMessagesList()
                })
            }
        })
    }

    const deleteOneMsg = (id: number) => {
        delMsg({messageId:id}).then(()=>{
            getMessagesList()
        })
    }

    const messages = ref([] as any)
    const getMessagesList = () => {
        getMsgList().then(res=>{
            messages.value = res
        })
    }

    onMounted(() => { getMessagesList() })
</script>

<style lang="scss" scoped>
    .container {
        padding: 2rem;
        .mainContent{
            width: 60%;
            .item{
                border-radius: .4rem;
                border: 1px solid #dcdfe6;
                padding: 1rem;
                margin-bottom: 1rem;
                transition: all .3s;
                &:last-child{ margin-bottom: 0; }
                .item-username{
                    color: #409EFF;
                }
                .item-usermsg{
                    margin: .5rem 0;
                }
                .item-msgtime{
                    align-items: flex-end;
                }
            }
        }
    }
</style>