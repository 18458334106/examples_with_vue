<script setup lang="ts">
import {onMounted, ref} from "vue";
// @ts-ignore
const num=ref(100);
// @ts-ignore
let picStr='';
const createPics=(val:number,type:number)=>{
  for(let i=0;i<val;i++){
    picStr+=`
        <div class="box">
            <div class="pic">
                <img src="https://picsum.photos/200/${100*(i%2?3:2)}?t=${i}" alt="">
            </div>
        </div>
      `
  }
  if(type===1){
    const pics = document.getElementsByClassName('pics')[0]
    pics.innerHTML=""
    pics.innerHTML=picStr
    return
  }
  return picStr;
}

onMounted(()=>{
  const pics = document.getElementsByClassName('pics')[0]
  pics.innerHTML=(createPics(num.value,0)) as string
})

</script>

<template>
  <div class="all">
    <div class="pics"></div>
    <div class="loadMore">
      <el-button type="primary" @click="createPics(50,1)">加载更多</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.all{
  padding: 1%;
  width: calc(100% - 4%);
}
.pics{
  -webkit-column-width: 200px;
  -moz-column-width: 200px;
  column-width: 200px;
}

.pics .box{
  float: left;
}

.pics .box .pic{
  border: 1px solid #DDDDDD;
  border-radius: 5px;
  box-shadow: 0 0 1px #ddd;
  padding: 2% 0;
}

.pics .box .pic img {
  width: 200px;
}
.loadMore{
  width: 100%;
  height: 60px;
  margin-top: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>