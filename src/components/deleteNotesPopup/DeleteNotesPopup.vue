<template>
  <Dialog
    :visible="visible || false"
    @update:visible="emit('close')"
    modal
    header="Удалить"
    :style="{ width: '25rem' }"
  >
    <span class="mb-8 block text-surface-500 dark:text-surface-400"
      >Вы уверены что хотите удалить выбранные записки?</span
    >
    <template #footer>
      <Button
        label="Отмена"
        severity="secondary"
        @click="emit('close')"
        autofocus
      />
      <Button label="Подтвердить" @click="handleSubmit" autofocus />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Dialog, Button } from 'primevue';

import { useNotesStore } from '@/store';

interface DeleteNotesPopupProps {
  visible: boolean;
}

const { visible } = defineProps<DeleteNotesPopupProps>();
const emit = defineEmits(['close']);

const store = useNotesStore();
const { selectedNotes } = storeToRefs(store);

function handleSubmit() {
  selectedNotes.value.forEach((note) => store.deleteNote(note));
  store.clearSelection();
  emit('close');
}
</script>
