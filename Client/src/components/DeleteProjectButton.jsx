import { useMutation } from '@apollo/client'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { DELETE_PROJECT } from '../mutations/projectMutations'
import { useNavigate } from 'react-router-dom'

const DeleteProjectButton = ({projectId}) => {
    const navigate = useNavigate()
    const [deleteProject] = useMutation(DELETE_PROJECT,
        {
            variables: { id: projectId },
            onCompleted: () => navigate('/'),
    //refetchQueries: [{ query: GET_PROJECTS }],
        });



    return (
        <Button variant="danger"  className='my-2' onClick={deleteProject}>
            <Trash/> Delete Project
        </Button>
    )
}

export default DeleteProjectButton