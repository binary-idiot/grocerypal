import type { Item } from '@/models/item.model'
import { Dexie, type Table } from 'dexie';

const DB_NAME: string = 'grocerypal_db';

export class DBHelper extends Dexie {

	items: Table<Item, string>;

	constructor() {
		super(DB_NAME);

		this.version(1).stores({
			items: '&localId,&id,name',
		});

		this.items = this.table('items');
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