import type { Item } from '@/models/item.model';

import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
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
      return uuidv4();
    },
    getItemById : (state) => {
      return (id: string) => state.items.find((item) => item.localId == id)
    }
  },
  actions: {
    async loadItems() {
      const dbItems: Item[] = await db.getItems();
      this.items = dbItems;
      
      const apiItems: Item[] = await api.getItems();
      const updatedItems: Item[] = apiItems.filter(o1 => !dbItems.some(o2 => o1.localId == o2.localId && o1.itemId == o2.itemId));
      const deletedItems: Item[] = dbItems.filter(o1 => o1.itemId != null && !apiItems.some(o2 => o1.localId == o2.localId));

      if (updatedItems.length > 0) {
        await db.putItems(updatedItems);
      }

      if (deletedItems.length > 0) {
        await db.deleteItems(deletedItems.map(o => o.localId));
      }

      this.items = await db.getItems();
    },

    async addItem(name: string) {
      const item: Item = {localId: this.nextId, name};

      item.itemId = await api.postItem(item);

      await db.putItem(item);
      this.items.push(item);

    },

    async deleteItem(item: Item) {
      if (item.itemId == undefined || await api.deleteItem(item.itemId)){
        await db.deleteItem(item.localId);
        this.items = this.items.filter(i => i.localId != item.localId);
      }
    }
  },
});
