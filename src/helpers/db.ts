import type { Item } from '@/models/item.model'
import { Dexie, type Table } from 'dexie';

const DB_NAME: string = 'shoppingcart_db';

export class Database extends Dexie {

	items: Table<Item, string>;

	constructor() {
		super(DB_NAME);

		this.version(1).stores({
			items: '&id,name',
		});

		this.items = this.table('items');
	}

	async getItems(): Promise<Item[]> {
		return await this.items.toArray();
	}

	async putItem(item: Item) {
		return await this.items.put(item);
	}

	async deleteItem(id: string) {
		return await this.items.delete(id);
	}
}