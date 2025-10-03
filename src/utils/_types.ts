export interface Car {
	id: string;
	name: string;
	model: string;
	year: number;
	color: string;
	price: number;
	latitude: number;
	longitude: number;
}

export type SortOption = 'year-desc' | 'year-asc' | 'price-desc' | 'price-asc';
