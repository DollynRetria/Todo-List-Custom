'use client';
import { EnhancedStore, Reducer, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction, configureStore } from "@reduxjs/toolkit";
import  todoSlice  from "./todo/todoSlice";
import { combineReducers } from "@reduxjs/toolkit";


export const reducer: Reducer<{
    todoSlice: {
        todos: object[];
    };
}, UnknownAction, Partial<{
    todoSlice: {
        todos: object[];
    };
}>> = combineReducers({
    todoSlice: todoSlice
})

export const store: EnhancedStore<any, UnknownAction, Tuple<[StoreEnhancer<{
    dispatch: ThunkDispatch<any, undefined, UnknownAction>;
}>, StoreEnhancer]>> = configureStore({
    reducer
});