import { useQuery } from '@apollo/client';
import React from 'react'
import { Container } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom'
import { GET_PROJECT } from '../queries/projectQueries';
import ClientInfo from './ClientInfo';
import UpdateProject from './UpdateProject';
import DeleteProjectButton from './DeleteProjectButton';

const ProjectDetails = () => {
  const location = useLocation();
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_PROJECT, { variables: { id: id } })


  if (loading) return <>loading</>
  if (error) return <>error</>
  return (
    <Container>
      <h1>{data.project.name}</h1>
      <p>{data.project.description}</p>

      <h5 className='mt-3'>Project Status</h5>
      <p className='lead'>{data.project.status}</p>
      <ClientInfo client={data.project.client} />
      <UpdateProject project={data.project} />
      <DeleteProjectButton projectId={data.project.id}/>
    </Container>
  )
}

export default ProjectDetails