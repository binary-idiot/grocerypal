import type { Item } from '@/models/item.model';

import { defineStore } from 'pinia';
import { Database } from '@/helpers/db';

const db: Database = new Database();
const initialItems = await db.getItems()
export const useListStore = defineStore({
  id: "list",
  state: () => {
   return {
     list: (initialItems || []) as Item[],
   }
  },
  getters: {
    nextId(): string {
      return `local-${this.list.length}`
    },
    getItemById : (state) => {
      return (id: string) => state.list.find((item) => item.id == id)
    }
  },
  actions: {
    async addToList(name: string) {
      const id: string = this.nextId;
      const item: Item = {id, name};

      await db.putItem(item);
      this.list.push({ id, name });
    },
  },
});
