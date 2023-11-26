<template>
  <div class="container flexColumnCenterAll">
    <div class="setting flexColumnCenterAll" @click="showQiniuSetting = true">
      <el-icon style="font-size: 2rem;"><Tools /></el-icon>
      <span>上传配置</span>
    </div>
    <div class="upload">
      <label
          class="flexColumnCenterAll"
          for="file-upload"
          style="cursor: pointer;"
      >
        <el-icon><UploadFilled /></el-icon>
        <input
          id="file-upload"
          style="display: none;"
          name="cover"
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          @change="uploadImage($event)"
        />
      </label>
    </div>
    <p>png, jpeg, jpg</p>
    <p>up to 2MB</p>

    <el-dialog title="七牛云上传配置" v-model="showQiniuSetting">
      <el-form
        :model="qiniuSettingForm"
        :rules="qiniuSettingRules"
        ref="qiniuSettingRef"
        label-width="16%">
        <el-form-item label="AK" prop="ak">
          <el-input size="large" v-model="qiniuSettingForm.ak" placeholder="AK" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="SK" prop="sk">
          <el-input size="large" v-model="qiniuSettingForm.sk" placeholder="SK" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="Bucket" prop="bucketname">
          <el-input size="large" v-model="qiniuSettingForm.bucketname" placeholder="Bucket" style="width: 90%;" />
        </el-form-item>
        <el-form-item label-width="0%" class="center">
          <el-button size="large" @click="showQiniuSetting = false">取消</el-button>
          <el-button size="large" type="primary" @click="saveQiniuSetting(qiniuSettingRef)">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  // @ts-ignore
  import { init,uploadFile,ak,sk,bucketname } from "@/utils/uploader";
  import { reactive,ref } from "vue";
  import { ElMessage } from 'element-plus'
  import type { FormInstance, FormRules } from 'element-plus'
  import { UploadFilled,Tools } from '@element-plus/icons-vue'
  // 上传文件
  const uploadImage = (e:any) => {
    let files = e.target.files
    if(ak === '' || sk === '' || bucketname === ''){
      ElMessage.error('请先点击右上角配置七牛云上传配置')
      return
    }
    if (files.length > 0) {
      uploadFile(files[0]).subscribe({
        next: (result:any) => {
          console.log(result)
        },
        error: (err:any) => {
          console.log(err)
  
        },
        complete: (e:any) => {
          console.log(e)
        },
      });
    }
  }


  interface qiniuSettingFormType {
    ak: string
    sk: string
    bucketname: string
  }
  const showQiniuSetting = ref(false)
  const qiniuSettingRef = ref<FormInstance>()
  const qiniuSettingForm = reactive<qiniuSettingFormType>({
    ak: '',
    sk: '',
    bucketname: '',
  })
  const qiniuSettingRules = reactive<FormRules<qiniuSettingFormType>>({
    ak:[{ required: true, message: '请输入七牛云AK', trigger: 'blur' }],
    sk:[{ required: true, message: '请输入七牛云SK', trigger: 'blur' }],
    bucketname:[{ required: true, message: '请输入七牛云BucketName', trigger: 'blur' }]
  })

  const saveQiniuSetting = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
      if (valid) {
        ElMessage.success('保存成功')
        showQiniuSetting.value = false
        init(qiniuSettingForm)
      }
    })
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    .setting{
      position: absolute;
      right: 2rem;
      top: 2rem;
      cursor: pointer;
    }
    .upload{
      cursor: pointer;
      font-size: 4rem;
    }
  }
</style>
<style lang="scss">
  .center{
    .el-form-item__content{
      justify-content: center;
    }
  }
</style>