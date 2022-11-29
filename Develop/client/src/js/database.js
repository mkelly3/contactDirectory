// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => 
    openDB('todosDB', 1, {
        upgrade(db) {
            if(db.objectStoreNames.contains('todosDB')) {
                console.log('todos database already exists');
                return;
            }
            db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true })
            console.log('todos database created');
        },
    });

// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    console.log('Post to the webpage');
    const todosDb = await openDB('todosDB', 1);
    const tx = todosDb.transaction('todos', 'readwrite');
    const store = tx.objectStore('todos');
    const request = store.add({ todo: name, home, cell, email });
    const result = await request;
    console.log('data saved to the database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    console.log("Got all Todos");
    const todosDb = await open('todosDB');
    const tx = todosDb.transaction('todos','readonly');
    const store = tx.objectStore('todos');
    const request = store.getAll();
    const result = await request;
    console.log(result)
    return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    const todosDB = await openDB('todosDB',1);
    const tx = todosDB.transaction('todos','readwrite');
    const store = tx.objectStore('todos');
    const request = store.delete(id);
    const result = await request;
    console.log('deleted',result);
    return result;
};

initdb();
