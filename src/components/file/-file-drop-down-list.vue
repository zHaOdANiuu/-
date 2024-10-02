<template>
      <ul v-if="show" class="cursor-none">
            <li>新建</li>
            <li>打开</li>
            <li>保存</li>
            <li>另存为</li>
            <li>关于</li>
      </ul>
</template>

<script lang="ts" setup>
defineProps<{ show: boolean }>();
</script>
