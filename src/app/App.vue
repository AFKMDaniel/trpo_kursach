<template>
  <ToolbarBlock />
  <draggable
    class="flex flex-wrap gap-3 p-3"
    v-model="tagsArray"
    :group="'tags'"
    :component-data="{
      tag: 'div',
      type: 'transition',
      name: 'flip-list',
    }"
    item-key="id"
    :animation="200"
    :ghostClass="'opacity-50'"
    :disabled="!isDragEnabled"
  >
    <template #item="{ element }">
      <NotesTag
        :key="element.name"
        :tag="element"
        :selected="element.selected"
      />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import draggable from 'vuedraggable';

import { useNotesStore } from '@/store';
import NotesTag from '@/components/tag/NotesTag.vue';
import ToolbarBlock from '@/components/toolbar/ToolbarBlock.vue';

const store = useNotesStore();
const { tags, isDragEnabled } = storeToRefs(store);

const tagsArray = computed({
  get() {
    return tags.value;
  },

  set(newValue) {
    store.editTags(newValue);
  },
});
</script>

<style src="./App.css" />
