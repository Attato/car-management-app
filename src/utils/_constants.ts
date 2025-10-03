import type { SortOption } from './_types';

export const API_URL = 'https://ofc-test-01.tspb.su/test-task/vehicles';

export const DEFAULT_COORDINATES = {
	latitude: 59.939032,
	longitude: 30.315827,
};

export const SORT_LABELS: Record<SortOption, string> = {
	'year-desc': 'Сначала новые',
	'year-asc': 'Сначала старые',
	'price-desc': 'Сначала дорогие',
	'price-asc': 'Сначала дешёвые',
};

export const FORM_FIELDS = [
	{
		key: 'name',
		label: 'Название',
		type: 'text',
		placeholder: 'Введите название',
	},
	{
		key: 'model',
		label: 'Модель',
		type: 'text',
		placeholder: 'Введите модель',
	},
	{
		key: 'year',
		label: 'Год выпуска',
		type: 'number',
		placeholder: 'Введите год',
	},
	{
		key: 'price',
		label: 'Цена (USD)',
		type: 'number',
		placeholder: 'Введите цену',
	},
	{ key: 'color', label: 'Цвет', type: 'text', placeholder: 'Введите цвет' },
	{
		key: 'latitude',
		label: 'Широта',
		type: 'number',
		placeholder: 'Введите широту',
	},
	{
		key: 'longitude',
		label: 'Долгота',
		type: 'number',
		placeholder: 'Введите долготу',
	},
];
