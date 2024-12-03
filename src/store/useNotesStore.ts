import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import { Note } from '@/components/note/model';

export type Tags = Record<
  string,
  {
    notes: [Note, boolean][];
    selected: boolean;
  }
>;

export const useNotesStore = defineStore('tags', () => {
  const tags = ref<Tags>({
    '#без_тега': {
      selected: false,
      notes: [
        [
          {
            id: 1,
            label: 'название',
            bgColor: '#feea3c',
            textColor: '#000000',
            content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, labore.',
            tag: '#без_тега',
          },
          false,
        ],
        [
          {
            id: 3,
            label: '3',
            bgColor: '#fe743c',
            textColor: '#000000',
            content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, labore.',
            tag: '#без_тега',
          },
          false,
        ],
      ],
    },
    '#бэклог_игр': {
      selected: false,
      notes: [
        [
          {
            id: 2,
            label: 'The binding of Isaac',
            bgColor: '#3ca0fe',
            textColor: '#000000',
            content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, labore.',
            tag: '#бэклог_игр',
          },
          false,
        ],
      ],
    },
  });

  const selectedNotes = computed(() => {
    const result: Note[] = [];

    Object.values(tags.value).forEach((tag) =>
      tag.notes.forEach((note) => {
        if (note[1]) {
          result.push(note[0]);
        }
      })
    );

    return result;
  });

  const isDragEnabled = computed(() => {
    return selectedNotes.value.length === 0;
  });

  const notesCount = computed(() => {
    let result = 0;

    Object.values(tags.value).forEach((tags) =>
      tags.notes.forEach(() => result++)
    );

    return result;
  });

  const selectedTags = computed(() => {
    return Object.entries(tags.value)
      .filter(([, { selected }]) => selected)
      .map(([key]) => key);
  });

  function addTag(tagName: string) {
    tags.value[tagName] = { notes: [], selected: false };
  }

  function deleteTag(tagName: string) {
    delete tags.value[tagName];
  }

  function editTag(oldTagName: string, newTagName: string) {
    const notes = tags.value[oldTagName];
    delete tags.value[oldTagName];

    tags.value[newTagName] = notes;
  }

  function editTags(newTags: Tags) {
    tags.value = newTags;
  }

  function editTagNotes(tagName: string, newNotes: [Note, boolean][]) {
    const notes = newNotes.map((note) => {
      note[0].tag = tagName;
      return note;
    });

    tags.value[tagName].notes = notes;
  }

  function addNote(note: Note) {
    tags.value[note.tag].notes.push([note, false]);
  }

  function deleteNote(note: Note) {
    const index = tags.value[note.tag].notes.findIndex(
      (item) => item[0].id === note.id
    );

    if (index !== -1) {
      tags.value[note.tag].notes.splice(index, 1);
    }
  }

  function editNote(note: Note) {
    const index = tags.value[note.tag].notes.findIndex(
      (item) => item[0].id === note.id
    );

    if (index !== -1) {
      tags.value[note.tag].notes[index][0] = note;
    }
  }

  function selectNote(note: Note) {
    const index = tags.value[note.tag].notes.findIndex(
      (item) => item[0].id === note.id
    );

    if (index !== -1) {
      tags.value[note.tag].notes[index][1] = true;
    }
  }

  function unselectNote(note: Note) {
    const index = tags.value[note.tag].notes.findIndex(
      (item) => item[0].id === note.id
    );

    if (index !== -1) {
      tags.value[note.tag].notes[index][1] = false;
    }
  }

  function clearSelection() {
    Object.values(tags.value).map((tag) =>
      tag.notes.map((note) => {
        note[1] = false;
        return note;
      })
    );
  }

  function selectTag(tagName: string) {
    tags.value[tagName].selected = true;
  }

  function unselectTag(tagName: string) {
    tags.value[tagName].selected = false;
  }

  return {
    tags,
    selectedNotes,
    isDragEnabled,
    notesCount,
    selectedTags,
    addTag,
    deleteTag,
    editTag,
    editTags,
    editTagNotes,
    addNote,
    deleteNote,
    editNote,
    selectNote,
    unselectNote,
    clearSelection,
    selectTag,
    unselectTag,
  };
});
