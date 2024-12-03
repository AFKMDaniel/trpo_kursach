import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import { Note } from '@/components/note/model';

export type Tag = {
  name: string;
  notes: [Note, boolean][];
  selected: boolean;
};

export type Tags = Tag[];

export const useNotesStore = defineStore('tags', () => {
  const tags = ref<Tags>([
    {
      name: '#без_тега',
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
    {
      name: '#бэклог_игр',
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
  ]);

  const selectedNotes = computed(() => {
    const result: Note[] = [];

    tags.value.forEach((tag) =>
      tag.notes.forEach((note) => {
        if (note[1]) {
          result.push(note[0]);
        }
      })
    );

    return result;
  });

  const selectedTags = computed(() => {
    return tags.value.filter((tag) => tag.selected).map((tag) => tag.name);
  });

  const isDragEnabled = computed(() => {
    return selectedNotes.value.length === 0 && selectedTags.value.length === 0;
  });

  const notesCount = computed(() => {
    let result = 0;

    Object.values(tags.value).forEach((tags) =>
      tags.notes.forEach(() => result++)
    );

    return result;
  });

  function addTag(tagName: string) {
    tags.value.push({ name: tagName, notes: [], selected: false });
  }

  function deleteTag(tagName: string) {
    const index = tags.value.findIndex((tag) => tag.name === tagName);

    if (index !== -1) {
      tags.value.splice(index, 1);
    }
  }

  function editTag(oldTagName: string, newTagName: string) {
    const index = tags.value.findIndex((tag) => tag.name === oldTagName);

    if (index !== -1) {
      tags.value[index].name = newTagName;
      tags.value[index].notes.forEach((note) => (note[0].tag = newTagName));
    }
  }

  function editTags(newTags: Tags) {
    tags.value = newTags;
  }

  function editTagNotes(tagName: string, newNotes: [Note, boolean][]) {
    const notes = newNotes.map((note) => {
      note[0].tag = tagName;
      return note;
    });

    const index = tags.value.findIndex((tag) => tag.name === tagName);

    if (index !== -1) {
      tags.value[index].notes = notes;
    }
  }

  function addNote(note: Note) {
    const index = tags.value.findIndex((tag) => tag.name === note.tag);

    if (index !== -1) {
      tags.value[index].notes.push([note, false]);
    }
  }

  function deleteNote(note: Note) {
    const tagIndex = tags.value.findIndex((tag) => tag.name === note.tag);

    if (tagIndex !== -1) {
      const index = tags.value[tagIndex].notes.findIndex(
        (item) => item[0].id === note.id
      );

      if (index !== -1) {
        tags.value[tagIndex].notes.splice(index, 1);
      }
    }
  }

  function editNote(note: Note) {
    const tagIndex = tags.value.findIndex((tag) => tag.name === note.tag);

    if (tagIndex !== -1) {
      const index = tags.value[tagIndex].notes.findIndex(
        (item) => item[0].id === note.id
      );

      if (index !== -1) {
        tags.value[tagIndex].notes[index][0] = note;
      }
    }
  }

  function selectNote(note: Note) {
    const tagIndex = tags.value.findIndex((tag) => tag.name === note.tag);

    if (tagIndex !== -1) {
      const index = tags.value[tagIndex].notes.findIndex(
        (item) => item[0].id === note.id
      );

      if (index !== -1) {
        tags.value[tagIndex].notes[index][1] = true;
      }
    }
  }

  function unselectNote(note: Note) {
    const tagIndex = tags.value.findIndex((tag) => tag.name === note.tag);

    if (tagIndex !== -1) {
      const index = tags.value[tagIndex].notes.findIndex(
        (item) => item[0].id === note.id
      );

      if (index !== -1) {
        tags.value[tagIndex].notes[index][1] = false;
      }
    }
  }

  function clearSelection() {
    tags.value.map((tag) => {
      tag.selected = false;
      tag.notes.map((note) => {
        note[1] = false;
        return note;
      });
      return tag;
    });
  }

  function selectTag(tagName: string) {
    const tagIndex = tags.value.findIndex((tag) => tag.name === tagName);

    if (tagIndex !== -1) {
      tags.value[tagIndex].selected = true;
    }
  }

  function unselectTag(tagName: string) {
    const tagIndex = tags.value.findIndex((tag) => tag.name === tagName);

    if (tagIndex !== -1) {
      tags.value[tagIndex].selected = false;
    }
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
