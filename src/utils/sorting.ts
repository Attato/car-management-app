import type { Car, SortOption } from './_types';

export function sortCars(cars: Car[], sortOrder: SortOption): Car[] {
	return [...cars].sort((a, b) => {
		switch (sortOrder) {
			case 'year-desc':
				return b.year - a.year;
			case 'year-asc':
				return a.year - b.year;
			case 'price-desc':
				return b.price - a.price;
			case 'price-asc':
				return a.price - b.price;
			default:
				return 0;
		}
	});
}
