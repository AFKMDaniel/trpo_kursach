<template>
  <Dialog
    :visible="visible || false"
    @update:visible="handleClose"
    modal
    :header="noteToEdit ? 'Редактировать заметку' : 'Добавить заметку'"
    :style="{ width: '25rem' }"
  >
    <div class="mb-4 flex items-center gap-2">
      <label for="label" class="flex-[1] font-semibold">Заголовок</label>
      <InputText
        id="label"
        class="flex-[2]"
        autocomplete="off"
        v-model="label"
      />
    </div>
    <div class="mb-4 flex gap-2">
      <label for="content" class="flex-[1] font-semibold">Текст</label>
      <Textarea
        class="flex-[2]"
        id="content"
        rows="5"
        cols="30"
        style="resize: none"
        v-model="content"
      />
    </div>
    <div class="mb-4 flex items-center gap-2">
      <label for="noteColor" class="flex-[1] font-semibold">Цвет заметки</label>
      <ColorPicker id="noteColor" class="flex-grow-[2]" v-model="bgColor" />
    </div>
    <div class="mb-4 flex items-center gap-2">
      <label for="textColor" class="flex-[1] font-semibold">Цвет текста</label>
      <ColorPicker id="textColor" class="flex-grow-[2]" v-model="textColor" />
    </div>
    <div class="mb-4 flex items-center" v-if="!noteToEdit">
      <label for="tag" class="flex-[1] font-semibold">Тег</label>
      <Select
        id="tag"
        class="flex-[2]"
        :options="tagsArray"
        placeholder="Выберите тег"
        v-model="tag"
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
// TODO: Не импортировать все полностью, только нужные компоненты по отдельности
import {
  Dialog,
  Button,
  InputText,
  Textarea,
  ColorPicker,
  Select,
} from 'primevue';

import { useNotesStore } from '@/store';

interface AddOrEditPopupProps {
  visible: boolean;
}

const { visible } = defineProps<AddOrEditPopupProps>();
const emit = defineEmits(['close']);

const store = useNotesStore();
const { tags, selectedNotes, notesCount } = storeToRefs(store);

const noteToEdit = computed(() => {
  return selectedNotes.value[0];
});

const tagsArray = computed(() => {
  return tags.value.map((tag) => tag.name);
});

const label = ref('');
const content = ref('');
const bgColor = ref('feea3c');
const textColor = ref('000000');
const tag = ref('#без_тега');

watch(noteToEdit, () => {
  label.value = noteToEdit.value?.label ?? '';
  bgColor.value = noteToEdit.value?.bgColor.substring(1) ?? 'feea3c';
  content.value = noteToEdit.value?.content ?? '';
  textColor.value = noteToEdit.value?.textColor.substring(1) ?? '000000';
  tag.value = noteToEdit.value?.tag ?? '#без_тега';
});

function clearForm() {
  label.value = '';
  bgColor.value = 'feea3c';
  content.value = '';
  textColor.value = '000000';
  tag.value = '#без_тега';
}

function handleClose() {
  clearForm();
  emit('close');
}

function handleSubmit() {
  if (noteToEdit.value) {
    store.editNote({
      id: noteToEdit.value.id,
      bgColor: `#${bgColor.value}`,
      content: content.value,
      textColor: `#${textColor.value}`,
      tag: noteToEdit.value.tag,
      label: label.value,
    });
    store.clearSelection();
  } else {
    store.addNote({
      id: notesCount.value + 1,
      bgColor: `#${bgColor.value}`,
      content: content.value,
      textColor: `#${textColor.value}`,
      tag: tag.value,
      label: label.value,
    });
  }

  clearForm();
  emit('close');
}
</script>
