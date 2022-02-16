import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL_API = process.env.REACT_APP_API_URL;
function MyVerticallyCenteredModal(props) {
  const { onHide, todoid, showbtn } = props;
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [showLoading, setShowLoading] = React.useState(false);

  // validate form
  const validateForm = () => {
    if (title.length === 0 || content.length === 0) {
      return false;
    }
    return true;
  };

  const todo = {
    title: title,
    content: content,
  };

  const submitTodos = async e => {
    e.preventDefault();
    if (validateForm()) {
      setShowLoading(true);
      try {
        const data = await fetch(`${URL_API}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        });
        if (data.status === 201) {
          toast.success("Todo Added Successfully");
          window.location.reload();
        } else {
          toast.error("Todo Adding Failed");
          setShowLoading(false);
        }
        const response = await data.text();
        console.log(response);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error("Please Fill All Fields");
    }
  };

  const updateTodos = async e => {
    console.log(todoid);
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const data = await fetch(`${URL_API}/${todoid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(todo),
        });
        const response = await data.json();
        if (data.status === 200) {
          toast.success("Todo Updated Successfully");
          onHide();
          window.location.reload();
        } else {
          toast.error("Todo Updation Failed");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Todo Updation Failed. Please fill all the fields");
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
              {showLoading ? "Loading..." : "Add Todo"}
            </Button>
            <Button
               className={showbtn ? "w-50 d-flex mx-auto justify-content-center" : "d-none"} 
              variant='success'
              onClick={updateTodos}
            >
              {showLoading ? "Loading..." : "Update Todo"}
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
