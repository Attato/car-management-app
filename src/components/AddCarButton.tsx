import { memo } from 'react';
import { Plus } from 'lucide-react';

interface AddButtonProps {
	onClick: () => void;
}

export const AddCarButton = memo(({ onClick }: AddButtonProps) => {
	return (
		<button
			onClick={onClick}
			className="p-3 bg-white rounded flex items-center gap-2 cursor-pointer"
		>
			<Plus size={16} />
		</button>
	);
});
