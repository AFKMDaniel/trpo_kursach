<template>
  <div
    class="relative w-60 break-words rounded-lg p-3 shadow-md"
    :class="{
      '[&>div:last-child]:top-2 [&>div:last-child]:opacity-100': selected,
      '[&>div:last-child]:top-[-4px] [&>div:last-child]:opacity-0 [&>div:last-child]:hover:top-2 [&>div:last-child]:hover:opacity-50':
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
      v-show="allowToSelect"
      class="absolute right-2 transition-all"
      :model-value="selected"
      @update:model-value="onToggle"
      binary
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import Checkbox from 'primevue/checkbox';

import { Note } from './model';
import { useNotesStore } from '@/store';

interface NoteProps {
  note: Note;
  selected: boolean;
}
const { note, selected } = defineProps<NoteProps>();

const store = useNotesStore();
const { selectedTags } = storeToRefs(store);

const allowToSelect = computed(() => {
  return selectedTags.value.length === 0;
});

function onToggle() {
  if (!selected) {
    store.selectNote(note);
  } else {
    store.unselectNote(note);
  }
}
</script>
