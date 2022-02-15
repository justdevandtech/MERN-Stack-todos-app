import React from 'react'
import { Spinner } from 'react-bootstrap'

export const Loader = () => {
  return (
    <div className='d-flex mx-auto justify-content-center mt-5'>
      <Spinner animation='grow' />
    </div>
  );
}
