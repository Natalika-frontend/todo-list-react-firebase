import { useState } from "react";
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTask = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const requestDeleteTask = (id) => {
		setIsDeleting(true);

		const todosDbRef = ref(db, `todos/${id}`);

		remove(todosDbRef)
			.finally(() => {
				setIsDeleting(false)
			});
	};

	return {
		isDeleting,
		requestDeleteTask,
	};
};
