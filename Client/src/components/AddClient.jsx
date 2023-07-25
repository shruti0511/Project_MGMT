import { Formik } from 'formik';
import * as Yup from "yup";
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

const AddClientModal = ({ show, handleClose }) => {
    const validation = Yup.object().shape({
        name: Yup.string().required('Client name is Required'),
        email: Yup.string().required('Email Id is Required').email("Enter Valid Email Id"),
        phone: Yup.number().required('Phone is Required'),

    })
    // const [AddClient] = useMutation(ADD_CLIENT
    // , {
    // variables: { name:'asd', email:'asd@gmail.com', phone:'4785236915' },
    // refetchQueries: [{ query: GET_CLIENTS }]
    // }
    // )

    const [addClient] = useMutation(ADD_CLIENT)

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Client</Modal.Title>
            </Modal.Header>

            <Formik

                initialValues={{ name: '', email: '', phone: '' }}
                validationSchema={validation}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    const { name, email, phone } = values;
                    addClient({
                        variables: { name, email, phone: String(phone) },
                        update(cache, { data: { addClient } }) {
                            const { clients } = cache.readQuery({ query: GET_CLIENTS })
                            cache.writeQuery({
                                query: GET_CLIENTS,
                                data:{clients:[...clients,addClient]}
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
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Client Name"
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
                                <Form.Label>Email Id</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email Id"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                {errors.email && touched.email ? (
                                    <Form.Text style={{ color: 'red' }}>
                                        {errors.email}
                                    </Form.Text>) : null}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Phone Number"
                                    name="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                />
                                {errors.phone && touched.phone ? (
                                    <Form.Text style={{ color: 'red' }}>
                                        {errors.phone}
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





        </Modal>
    )
}

export default AddClientModal