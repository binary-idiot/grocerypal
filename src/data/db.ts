import type { Item } from './item/item.model';
import { Dexie, type Table } from 'dexie';

const DB_NAME: string = 'grocerypal_db';

export class Database extends Dexie {

	constructor() {
		super(DB_NAME);

		this.version(2).stores({
			items: '&localId,&id,name',
		});
	}

	
}