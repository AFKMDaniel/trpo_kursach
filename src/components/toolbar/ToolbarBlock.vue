<template>
  <div class="flex justify-between">
    <TransitionGroup class="p-3" tag="div" name="list">
      <Button
        v-if="isDeleteVisible"
        class="rotate-45"
        icon="pi pi-plus"
        variant="text"
        rounded
        size="large"
        severity="help"
        @click="store.clearSelection"
      />
    </TransitionGroup>
    <TransitionGroup class="flex h-fit p-3" name="list" tag="div">
      <Button
        v-if="isAddVisible"
        icon="pi pi-plus"
        variant="text"
        rounded
        size="large"
        :key="1"
        @click="isAddOrEditPopupVisible = true"
      />
      <Button
        v-if="isEditVisible"
        icon="pi pi-pencil"
        severity="warn"
        variant="text"
        rounded
        size="large"
        :key="2"
        @click="isAddOrEditPopupVisible = true"
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
  </div>

  <DeleteNotesPopup
    :visible="isDeletePopupVisible"
    @close="isDeletePopupVisible = false"
  />

  <AddOrEditPopup
    :visible="isAddOrEditPopupVisible"
    @close="isAddOrEditPopupVisible = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';

import { useNotesStore } from '@/store';
import DeleteNotesPopup from '../deleteNotesPopup/DeleteNotesPopup.vue';
import AddOrEditPopup from '../addOrEditPopup/AddOrEditPopup.vue';

const store = useNotesStore();
const { selectedNotes } = storeToRefs(store);

const isAddVisible = computed(() => {
  return selectedNotes.value.length === 0;
});

const isEditVisible = computed(() => {
  return selectedNotes.value.length === 1;
});

const isDeleteVisible = computed(() => {
  return selectedNotes.value.length >= 1;
});

const isAddOrEditPopupVisible = ref(false);
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
