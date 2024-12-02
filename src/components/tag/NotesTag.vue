<template>
  <draggable
    v-model="notes"
    :group="'tag'"
    :component-data="{
      tag: 'div',
      type: 'transition',
      name: 'flip-list',
    }"
    class="flex w-72 flex-col items-center gap-2 rounded-xl border-2 bg-slate-50 p-3 shadow-sm"
    item-key="id"
    :animation="200"
    :ghostClass="'opacity-50'"
    :disabled="!isDragEnabled"
  >
    <template #header>
      <div>{{ tag }}</div>
    </template>
    <template #item="{ element }">
      <NoteItem v-bind="element" />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import draggable from 'vuedraggable';

import { useNotesStore, useSelectedNotesStore } from '@/store';

import NoteItem from '../note/NoteItem.vue';

const { tag } = defineProps<{ tag: string }>();

const { tags, editTagNotes } = useNotesStore();
const { selectedNotes } = useSelectedNotesStore();

const notes = computed({
  get() {
    return tags[tag];
  },

  set(newValue) {
    editTagNotes(tag, newValue);
  },
});
const isDragEnabled = computed(() => {
  return selectedNotes.length === 0;
});
</script>
