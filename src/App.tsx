import MapView from './components/MapView';
import { SortDropdown } from './components/SortDropdown';
import CarFormModal from './components/CarFormModal';
import { useCars } from './hooks/useCars';
import { AddCarButton } from './components/AddCarButton';
import { CarCard } from './components/CarCard';

function App() {
	const {
		cars,
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
	} = useCars();

	return (
		<main className="flex h-screen w-full">
			<MapView cars={cars} />

			<div className="flex flex-col gap-2 max-w-2xl w-full p-2 relative">
				<div className="flex items-center gap-2">
					<SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
					<AddCarButton onClick={openAddModal} />
				</div>

				{isModalOpen && currentCar && (
					<CarFormModal
						car={currentCar}
						setCar={setCurrentCar}
						onClose={() => setIsModalOpen(false)}
						onSubmit={saveCar}
						editing={cars.some((carInList) => carInList.id === currentCar.id)}
					/>
				)}

				{isLoading ? (
					<p>Загрузка...</p>
				) : (
					<div className="flex flex-col gap-2 max-h-[calc(100vh-64px)] overflow-auto">
						{cars.map((car) => (
							<CarCard
								key={car.id}
								car={car}
								onEdit={openEditModal}
								onDelete={deleteCar}
							/>
						))}
					</div>
				)}
			</div>
		</main>
	);
}

export default App;
