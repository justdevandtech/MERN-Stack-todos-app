import React from "react";
import { Button } from "react-bootstrap";
import { AddTodoModal } from "./AddTodoModal";
import { NoTodosPage } from "./NoTodosPage";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import { Loader } from "./Loader";
const URL_API = process.env.REACT_APP_API_URL;
export const Todo = ({ todos }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const closeModal = () => setModalShow(false);
  const [todoId, setTodoId] = React.useState();
  // const [loading, setLoading] = React.useState(false);
  const [showBtn, setShowBtn] = React.useState(false);
  const openModal = () => {setModalShow(true); setShowBtn(false)};

  const deleteTodo = async id => {
    try {
      const data = await fetch(`${URL_API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.status === 200) {
        toast.success("Todo Deleted Successfully");
        window.location.reload();
      } else {
        toast.error("Todo Deletion Failed");
      }
      const response = await data.text();
      console.log(response);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (id, title, content) => {
    setModalShow(true);
    setTodoId(id);
    setShowBtn(true);
  }

  const todosData = todos.map((todo, index) => {
    const { _id, title, content } = todo;
    return (
      <div
        key={_id}
        className='bg-white shadow p-2 mt-3 d-flex justify-content-between col-lg-8 col-md-12 mx-auto rounded'
      >
        <div>
          <article>
            <h3 className="m-0">{title}</h3>
            <p>{content}</p>
          </article>
        </div>
        <div>
          <Button
            className='me-2'
            variant='outline-primary'
            size='sm'
            onClick={() => handleEdit(_id, title, content)}
          >
            <FaEdit />
          </Button>
          <Button variant='danger' size='sm' onClick={() => deleteTodo(_id)}>
            <BsFillTrashFill />
          </Button>
        </div>
      </div>
    );
  });
  
  return (
    <>
      <Button
        className='d-flex mx-auto shadow'
        variant='primary'
        onClick={openModal}
      >
        Add Todos
      </Button>
      <hr />
      {todosData.length > 0 ? todosData : <NoTodosPage />}
      <AddTodoModal
        modalShow={modalShow}
        closeModal={closeModal}
        todoId={todoId}
        showBtn={showBtn}
      />
      <ToastContainer />
    </>
  );
};
