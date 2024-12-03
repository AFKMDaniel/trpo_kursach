<template>
  <Dialog
    :visible="visible || false"
    @update:visible="handleClose"
    modal
    :header="tagToEdit ? 'Редактировать тег' : 'Добавить тег'"
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
        @click="handleClose"
        autofocus
      />
      <Button label="Подтвердить" @click="handleSubmit" autofocus />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Dialog, Button, InputText } from 'primevue';

import { useNotesStore } from '@/store';

interface DeleteNotesPopupProps {
  visible: boolean;
}

const { visible } = defineProps<DeleteNotesPopupProps>();
const emit = defineEmits(['close']);

const store = useNotesStore();
const { selectedTags } = storeToRefs(store);

const tagToEdit = computed(() => {
  return selectedTags.value[0];
});

const name = ref('');

watch(tagToEdit, () => {
  name.value = tagToEdit.value;
});

function handleClose() {
  name.value = '';
  emit('close');
}

function handleSubmit() {
  if (tagToEdit.value) {
    store.editTag(tagToEdit.value, name.value);
  } else {
    store.addTag(name.value);
  }
  handleClose();
}
</script>
