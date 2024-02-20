import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ, faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRequestAddTask, useRequestDeleteTask, useRequestGetTasks, useRequestUpdateTask } from './hooks';
// import debounce from 'lodash/debounce';

function App() {

	const [taskText, setTaskText] = useState('');
	const [error, setError] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [sortedTodos, setSortedTodos] = useState([]);
	const [isSorting, setIsSorting] = useState(false);

	const { isLoading, todos } = useRequestGetTasks();
	const { requestAddTask, isCreating } = useRequestAddTask(todos, setError);
	const { isDeleting, requestDeleteTask } = useRequestDeleteTask();
	const {
		isEditing,
		editingTaskId,
		requestUpdateTask,
		setIsEditing,
		setEditingTaskId,
	} = useRequestUpdateTask(todos, taskText, setTaskText, setError, error);

	const handleEditTask = (id, title) => {
		setIsEditing(true);
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

	const onChange = ({ target }) => {
		setTaskText(target.value);
		setError('');
		setIsSorting(false);
		setSearchQuery('');
	};

	const toggleSearch = () => {
		setShowSearch(!showSearch);
	};

	const onChangeSearch = ({ target }) => {
		setIsSorting(false);
		const query = target.value.toLowerCase();
		setSearchQuery(query);
		const filtered = Object.entries(todos).filter(([id, { title }]) =>
			title.toLowerCase().includes(query)
		);
		setFilteredTasks(filtered);
	};

	useEffect(() => {
		const filtered = Object.entries(todos).filter(([id, { title }]) =>
			title.toLowerCase().includes(searchQuery)
		);
		setFilteredTasks(filtered);
	}, [searchQuery, todos]);

	const handleSortClick = () => {
		setIsSorting(true);
		const sortedTodos = Object.entries(todos).sort(([, a], [, b]) => a.title.localeCompare(b.title));
		setFilteredTasks(sortedTodos);
		setSortedTodos(sortedTodos);
	};

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Список задач</h1>
				</div>
				{error && <div className={styles.error}>{error}</div>}
				<ul className={styles.taskList}>
					{isLoading
						? <div className={styles.loader}></div>
						: filteredTasks.map(([id, { title }]) => (
							<li key={id} className={styles.task}>
								<p>{title}</p>
								<button className={styles.btn} onClick={() => handleEditTask(id, title)}>
									<FontAwesomeIcon icon={faPenToSquare} />
								</button>
								<button className={styles.btn} disabled={isDeleting}
										onClick={() => requestDeleteTask(id)}>
									Удалить
								</button>
							</li>
						))
					}
				</ul>
				{showSearch && (
					<div className={styles.search}>
						<input
							type="text"
							value={searchQuery}
							onChange={onChangeSearch}
							placeholder="Поиск"
							className={styles.input}
						/>
					</div>
				)}
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
						<FontAwesomeIcon icon={faPenToSquare} /> : '+'}</button>
					<button className={styles.btn} onClick={toggleSearch}><FontAwesomeIcon
						icon={faMagnifyingGlass} /></button>
					<button className={styles.btn} onClick={handleSortClick}><FontAwesomeIcon
						icon={faArrowDownAZ} /></button>
				</div>
			</div>
		</div>
	);
}

export default App;
