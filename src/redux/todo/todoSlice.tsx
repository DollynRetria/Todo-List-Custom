'use client';
import { createSlice } from "@reduxjs/toolkit";


//let lists = JSON.parse(localStorage.getItem('lists'));

let lists: object[];
const listsJSON = localStorage.getItem('lists');
if(listsJSON !== null){
    lists = JSON.parse(listsJSON);
}else{
    lists = [];
}

const initialState: {
    todos: object[];
} = {
    todos: lists
}

export const todoSlice = createSlice({
    name: "todos",
    initialState, 
    reducers: {
        addTodoItem: (state, action) => {
            const todoItem = [...state.todos, action.payload];
            localStorage.setItem('lists', JSON.stringify(todoItem));
            state.todos = todoItem;
        },
        removeTodoItem: (state, action) => {
            const _index = state.todos.findIndex(element => element.id === action.payload);
            state.todos.splice(_index, 1);
            localStorage.setItem('lists', JSON.stringify(state.todos));
        }, 
        updateTodoItem: (state, action) => {
            const _updated = state.todos.map(item => {
                if(item.id === action.payload.id)   {
                    return {
                        ...item, 
                        title: action.payload.title, 
                        description: action.payload.description, 
                        statut: action.payload.statut, 
                        priority: action.payload.priority, 
                        achieved: action.payload.achieved, 
                        debut: action.payload.debut, 
                        fin: action.payload.fin
                    }
                }
                return item;
            });
            
            localStorage.setItem('lists', JSON.stringify(_updated));
            state.todos = _updated;
        }
    }
})

export const { addTodoItem, removeTodoItem, updateTodoItem } = todoSlice.actions;

export default todoSlice.reducer;