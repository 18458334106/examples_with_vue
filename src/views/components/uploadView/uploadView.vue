<template>
  <div class="container flexColumnCenterAll">
    <div>
      <label
          class="flexColumnCenterAll"
          for="file-upload"
      >
        <svg
            class="icon"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
        >
          <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
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
          <el-input v-model="qiniuSettingForm.ak" placeholder="AK" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="SK" prop="sk">
          <el-input v-model="qiniuSettingForm.sk" placeholder="SK" style="width: 90%;" />
        </el-form-item>
        <el-form-item label="Bucket" prop="bucketname">
          <el-input v-model="qiniuSettingForm.bucketname" placeholder="Bucket" style="width: 90%;" />
        </el-form-item>
        <el-form-item label-width="0%">
          <el-button @click="showQiniuSetting = false">取消</el-button>
          <el-button type="primary" @click="saveQiniuSetting(qiniuSettingRef)">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  // @ts-ignore
  import { init,uploadFile,ak,sk,bucketname } from "../../../utils/uploader.ts";
  import { reactive,ref } from "vue";
  import { ElMessage } from 'element-plus'
  import type { FormInstance, FormRules } from 'element-plus'
  // 上传文件
  const uploadImage = (e:any) => {
    let files = e.target.files
    console.log(files);
    if(ak === '' || sk === '' || bucketname === ''){
      showQiniuSetting.value = true
      ElMessage.error('请先配置七牛云上传配置')
      return
    }
    console.log(ak,sk,bucketname);
    
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
    .icon{
      width: 3rem;
      height: 3rem; 
      cursor: pointer;
    }
  }
</style>
