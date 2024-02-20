import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTasks = () => {
	const [todos, setTodos] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val();

			setTodos(loadedTodos);
			setIsLoading(false);
		});
	}, []);

	return {
		isLoading,
		todos
	};
};
