import React, { useReducer, useContext } from "react";
import { Alert } from 'react-native';

import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, SHOW_LOADER, HIDE_LOADER, CLEAR_ERROR, SHOW_ERROR, FETCH_TODOS } from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  };
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const showLoader = () => dispatch({type: SHOW_LOADER});
  const hideLoader = () => dispatch({type: HIDE_LOADER});
  const showError = error => dispatch({type: SHOW_ERROR, error});
  const clearError = () => dispatch({type: CLEAR_ERROR});

  const addTodo = async title => {
    clearError()
    try {
      const data = await Http.post({title});
      console.log(data);
      
      dispatch({ type: ADD_TODO, title, id: data.name })
      
    } catch (e) {
      showError('Տեղի է ունեցել սխալ տվյալներ ստանալիս․․․');
      console.log(e);
    }
  };

  const removeTodo = id => { 
    const todo = state.todos.find(t => t.id === id);
    Alert.alert(
      'Գործի ջնջում',
      'Դուք համոզվա՞ծ եք որ ուզում եք ջնջել "' + todo.title + '" գործը։',
      [
        {
          text: "Չեղարկել",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Հաստատել",
          onPress:async () => {
            try {
              changeScreen(null);
              await Http.delete(id);
            
              dispatch({ type: REMOVE_TODO, id })
              
            } catch (e) {
              showError('Տեղի է ունեցել սխալ տվյալներ ստանալիս․․․');
              console.log(e);
            }
          }
        }
      ],
      { cancelable: false }
    );
    
  };

  const fetchTodo = async () => {
    showLoader();
    clearError();
   try {
      const data = await Http.get();
      
      const todos = Object.keys(data).map(key => ({...data[key], id: key}))
      dispatch({type: FETCH_TODOS, todos});
   } catch (e) {
      showError('Տեղի է ունեցել սխալ տվյալներ ստանալիս․․․');
      console.log(e);
     
   } finally  {
      hideLoader();
   }
  }

  const updateTodo = async (id, title) => {
    clearError();
   try {
    await Http.patch(id, {title})
    dispatch({ type: UPDATE_TODO, title, id } );
     
   } catch (e) {
      showError('Տեղի է ունեցել սխալ տվյալներ ստանալիս․․․');
      console.log(e);
    
    } finally  {
        hideLoader();
    }
  }
 

  

  return (
    <TodoContext.Provider value={{ 
      todos: state.todos,
      fetchTodo,
      loading: state.loading,
      error: state.error,
      addTodo,
      removeTodo,
      updateTodo
      }}>
      {children}
    </TodoContext.Provider>
  );
};
