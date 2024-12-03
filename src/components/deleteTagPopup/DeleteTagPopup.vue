<template>
  <Dialog
    :visible="visible || false"
    @update:visible="emit('close')"
    modal
    header="Удалить теги"
    :style="{ width: '25rem' }"
  >
    <span class="mb-8 block text-surface-500 dark:text-surface-400"
      >Вы уверены что хотите удалить выбранные теги?</span
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

import { useNotesStore } from '@/store';
import { storeToRefs } from 'pinia';

interface DeleteNotesPopupProps {
  visible: boolean;
}

const { visible } = defineProps<DeleteNotesPopupProps>();
const emit = defineEmits(['close']);

const store = useNotesStore();
const { selectedTags } = storeToRefs(store);

function handleSubmit() {
  selectedTags.value.forEach((tag) => store.deleteTag(tag));
  emit('close');
}
</script>
