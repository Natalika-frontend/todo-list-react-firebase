import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTask = (todos, taskText, setTaskText) => {
	const [isCreating, setIsCreating] = useState(false);
	const [error, setError] = useState('');

	const todosDbRef = ref(db, 'todos');

	const requestAddTask = (taskText) => {
		setIsCreating(true);
		// setIsSearching(false);

		const isDuplicateTask = Object.entries(todos).some(([id, todo]) =>
			todo.title.toLowerCase() === taskText.trim().toLowerCase(),
		);

		if (isDuplicateTask) {
			setError('Задача уже существует');
			setIsCreating(false);
			return;
		}

		push(todosDbRef, {
			title: taskText,
		})
			.catch(() => {
				setError('Ошибка при добавлении задачи');
			})
			.finally(() => {
				setIsCreating(false);
			});
	};
	return { isCreating, error, requestAddTask };
};
