import { ref } from 'vue';

import { defineStore } from 'pinia';

import { Note } from '@/components/note/model';

export const useNotesStore = defineStore('tags', () => {
  const tags = ref<Record<string, Note[]>>({
    '#без_тега': [
      {
        id: 1,
        label: 'название',
        bgColor: '#feea3c',
        textColor: '#000000',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, labore.',
        tag: '#без_тега',
      },
      {
        id: 3,
        label: '3',
        bgColor: '#fe743c',
        textColor: '#000000',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, labore.',
        tag: '#без_тега',
      },
    ],
    '#бэклог_игр': [
      {
        id: 2,
        label: 'The binding of Isaac',
        bgColor: '#3ca0fe',
        textColor: '#000000',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, labore.',
        tag: '#бэклог_игр',
      },
    ],
  });

  function addTag(tagName: string) {
    tags.value[tagName] = [];
  }

  function deleteTag(tagName: string) {
    delete tags.value[tagName];
  }

  function editTag(oldTagName: string, newTagName: string) {
    const notes = tags.value[oldTagName];
    delete tags.value[oldTagName];

    tags.value[newTagName] = notes;
  }

  function editTagNotes(tagName: string, newNotes: Note[]) {
    tags.value[tagName] = newNotes.map((note) => ({ ...note, tag: tagName }));
  }

  function addNote(tagName: string, note: Note) {
    tags.value[tagName].push(note);
  }

  function deleteNote(note: Note) {
    const index = tags.value[note.tag].findIndex((item) => item.id === note.id);

    if (index !== -1) {
      tags.value[note.tag].splice(index, 1);
    }
  }

  function editNode(note: Note) {
    const index = tags.value[note.tag].findIndex((item) => item.id === note.id);

    if (index !== -1) {
      tags.value[note.tag][index] = note;
    }
  }

  return {
    tags,
    addTag,
    deleteTag,
    editTag,
    editTagNotes,
    addNote,
    deleteNote,
    editNode,
  };
});
