import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { EyeFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const Project = ({ project }) => {
    const navigate = useNavigate()
    return (
        <Card>

            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{project.name}</Card.Title>

                        <Card.Subtitle>
                            {project.status}
                        </Card.Subtitle>
                    </Col>
                    <Col style={{ textAlign: 'right' }}>
                        <Button variant="info" onClick={()=>{navigate(`/projects/${project.id}`)}}><EyeFill/> View</Button>
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    )
}

export default Project