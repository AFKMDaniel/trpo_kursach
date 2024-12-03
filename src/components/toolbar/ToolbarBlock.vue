<template>
  <div class="flex h-16 justify-between p-3">
    <TransitionGroup tag="div" name="list">
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
    <TransitionGroup class="flex" name="list" tag="div">
      <!-- <Button
        v-if="isDragEnabled"
        icon="pi pi-plus"
        variant="text"
        rounded
        size="large"
        :key="1"
        @click="isAddOrEditNotePopupVisible = true"
      /> -->
      <Button
        v-if="isEditVisible"
        icon="pi pi-pencil"
        severity="warn"
        variant="text"
        rounded
        size="large"
        :key="2"
        @click="handleEditClick"
      />
      <Button
        v-if="isDeleteVisible"
        icon="pi pi-trash"
        severity="danger"
        variant="text"
        rounded
        size="large"
        :key="3"
        @click="handleDeleteClick"
      />
    </TransitionGroup>
  </div>
  <ContextMenu global ref="menu" :model="items" />

  <DeleteNotesPopup
    :visible="isDeleteNotePopupVisible"
    @close="isDeleteNotePopupVisible = false"
  />

  <AddOrEditPopup
    :visible="isAddOrEditNotePopupVisible"
    @close="isAddOrEditNotePopupVisible = false"
  />

  <DeleteTagPopup
    :visible="isDeleteTagPopupVisible"
    @close="isDeleteTagPopupVisible = false"
  />

  <AddOrEditTagPopup
    :visible="isAddOrEditTagPopupVisible"
    @close="isAddOrEditTagPopupVisible = false"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import ContextMenu from 'primevue/contextmenu';

import { useNotesStore } from '@/store';
import DeleteNotesPopup from '../deleteNotesPopup/DeleteNotesPopup.vue';
import AddOrEditPopup from '../addOrEditPopup/AddOrEditPopup.vue';
import DeleteTagPopup from '../deleteTagPopup/DeleteTagPopup.vue';
import AddOrEditTagPopup from '../addOrEditTagPopup/AddOrEditTagPopup.vue';

const store = useNotesStore();
const { selectedNotes, selectedTags } = storeToRefs(store);

const isEditVisible = computed(() => {
  return selectedNotes.value.length === 1 || selectedTags.value.length === 1;
});

const isDeleteVisible = computed(() => {
  return selectedNotes.value.length > 0 || selectedTags.value.length > 0;
});

const isAddOrEditNotePopupVisible = ref(false);
const isDeleteNotePopupVisible = ref(false);
const isAddOrEditTagPopupVisible = ref(false);
const isDeleteTagPopupVisible = ref(false);
const menu = ref();
const items = ref([
  {
    label: 'Добавить тег',
    icon: 'pi pi-plus',
    command() {
      isAddOrEditTagPopupVisible.value = true;
    },
  },
  {
    label: 'Добавить заметку',
    icon: 'pi pi-file',
    command() {
      isAddOrEditNotePopupVisible.value = true;
    },
  },
]);

function handleEditClick() {
  if (selectedNotes.value.length > 0) {
    isAddOrEditNotePopupVisible.value = true;
  } else {
    isAddOrEditTagPopupVisible.value = true;
  }
}

function handleDeleteClick() {
  if (selectedNotes.value.length > 0) {
    isDeleteNotePopupVisible.value = true;
  } else {
    isDeleteTagPopupVisible.value = true;
  }
}
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
  transform: translateX(30%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
/* .list-leave-active {
  position: absolute;
} */
</style>
