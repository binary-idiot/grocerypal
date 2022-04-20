import type { BaseModel } from "./base.model";

export interface Item extends BaseModel{
	itemId?: string;
	name: string;
}