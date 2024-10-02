<template>
  <div>
    <span @mousedown="f()" class="cursor-pointer" data-winmdisshow="true" :data-index="{ id }">{{ title }} </span>
    <ul :style="{ display: store.data[id] ? 'block' : 'none' }" class="absolute bg-white w-32">
      <li v-for="i in list" class="hover:bg-cyan-100">{{ i }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import store from '@/store/ulDropDownLiStStore';

defineProps<{
  title: string;
  list: string[];
}>();

const id = store.createID();
store.data.push(false);

let hasDown = false;

const f = () => {
  if (hasDown) {
    store.data[id] = hasDown = false;
    return;
  }
  let j = -1;
  const { length } = store.data;
  for (let i = -1; ++i < length;) {
    if (++j === id) store.data[j] = true;
    else store.data[i] = false;
  }
  hasDown = true;
};
</script>
