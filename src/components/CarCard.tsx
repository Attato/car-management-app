import { memo } from 'react';

import type { Car } from '../utils/_types';

import { X } from 'lucide-react';

interface Props {
	car: Car;
	onEdit: (car: Car) => void;
	onDelete: (id: string) => void;
}

export const CarCard = memo(({ car, onEdit, onDelete }: Props) => {
	return (
		<div
			className="flex flex-col bg-white hover:bg-[#f7f7f7] p-2 rounded cursor-pointer mr-2"
			onClick={() => onEdit(car)}
		>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<strong>
						{car.name} {car.model} ({car.year})
					</strong>
					<div
						className="w-4 h-4 rounded-full"
						style={{ backgroundColor: car.color }}
					/>
				</div>

				<button
					onClick={(e) => {
						e.stopPropagation();
						onDelete(car.id);
					}}
					className="max-w-[32px] p-2 bg-black/5 text-black/65 border border-black/7 rounded cursor-pointer"
				>
					<X size={14} />
				</button>
			</div>

			<span>${car.price} USD</span>

			<span>
				Координаты: {car.latitude}, {car.longitude}
			</span>
		</div>
	);
});
