<script setup lang="ts">
  // @ts-ignore
  import { uploadFile } from "../../../utils/uploader.ts";
  import { onMounted } from "vue";
  import { ElMessage } from 'element-plus'
  // 上传文件
  // const uploadImage = (files: Array<File>) => {
  //   if (files.length > 0) {
  //     uploadFile(files[0]).subscribe({
  //       next: (result) => {
  //         console.log(result)
  //       },
  //       error: (err) => {
  //         console.log(err)
  //
  //       },
  //       complete: (e) => {
  //         console.log(e)
  //       },
  //     });
  //   }
  // }

  onMounted(()=>{
    ElMessage.error('由于域名问题 暂未开放')
  })
</script>

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
        <!-- <input
          name="cover"
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          @change="uploadImage($event.target.files)"
        /> -->
      </label>
    </div>
    <p>png, jpeg, jpg</p>
    <p>up to 2MB</p>
  </div>
</template>

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
