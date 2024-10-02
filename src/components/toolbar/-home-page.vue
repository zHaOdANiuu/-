<template>
  <Toolbar :top="top" :show="show">
    <div class="flex gap-3 [&>*]:cursor-default">
      <div>
        <ul>
          <li v-for="i in clipboardList">{{ i }}</li>
        </ul>
      </div>
      <div>
        <div class="flex">
          <div class="flex flex-col">
            <span>...</span>
            <UlDropDownList :list="graphicsList.select" title="选择▼" />
          </div>
          <div>
            <ul>
              <li>重新调整大小</li>
              <UlDropDownList :list="graphicsList.rota" title="旋转▼" />
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div>
        </div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="flex gap-12">
      <span>剪贴板</span>
      <span>图像</span>
      <span>工具</span>
      <span>形状</span>
      <span>颜色</span>
    </div>
  </Toolbar>
</template>

<script lang="ts" setup>
import Toolbar from './-toolbar.vue';
import UlDropDownList from './-ul-drop-down-list.vue';

defineProps<{
  top: number;
  show: boolean;
}>();

const clipboardList = ['剪切', '复制', '粘贴', '打开图片'];
const graphicsList = {
  rota: ['向右旋转90°', '向左旋转90°', '旋转180°', '垂直翻转', '水平翻转'],
  select: ['矩形选择', '多边形选择', '全选', '删除']
};

</script>
