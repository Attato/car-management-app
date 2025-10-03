import { useState, useCallback, useMemo, memo } from 'react';

import { SORT_LABELS } from '../utils/_constants';
import type { SortOption } from '../utils/_types';

import { ArrowDownUp } from 'lucide-react';

interface Props {
	sortOrder: SortOption;
	setSortOrder: (order: SortOption) => void;
}

export const SortDropdown = memo(({ sortOrder, setSortOrder }: Props) => {
	const [open, setOpen] = useState(false);

	const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);
	const handleSelect = useCallback(
		(key: SortOption) => {
			setSortOrder(key);
			setOpen(false);
		},
		[setSortOrder]
	);

	const options = useMemo(
		() =>
			Object.entries(SORT_LABELS).map(([key, label]) => ({
				key: key as SortOption,
				label,
			})),
		[]
	);

	return (
		<div className="relative w-full">
			<button
				onClick={toggleOpen}
				className="w-full px-4 py-2 bg-white rounded flex justify-between items-center cursor-pointer"
			>
				{SORT_LABELS[sortOrder]}
				<ArrowDownUp size={16} />
			</button>

			{open && (
				<div className="absolute left-0 right-0 mt-1 bg-white rounded shadow z-20">
					{options.map((option) => (
						<div
							key={option.key}
							onClick={() => handleSelect(option.key)}
							className="px-4 py-2 hover:bg-[#f7f7f7] cursor-pointer"
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
});
