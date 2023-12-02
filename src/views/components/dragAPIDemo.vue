<template>
    <div class="container flexRowCenterAll">
        <div class="list">
            <div draggable="true" class="list-item">1</div>
            <div draggable="true" class="list-item">2</div>
            <div draggable="true" class="list-item">3</div>
            <div draggable="true" class="list-item">4</div>
            <div draggable="true" class="list-item">5</div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted } from 'vue';
    import Flip from './dragAPIDemoDev/flip';
    let list;
    let sourceNode; // 当前正在拖动的是哪个元素
    let flip;
    
    onMounted(()=>{
        list = document.querySelector('.list')
        list.ondragstart = (e) => {
            setTimeout(() => {
                e.target.classList.add('moving');
            }, 0);
            sourceNode = e.target;
            e.dataTransfer.effectAllowed = 'move';
            flip = new Flip(list.children, 0.3);
        };
        list.ondragover = (e) => {
            e.preventDefault();
        };
        list.ondragenter = (e) => {
            e.preventDefault();
            if (e.target === list || e.target === sourceNode) {
                return;
            }
            const children = Array.from(list.children);
            const sourceIndex = children.indexOf(sourceNode);
            const targetIndex = children.indexOf(e.target);
            if (sourceIndex < targetIndex) {
                list.insertBefore(sourceNode, e.target.nextElementSibling);
            } else {
                list.insertBefore(sourceNode, e.target);
            }
            flip.play();
        };
        list.ondragend = (e) => {
            e.target.classList.remove('moving');
        };
    })
</script>
<style lang="scss" scoped>
    .list {
        width: 80%;
        .list-item {
            margin: 5px 0;
            padding: 0 20px;
            line-height: 40px;
            height: 40px;
            background: linear-gradient(to right, #267871, #136a8a);
            color: #fff;
            cursor: move;
            user-select: none;
            border-radius: 5px;
        }
        .moving {
            background: transparent;
            color: transparent;
            border: 1px dashed #ccc;
        }
    }
</style>