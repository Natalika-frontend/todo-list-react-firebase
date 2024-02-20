import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTask = (todos, setError) => {
	const [isCreating, setIsCreating] = useState(false);

	const todosDbRef = ref(db, 'todos');

	const requestAddTask = (taskText) => {
		setIsCreating(true);

		push(todosDbRef, {
			title: taskText,
		})
			.catch(() => {
				setError('Ошибка при добавлении задачи');
			})
			.finally(() => {
				setIsCreating(false);
			});

		if (todos && Object.keys(todos).length > 0) {
			const isDuplicateTask = Object.entries(todos).some(([id, todo]) =>
				todo.title.toLowerCase() === taskText.trim().toLowerCase(),
			);

			if (isDuplicateTask) {
				setError('Задача уже существует');
				setIsCreating(false);
				return;
			}
		} else {
			return;
		}

	};
	return { requestAddTask, setError, isCreating };
};
