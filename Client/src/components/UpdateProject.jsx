import { Formik } from 'formik';
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';

import { STATUS } from '../config';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CLIENT_DROPDOWN } from '../queries/clientQueries';
import { UPDATE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECT } from '../queries/projectQueries';
import DeleteProjectButton from './DeleteProjectButton';

const UpdateProject = ({ project }) => {

    const project_status = Object.keys(STATUS).filter(function (key) { return STATUS[key] === project.status })[0]
    const validation = Yup.object().shape({
        name: Yup.string().required('Project name is Required'),
        description: Yup.string().required('Project description is Required'),
        clientId: Yup.string().required('client is Required'),

    })
    const { data, loading, error } = useQuery(GET_CLIENT_DROPDOWN);
    const [updateProject] = useMutation(UPDATE_PROJECT)
    return (

        <Card className='my-4 p-4'>

            <Card.Body>
                <h3>Update Project</h3>
                <Formik

                    initialValues={{ name: project.name, description: project.description, clientId: project.client.id, status:project_status }}
                    validationSchema={validation}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        const { name, description, status } = values;

                        updateProject({
                            variables: { name, description, id: project.id, status },
                            refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
                        }).then(() => {
                            console.log('success');
                        })
                            .catch((err) => {
                                console.error('Error adding todo:', err);
                            });
                    }}
                >

                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting
                    }) => (

                        <form onSubmit={handleSubmit}>


                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Project Name"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                {errors.name && touched.name ? (
                                    <Form.Text style={{ color: 'red' }}>
                                        {errors.name}
                                    </Form.Text>) : null}
                            </Form.Group>



                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Project Description</Form.Label>
                                <Form.Control
                                    as="textarea" rows={3}
                                    type="text"
                                    placeholder="Enter Description"
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                {errors.description && touched.description ? (
                                    <Form.Text style={{ color: 'red' }}>
                                        {errors.description}
                                    </Form.Text>) : null}
                            </Form.Group>

                            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Client</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="clientId"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.clientId}
                                    >
                                        <option value="">----Select Client----</option>

                                        {
                                            !loading && !error && data.clients.length > 0 && data.clients.map((client, index) => {
                                                return <option value={client.id} key={index}>{client.name}</option>
                                            })
                                        }


                                    </Form.Select>
                                    {errors.clientId && touched.clientId ? (
                                        <Form.Text style={{ color: 'red' }}>
                                            {errors.clientId}
                                        </Form.Text>) : null}
                                </Form.Group> */}

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Project Status</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="status"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.status}
                                >
                                    {
                                        Object.keys(STATUS).map((key) => {
                                            return <option value={key} key={key}>{STATUS[key]}</option>
                                        })
                                    }

                                </Form.Select>
                                {errors.status && touched.status ? (
                                    <Form.Text style={{ color: 'red' }}>
                                        {errors.status}
                                    </Form.Text>) : null}
                            </Form.Group>

                            <Button variant="primary" type="submit" >
                                Update
                            </Button>

                        </form>
                    )}
                </Formik>

            </Card.Body>
        </Card>

    )
}

export default UpdateProject