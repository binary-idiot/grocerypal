import type { Item } from '@/models/item.model';

import { defineStore } from 'pinia';
import { Database } from '@/helpers/db';

const db: Database = new Database();
export const useItemStore = defineStore({
  id: "items",
  state: () => {
   return {
     items: [] as Item[],
   }
  },
  getters: {
    nextId(): string {
      return `local-${this.items.length}`
    },
    getItemById : (state) => {
      return (id: string) => state.items.find((item) => item.id == id)
    }
  },
  actions: {
    async loadItems() {
      const items = await db.getItems();
      this.items = items;
    },

    async addToList(name: string) {
      const id: string = this.nextId;
      const item: Item = {id, name};

      await db.putItem(item);
      this.items.push({ id, name });
    },

    async deleteFromList(id: string) {
      await db.deleteItem(id);
      this.items = this.items.filter(i => i.id != id);
    }
  },
});
