<template>
  <div
    class="relative rounded-xl border-2 bg-slate-50 p-3 shadow-sm"
    :class="{
      '[&>div:first-child]:top-2 [&>div:first-child]:opacity-100': selected,
      '[&>div:first-child]:top-[-4px] [&>div:first-child]:opacity-0 [&>div:first-child]:hover:top-2 [&>div:first-child]:hover:opacity-50':
        !selected,
    }"
  >
    <Checkbox
      v-show="allowToSelect"
      class="absolute right-2 z-20 transition-all"
      :model-value="selected"
      binary
      @update:model-value="onToggle"
    />
    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 rounded-xl bg-[var(--p-primary-color)]"
      :class="{ 'opacity-0': !selected, 'opacity-50': selected }"
    />
    <draggable
      v-model="notes"
      group="notes"
      :component-data="{
        tag: 'div',
        type: 'transition',
        name: 'flip-list',
      }"
      class="flex h-full w-72 flex-col items-center gap-2"
      item-key="id"
      :animation="200"
      :ghostClass="'opacity-50'"
      :disabled="!isDragEnabled"
    >
      <template #header>
        <div>{{ tag.name }}</div>
      </template>
      <template #item="{ element }">
        <NoteItem :note="element[0]" :selected="element[1]" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import draggable from 'vuedraggable';
import { Checkbox } from 'primevue';

import { useNotesStore } from '@/store';
import type { Tag } from '@/store/useNotesStore';

import NoteItem from '../note/NoteItem.vue';

const { tag, selected } = defineProps<{ tag: Tag; selected: boolean }>();

const store = useNotesStore();
const { isDragEnabled, selectedNotes } = storeToRefs(store);

const allowToSelect = computed(() => {
  return selectedNotes.value.length === 0;
});

const notes = computed({
  get() {
    return tag.notes;
  },

  set(newValue) {
    store.editTagNotes(tag.name, newValue);
  },
});

function onToggle() {
  if (!selected) {
    store.selectTag(tag.name);
  } else {
    store.unselectTag(tag.name);
  }
}
</script>
