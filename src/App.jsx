import styles from './App.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ, faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRequestAddTask, useRequestDeleteTask, useRequestGetTasks, useRequestUpdateTask } from './hooks';

function App() {

	const [taskText, setTaskText] = useState('');

	const { isLoading, todos } = useRequestGetTasks();
	const { requestAddTask, isCreating, error: addTaskError } = useRequestAddTask(todos, taskText, setTaskText);
	const { isDeleting, requestDeleteTask } = useRequestDeleteTask();
	const { isEditing, editingTaskId, requestUpdateTask, setIsEditing, setEditingTaskId } = useRequestUpdateTask( todos, taskText, setTaskText);

	const handleEditTask = (id, title) => {
		setIsEditing(true)
		setEditingTaskId(id);
		setTaskText(title);
	};

	const handleAddButtonClick = () => {
		if (taskText.trim() !== '') {
			if (editingTaskId !== null) {
				requestUpdateTask(editingTaskId);
			} else {
				requestAddTask(taskText);
			}
			setTaskText('');
		}
	};

	const onChange = ({target}) => {
		setTaskText(target.value);
	};

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Список задач</h1>
				</div>
				{addTaskError && <div className={styles.error}>Такая задача уже есть</div>}
				<ul className={styles.taskList}>
					{isLoading
						? <div className={styles.loader}></div>
						: (todos)
							? Object.entries(todos).map(([id, { title }]) => (
								<li key={id} className={styles.task}>
									<p>{title}</p>
									<button className={styles.btn} onClick={() => handleEditTask(id, title)}>
										<FontAwesomeIcon icon={faPenToSquare} />
									</button>
									<button className={styles.btn} disabled={isDeleting} onClick={() => requestDeleteTask(id)}>
										Удалить
									</button>
								</li>
							))
							: (todos && Object.entries(todos).map(([id, { title }]) => (
								<li key={id} className={styles.task}>
									<p>{title}</p>
									<button className={styles.btn} onClick={() => handleEditTask(id, title)}>
										<FontAwesomeIcon icon={faPenToSquare} />
									</button>
									<button className={styles.btn} disabled={isDeleting} onClick={() => requestDeleteTask(id)}>
										Удалить
									</button>
								</li>
							)))
					}
				</ul>
				<div className={styles.footer}>
					<input
						type="text"
						value={taskText}
						onChange={onChange}
						placeholder="Введите задачу"
						className={styles.input}
					/>
					<button className={styles.btn} disabled={isCreating || taskText.trim() === ''}
							onClick={handleAddButtonClick}>{isEditing ?
						<FontAwesomeIcon icon={faPenToSquare}/> : '+'}</button>
					<button className={styles.btn}><FontAwesomeIcon
						icon={faMagnifyingGlass}/></button>
					<button className={styles.btn}><FontAwesomeIcon
						icon={faArrowDownAZ}/></button>
				</div>
			</div>
		</div>
	);
}

export default App;
