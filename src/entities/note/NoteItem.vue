<template>
  <div
    class="aspect-square w-60 rounded-lg p-3"
    :style="{
      backgroundColor: bgColor,
      color: textColor,
      clipPath: 'path(\'M 0 0 H 240 V 210 L 210 240 H 0 Z\')',
    }"
  >
    <div
      class="mb-2 pb-2 text-xl"
      :style="{ borderBottom: `2px solid ${textColor}` }"
    >
      {{ label }}
    </div>
    <div>{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
/* 
TODO:
1. Сделать изменяющийся размер шрифта
2. Сделать цвет бэкграунда через hsl, а цвет линий вычислять чтоб она была светлее
*/
interface NoteProps {
  label: string;
  content: string;
  bgColor: string;
  textColor: string;
}

const { label, bgColor, textColor, content } = defineProps<NoteProps>();
</script>
