<template>
      <div class="bg-slate-200 h-screen overflow-hidden">
            <div class="mb-[6px] bg-white w-screen h-16 shadow-[0_1px_1px#000000]">
                  <div class="flex items-center mb-1 cursor-pointer [&>*]:mr-2">
                        <span>🎨 |</span>
                        <span class="hover:bg-slate-200">📄</span>
                        <span class="text-2xl">↩</span>
                        <span class="text-2xl">↪</span>
                        <span>| 无标题-画图</span>
                  </div>
                  <div class="flex [&>*]:w-16 cursor-pointer">
                        <div data-winmdisshow="true" class="bg-cyan-300" @mousedown="toggleShowFileDDList()">
                              文件
                              <FileDropDownList :show="isShowFileDDList" />
                        </div>
                        <div data-winmdisshow="true" @mousedown="toggleShowHomePage()">
                              主页
                              <HomePage :top="64" :show="isShowHomePage" />
                        </div>
                        <div data-winmdisshow="true">查看</div>
                  </div>
            </div>
            <canvas ref="canvas" :width="cvsWidth" :height="cvsHeight"
                  class="bg-white shadow-[0_1px_2px_#000000] cursor-crosshair"> </canvas>
            <div class="absolute bottom-0 flex gap-32 bg-slate-300 w-screen h-6">
                  <div>
                        <span>▞</span>
                        <span class="ml-8">{{ mouseRelativeCvsPosition.toString() + '像素' }}</span>
                  </div>
                  <div>
                        <span>🖼</span>
                        <span>{{}}</span>
                  </div>
                  <div class="flex gap-1">
                        <span class="w-10 ml-2">{{ cvsScale }}%</span>
                        <button @click="reduceInputValue()">➖</button>
                        <input type="range" :value="inputValue" class="cursor-pointer" />
                        <button @click="increaseInputValue()">➕</button>
                  </div>
            </div>
      </div>
</template>

<script lang="ts" setup>
import FileDropDownList from '@/components/file/-file-drop-down-list.vue';
import HomePage from '@/components/toolbar/-home-page.vue';
import { onMounted, ref, useTemplateRef, type Ref } from 'vue';
import useEventListeners from '@/utils/useEventListeners';
import DrawPictures from './function';

const cvsWidth = ref(400);
const cvsHeight = ref(400);
const cvsScale = ref(100);
const inputValue = ref(50);
const isShowFileDDList = ref(false);
const isShowHomePage = ref(false);
const isShowViewer = ref(false);
const mouseRelativeCvsPosition = ref([0, 0]);

const cvs = useTemplateRef('canvas');

// 改变画布大小
const reduceInputValue = () => {
      if (inputValue.value === 0) return;
      if (inputValue.value > 50) {
            inputValue.value -= 10;
            cvsScale.value -= 100;
      } else switch (inputValue.value) {
            case 12.5:
                  inputValue.value = 0;
                  cvsScale.value = 12.5;
                  break;
            default:
                  inputValue.value /= 2;
                  cvsScale.value /= 2;
                  break;
      }
};
const increaseInputValue = () => {
      if (inputValue.value === 99) return;
      if (inputValue.value < 50) {
            inputValue.value = inputValue.value * 2 || 12.5;
            cvsScale.value *= 2;
      } else {
            inputValue.value += 7;
            cvsScale.value += 100;
      }
      if (inputValue.value === 99) ++inputValue.value;
};

const tmp = () => {
      isShowFileDDList.value = isShowHomePage.value = isShowViewer.value = false;
};
const changeShowData = (d: Ref<boolean, boolean>) => {
      if (d.value) {
            d.value = false;
            return;
      }
      tmp();
      d.value = !d.value;
}
// 改变文件下拉列表的显示状态
const toggleShowFileDDList = () => { changeShowData(isShowFileDDList); };
// 改变主页的显示状态
const toggleShowHomePage = () => { changeShowData(isShowHomePage); };
// 改变查看的显示状态
const toggleShowViewer = () => { changeShowData(isShowViewer); };

useEventListeners(window, 'mousedown', e => {
      const target = e.target as HTMLDivElement;
      if (Boolean(target.dataset.winmdisshow)) return;
      tmp();
});

onMounted(() => {
      new DrawPictures(cvs.value as HTMLCanvasElement);
})
</script>
