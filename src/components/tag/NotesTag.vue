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
      class="absolute right-2 transition-all"
      :model-value="selected"
      binary
      @update:model-value="onToggle"
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
        <div>{{ tag }}</div>
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

import NoteItem from '../note/NoteItem.vue';

const { tag, selected } = defineProps<{ tag: string; selected: boolean }>();

const store = useNotesStore();
const { tags, isDragEnabled } = storeToRefs(store);

const notes = computed({
  get() {
    return tags.value[tag].notes;
  },

  set(newValue) {
    store.editTagNotes(tag, newValue);
  },
});

const { selectTag, unselectTag } = useNotesStore();

function onToggle() {
  if (!selected) {
    selectTag(tag);
  } else {
    unselectTag(tag);
  }
}
</script>
