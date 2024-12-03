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
        :key="element"
        :tag="element"
        :selected="tags[element].selected"
      />
    </template>
  </draggable>
  <ContextMenu global ref="menu" :model="items" />
  <AddOrEditTagPopup
    :visible="isPopupVisible"
    @close="isPopupVisible = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import draggable from 'vuedraggable';
import ContextMenu from 'primevue/contextmenu';

import { useNotesStore } from '@/store';
import { Tags } from '@/store/useNotesStore';
import NotesTag from '@/components/tag/NotesTag.vue';
import ToolbarBlock from '@/components/toolbar/ToolbarBlock.vue';
import AddOrEditTagPopup from '@/components/addOrEditTagPopup/AddOrEditTagPopup.vue';

const store = useNotesStore();
const { tags, isDragEnabled } = storeToRefs(store);

const tagsArray = computed({
  get() {
    return Object.keys(tags.value);
  },

  set(newValue) {
    const tagsOrderObject = newValue.reduce((acc, tag) => {
      acc[tag] = { notes: [], selected: false };
      return acc;
    }, {} as Tags);

    const newTags = Object.assign(tagsOrderObject, tags.value);

    store.editTags(newTags);
  },
});

const menu = ref();
const items = ref([
  {
    label: 'Добавить тег',
    icon: 'pi pi-plus',
    command() {
      isPopupVisible.value = true;
    },
  },
]);
const isPopupVisible = ref(false);
</script>

<style src="./App.css" />
