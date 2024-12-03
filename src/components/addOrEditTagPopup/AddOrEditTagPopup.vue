<template>
  <Dialog
    :visible="visible || false"
    @update:visible="emit('close')"
    modal
    :header="tag ? 'Редактировать тег' : 'Добавить тег'"
    :style="{ width: '25rem' }"
  >
    <div class="mb-4 flex items-center gap-2">
      <label for="label" class="flex-[1] font-semibold">Название</label>
      <InputText
        id="label"
        class="flex-[2]"
        autocomplete="off"
        v-model="name"
      />
    </div>
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
import { ref } from 'vue';
import { Dialog, Button, InputText } from 'primevue';

import { useNotesStore } from '@/store';

interface DeleteNotesPopupProps {
  visible: boolean;
  tag?: string;
}

const { visible, tag } = defineProps<DeleteNotesPopupProps>();
const emit = defineEmits(['close']);

const store = useNotesStore();

const name = ref(tag ?? '');

function handleSubmit() {
  if (tag) {
    store.editTag(tag, name.value);
  } else {
    store.addTag(name.value);
  }
  emit('close');
}
</script>
