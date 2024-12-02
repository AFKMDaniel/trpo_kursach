<template>
  <TransitionGroup class="flex justify-end p-3" name="list" tag="div">
    <Button
      v-if="isAddVisible"
      icon="pi pi-plus"
      variant="text"
      rounded
      size="large"
      :key="1"
    />
    <Button
      v-if="isEditVisible"
      icon="pi pi-pencil"
      severity="warn"
      variant="text"
      rounded
      size="large"
      :key="2"
    />
    <Button
      v-if="isDeleteVisible"
      icon="pi pi-trash"
      severity="danger"
      variant="text"
      rounded
      size="large"
      :key="3"
      @click="isDeletePopupVisible = true"
    />
  </TransitionGroup>
  <DeleteNotesPopup
    :visible="isDeletePopupVisible"
    @close="isDeletePopupVisible = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button } from 'primevue';

import { useSelectedNotesStore } from '@/store';
import DeleteNotesPopup from '../deleteNotesPopup/DeleteNotesPopup.vue';

const { selectedNotes } = useSelectedNotesStore();

const isAddVisible = computed(() => {
  return selectedNotes.length === 0;
});

const isEditVisible = computed(() => {
  return selectedNotes.length === 1;
});

const isDeleteVisible = computed(() => {
  return selectedNotes.length >= 1;
});

const isDeletePopupVisible = ref(false);
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
