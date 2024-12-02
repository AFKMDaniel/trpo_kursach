import { ref } from 'vue';

import { defineStore } from 'pinia';

import { Note } from '@/components/note/model';

export const useSelectedNotesStore = defineStore('selectedNotes', () => {
  const selectedNotes = ref<Note[]>([]);

  function selectNote(note: Note) {
    selectedNotes.value.push(note);
  }

  function unselectNote(note: Note) {
    const index = selectedNotes.value.findIndex(
      (selectedNote) => selectedNote.id === note.id
    );

    if (index !== -1) {
      selectedNotes.value.splice(index, 1);
    }
  }

  function clear() {
    selectedNotes.value.splice(0, selectedNotes.value.length);
  }

  return { selectedNotes, selectNote, unselectNote, clear };
});
