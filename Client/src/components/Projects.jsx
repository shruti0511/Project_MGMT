import { useQuery } from '@apollo/client';
import React from 'react'
import { GET_PROJECTS } from '../queries/projectQueries';
import Loader from "./Loader";
import Project from './Project';
import { Col, Container, Row } from 'react-bootstrap';


const Projects = () => {

    const { data, loading, error } = useQuery(GET_PROJECTS)
    if (loading) return <Loader />
    if (error) return <>error...</>

    return (
        <Container>
            <Row className='my-3'>
                {
                    !loading && !error && data.projects.length > 0 &&
                    data.projects.map((project, index) => {
                        return (
                            <Col md={4} className='p-2'>
                                <Project key={index} project={project} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default Projects