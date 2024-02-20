import { useState } from "react";
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateTask = (todos, taskText, setTaskText) => {

	const [isEditing, setIsEditing] = useState(false);
	const [editingTaskId, setEditingTaskId] = useState(null);
	const requestUpdateTask = (id) => {
		const updatedTodo = todos[id];
		if (updatedTodo) {
			updatedTodo.title = taskText;

			const todosDbRef = ref(db, `todos/${id}`);

			set(todosDbRef, {
				title: taskText
			})
				.then(() => {
					setEditingTaskId(null);
				})
				.finally(() => {
					setTaskText('');
					setIsEditing(false);
				});
		}
	};
	return {
		taskText,
		isEditing,
		editingTaskId,
		requestUpdateTask,
		setIsEditing,
		setEditingTaskId,
		setTaskText,
	};
};
