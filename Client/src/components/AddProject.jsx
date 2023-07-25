import { Formik } from 'formik';
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS, GET_CLIENT_DROPDOWN } from '../queries/clientQueries';
import { STATUS } from '../config';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';

const AddProjectModal = ({ show, handleClose }) => {
    const validation = Yup.object().shape({
        name: Yup.string().required('Project name is Required'),
        description: Yup.string().required('Project description is Required'),
        clientId: Yup.string().required('client is Required'),

    })

    const [addProject] = useMutation(ADD_PROJECT)
    const { data, loading, error } = useQuery(GET_CLIENT_DROPDOWN);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>

            <Formik

                initialValues={{ name: '', description: '', clientId: '', status: 'new' }}
                validationSchema={validation}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    console.log(STATUS.new,"status");
                    const { name, description, clientId, status } = values;
                    addProject({
                        variables: { name, description, clientId, status },
                        update(cache, { data: { addProject } }) {
                            const { projects } = cache.readQuery({ query: GET_PROJECTS })
                            cache.writeQuery({
                                query: GET_PROJECTS,
                                data:{projects:[...projects,addProject]}
                            })
                        }
                    }).then(() => {
                        console.log('success');
                        handleClose()
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
                    isSubmitting
                }) => (

                    <form onSubmit={handleSubmit}>
                        <Modal.Body>

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

                            <Form.Group className="mb-3" controlId="formBasicEmail">
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
                                        !loading && !error && data.clients.length > 0 && data.clients.map((client,index) => {
                                            return <option value={client.id} key={index}>{client.name}</option>
                                        })
                                    }


                                </Form.Select>
                                {errors.clientId && touched.clientId ? (
                                    <Form.Text style={{ color: 'red' }}>
                                        {errors.clientId}
                                    </Form.Text>) : null}
                            </Form.Group>

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





                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </form>
                )}
            </Formik>





        </Modal >
    )
}

export default AddProjectModal