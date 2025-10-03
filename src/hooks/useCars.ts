import { useEffect, useState, useCallback, useMemo } from 'react';

import type { Car, SortOption } from '../utils/_types';
import { API_URL, DEFAULT_COORDINATES } from '../utils/_constants';
import { sortCars } from '../utils/sorting';

import { v4 as uuidv4 } from 'uuid';

export function useCars() {
	const [cars, setCars] = useState<Car[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [sortOrder, setSortOrder] = useState<SortOption>('year-desc');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentCar, setCurrentCar] = useState<Car | null>(null);

	const fetchCars = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await fetch(API_URL);
			if (!res.ok) throw new Error('Ошибка загрузки');
			const data: Car[] = await res.json();
			setCars(data);
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCars();
	}, [fetchCars]);

	const openAddModal = useCallback(() => {
		setCurrentCar({
			id: uuidv4(),
			name: '',
			model: '',
			year: new Date().getFullYear(),
			color: '',
			price: 0,
			...DEFAULT_COORDINATES,
		});
		setIsModalOpen(true);
	}, []);

	const openEditModal = useCallback((car: Car) => {
		setCurrentCar({ ...car });
		setIsModalOpen(true);
	}, []);

	const saveCar = useCallback(() => {
		if (!currentCar) return;

		setCars((prevCars) => {
			const carExists = prevCars.find((car) => car.id === currentCar.id);

			if (carExists) {
				return prevCars.map((car) =>
					car.id === currentCar.id ? { ...currentCar } : car
				);
			} else {
				return [...prevCars, currentCar];
			}
		});

		setIsModalOpen(false);
		setCurrentCar(null);
	}, [currentCar]);

	const deleteCar = useCallback((id: string) => {
		setCars((prevCars) => prevCars.filter((car) => car.id !== id));
	}, []);

	const sortedCars = useMemo(
		() => sortCars(cars, sortOrder),
		[cars, sortOrder]
	);

	return {
		cars: sortedCars,
		isLoading,
		sortOrder,
		setSortOrder,
		isModalOpen,
		currentCar,
		openAddModal,
		openEditModal,
		saveCar,
		deleteCar,
		setIsModalOpen,
		setCurrentCar,
	};
}
