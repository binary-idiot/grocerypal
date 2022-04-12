
import type { Item } from '@/models/item.model'

const _API: string = import.meta.env.VITE_API_BASE_URL;
export class APIHelper { 

	async getItems(): Promise<Item[]> {
		const response = await fetch(`${_API}/items`);
		
		if (!response.ok) {
			throw new Error(`An error has occured: ${response.status}`);
		}

		const items: Item[] = await response.json();
		return Promise.resolve(items);
	}

	async postItem(item: Item): Promise<string> {
		const response = await fetch(`${_API}/items`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(item)
			});
		
		if (!response.ok) {
			throw new Error(`An error has occured: ${response.status}`);
		}

		return await response.json();
	}

	async deleteItem(id: string): Promise<boolean> {
		const response = await fetch(`${_API}/items/${id}`, 
			{
				method: 'DELETE'
			});

		if (response.status == 404){
			return Promise.resolve(false);
		}

		return Promise.resolve(true);
	}
}