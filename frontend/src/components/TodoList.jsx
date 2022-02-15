import React, { useEffect } from 'react'
import { Todo } from './Todo'
import { Loader } from "./Loader";

export const TodoList = () => {
    const [todos, setTodos] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const queryTodos = async () => {
        try {
            const data = await fetch(process.env.REACT_APP_API_URL);
            const response = await data.json();
            setTodos( response );
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
       setLoading(true);
       queryTodos();
       setTimeout(() => {
         setLoading(false);
       }, 1000);
    }, []);

  if (loading) {
    return <Loader />;
  }
  return (
      <div className='mt-4'>
        <Todo todos={todos} />
      </div>
  )
}
