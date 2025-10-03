import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';

import { FORM_FIELDS } from '../utils/_constants';
import type { Car } from '../utils/_types';

interface Props {
	car: Car;
	setCar: Dispatch<SetStateAction<Car | null>>;
	onClose: () => void;
	onSubmit: () => void;
	editing?: boolean;
}

export default function CarFormModal({
	car,
	setCar,
	onClose,
	onSubmit,
	editing = false,
}: Props) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				if (!window.getSelection()?.toString()) {
					onClose();
				}
			}
		};

		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	return (
		<div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[1000]">
			<div
				ref={modalRef}
				className="bg-white p-4 rounded-lg shadow-lg max-w-xl w-full relative z-[1001]"
			>
				<h2 className="font-semibold mb-2">
					{editing ? 'Редактировать машину' : 'Добавить машину'}
				</h2>

				<div className="flex flex-col gap-3">
					{FORM_FIELDS.map((field) => (
						<div key={field.key} className="flex flex-col">
							<label htmlFor={field.key} className="text-sm font-medium mb-1">
								{field.label}
							</label>

							<input
								id={field.key}
								name={field.key}
								type={field.type}
								placeholder={field.placeholder}
								autoComplete={'off'}
								value={car[field.key as keyof typeof car] ?? ''}
								onChange={(e) =>
									setCar({
										...car,
										[field.key]:
											field.type === 'number'
												? Number(e.target.value)
												: e.target.value,
									})
								}
								className="px-2 py-1 border border-black/20 rounded-md"
							/>
						</div>
					))}
				</div>

				<div className="flex justify-between gap-2 mt-4">
					<button
						onClick={onSubmit}
						className="w-full px-3 py-1 bg-[#2b82cb] hover:bg-[#2b82cb]/95 text-white rounded-md cursor-pointer"
					>
						{editing ? 'Сохранить' : 'Добавить'}
					</button>

					<button
						onClick={onClose}
						className="w-full px-3 py-1 bg-black/5 hover:bg-black/7 border border-black/7 rounded-md cursor-pointer"
					>
						Отмена
					</button>
				</div>
			</div>
		</div>
	);
}
