<template>
      <Teleport to="body">
            <div v-if="show" :style="{ top: `${top}px` }" class="absolute w-screen h-32 bg-slate-100">
                  <slot></slot>
            </div>
      </Teleport>
</template>

<script lang="ts" setup>
defineProps<{
      top: number;
      show: boolean;
}>();
</script>
