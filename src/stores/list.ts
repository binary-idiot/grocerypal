import type { Item } from '@/models/item.model';

import { defineStore } from 'pinia';

export const useListStore = defineStore({
  id: "list",
  state: () => {
   return {
     list: [] as Item[],
   }
  },
  getters: {
    nextId(): string{
      return `local-${this.list.length}`
    },
    getItemById : (state) => {
      return (id: string) => state.list.find((item) => item.id == id)
    }
  },
  actions: {
    addToList(name: string) {
      const id: string = this.nextId;
      this.list.push({ id, name });
    },
  },
});
