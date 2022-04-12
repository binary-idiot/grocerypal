import type { Item } from '@/models/item.model';

import { defineStore } from 'pinia';
import { DBHelper } from '@/helpers/db';
import { APIHelper } from '@/helpers/api';

const db: DBHelper = new DBHelper();
const api: APIHelper = new APIHelper();
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
      const items: Item[] = (await api.getItems()).filter(o1 => !this.items.some(o2 => o1.id == o2.id));
      if (items.length > 0) {
        await db.putItems(items);
      }

      this.items = await db.getItems();
    },

    async addItem(name: string) {
      let id: string = this.nextId;
      const item: Item = {id, name};

      id = await api.postItem(item);
      item.id = id;

      await db.putItem(item);
      this.items.push({ id, name });

    },

    async deleteItem(id: string) {
      if (await api.deleteItem(id)){
        await db.deleteItem(id);
        this.items = this.items.filter(i => i.id != id);
      }
    }
  },
});
