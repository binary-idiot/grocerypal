import type { Item } from '@/data/item/item.model';

import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { ItemDB } from '@/data/item/item.db'; 
import { ItemAPI } from '@/data/item/item.api';

const itemDB: ItemDB = new ItemDB();
const itemAPI: ItemAPI = new ItemAPI();
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
      const dbItems: Item[] = await itemDB.getItems();
      this.items = dbItems;
      
      const apiItems: Item[] = await itemAPI.getItems();
      const updatedItems: Item[] = apiItems.filter(o1 => !dbItems.some(o2 => o1.localId == o2.localId && o1.id == o2.id));
      const deletedItems: Item[] = dbItems.filter(o1 => o1.id != null && !apiItems.some(o2 => o1.localId == o2.localId));

      if (updatedItems.length > 0) {
        await itemDB.putItems(updatedItems);
      }

      if (deletedItems.length > 0) {
        await itemDB.deleteItems(deletedItems.map(o => o.localId));
      }

      this.items = await itemDB.getItems();
    },

    async addItem(name: string) {
      const item: Item = {localId: this.nextId, name};

      item.id = await itemAPI.postItem(item);

      await itemDB.putItem(item);
      this.items.push(item);

    },

    async deleteItem(item: Item) {
      if (item.id == undefined || await itemAPI.deleteItem(item.id)){
        await itemDB.deleteItem(item.localId);
        this.items = this.items.filter(i => i.localId != item.localId);
      }
    }
  },
});
