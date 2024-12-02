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
import { Dialog, Button } from 'primevue';

import { useSelectedNotesStore, useNotesStore } from '@/store';

interface DeleteNotesPopupProps {
  visible: boolean;
}

const { visible } = defineProps<DeleteNotesPopupProps>();
const emit = defineEmits(['close']);

const { selectedNotes, clear } = useSelectedNotesStore();
const { deleteNote } = useNotesStore();

function handleSubmit() {
  selectedNotes.forEach((note) => deleteNote(note));
  clear();
  emit('close');
}
</script>
