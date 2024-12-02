<template>
  <ToolbarBlock />
  <div class="flex items-start gap-3 p-3">
    <NotesTag v-for="tag in tagsArray" :key="tag" :tag="tag" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useNotesStore } from '@/store';
import NotesTag from '@/components/tag/NotesTag.vue';
import ToolbarBlock from '@/components/toolbar/ToolbarBlock.vue';

const { tags } = useNotesStore();

const tagsArray = computed(() => {
  return Object.keys(tags);
});
</script>

<style src="./App.css" />
