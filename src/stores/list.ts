import { defineStore } from 'pinia';
import type { Item } from '@/models/item.model';

export const useListStore = defineStore({
  id: "list",
  state: () => {
   return {
     list: [] as Item[],
   }
  },
  actions: {
    addToList(name: string) {
      this.list.push({ name });
    },
  },
});
