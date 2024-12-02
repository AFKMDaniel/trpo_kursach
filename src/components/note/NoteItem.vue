<template>
  <div
    class="relative w-60 rounded-lg p-3 shadow-md"
    :class="{
      '[&>div:last-child]:top-1 [&>div:last-child]:opacity-100': selected,
      '[&>div:last-child]:top-[-4px] [&>div:last-child]:opacity-0 [&>div:last-child]:hover:top-1 [&>div:last-child]:hover:opacity-50':
        !selected,
    }"
    :style="{
      backgroundColor: note.bgColor,
      color: note.textColor,
    }"
  >
    <div
      class="mb-2 pb-2 text-xl"
      :style="{
        borderBottom: `2px solid ${note.textColor}`,
      }"
    >
      {{ note.label }}
    </div>
    <div>{{ note.content }}</div>
    <div
      class="absolute bottom-0 left-0 right-0 top-0 rounded-lg bg-[var(--p-primary-color)]"
      :class="{ 'opacity-0': !selected, 'opacity-50': selected }"
    />
    <Checkbox
      class="absolute right-1 transition-all"
      :model-value="selected"
      @update:model-value="onToggle"
      binary
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Checkbox from 'primevue/checkbox';

import { Note } from './model';
import { useSelectedNotesStore } from '@/store';

const note = defineProps<Note>();

const selected = ref(false);

const { selectNote, unselectNote } = useSelectedNotesStore();

function onToggle() {
  selected.value = !selected.value;

  if (selected.value) {
    selectNote(note);
  } else {
    unselectNote(note);
  }
}
</script>
