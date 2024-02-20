import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBTfgawXYUr0MmPXTeZXSvac6WFexOug_w',
	authDomain: 'todo-list-304bf.firebaseapp.com',
	projectId: 'todo-list-304bf',
	storageBucket: 'todo-list-304bf.appspot.com',
	messagingSenderId: '348307423653',
	appId: '1:348307423653:web:0458ac14dd6c2278fea84c',
	databaseURL: 'https://todo-list-304bf-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
