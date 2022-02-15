import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL_API = process.env.REACT_APP_API_URL;
function MyVerticallyCenteredModal(props) {
  const { onHide, todoid, showbtn } = props;
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const notify = () => toast("Todo Added Successfully");

  const todo = {
    title: title,
    content: content,
  };

  const submitTodos = async e => {
    e.preventDefault();
    try {
      const data = await fetch(URL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const response = await data.json();
      onHide();
      window.location.reload();
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodos = async e => {
    console.log(todoid);
    e.preventDefault();
    try {
      const data = await fetch(`${URL_API}/${todoid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      const response = await data.json();
      
      onHide();
      window.location.reload();
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                type='text'
                placeholder='Add Title'
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={content}
                type='text'
                placeholder='Description'
                onChange={e => setContent(e.target.value)}
              />
            </Form.Group>

            <Button
              className={
                showbtn
                  ? "d-none"
                  : "w-50 d-flex mx-auto justify-content-center"
              }
              variant='primary'
              type='submit'
              onClick={submitTodos}
            >
              Submit
            </Button>
            <Button
               className={showbtn ? "w-50 d-flex mx-auto justify-content-center" : "d-none"} 
              variant='success'
              onClick={updateTodos}
            >
              Edit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}
export const AddTodoModal = ({ modalShow, closeModal, todoId, showBtn }) => {
  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={closeModal}
        todoid={todoId}
        showbtn={showBtn}
      />
    </>
  );
};
