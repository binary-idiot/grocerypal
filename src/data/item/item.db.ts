import type { Item } from './item.model';
import type { Table } from 'dexie';

import { Database } from '@/data/db';

export class ItemDB {
	private items: Table<Item, string>;

	constructor() {
		this.items = new Database().table('items');
	}

	async getItems(): Promise<Item[]> {
		return await this.items.toArray();
	}

	async putItem(item: Item) {
		return await this.items.put(item);
	}

	async putItems(items: Item[]) {
		return await this.items.bulkPut(items);
	}

	async deleteItem(localId: string) {
		return await this.items.delete(localId);
	}

	async deleteItems(localIds: string[]) {
		return await this.items.bulkDelete(localIds);
	}
}