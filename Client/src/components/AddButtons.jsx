import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import { PersonAdd, Plus, PlusCircle } from 'react-bootstrap-icons';
import AddClientModal from './AddClient';
import AddProjectModal from './AddProject';

const AddButtons = () => {

    const [show, setShow] = useState(false);
    const [showProject, setShowProject] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseProject = () => setShowProject(false);
    const handleShowProject = () => setShowProject(true);
  return (
      <>
          <Container className='my-4'>

               <Button variant="primary" onClick={handleShow} className='mx-2'>
                            <PersonAdd/> Add Client
                        </Button>
               <Button variant="primary" onClick={handleShowProject} className='mx-2'>
                            <PlusCircle/> Add Project
                        </Button>

      </Container>
        {show && <AddClientModal show={show} handleClose={handleClose} />}
        {showProject && <AddProjectModal show={showProject} handleClose={handleCloseProject} />}
      </>

  )
}

export default AddButtons