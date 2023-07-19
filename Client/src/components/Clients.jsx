import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Table from "react-bootstrap/Table";
import ClientTableRow from "./ClientTableRow";
import { Button, Container } from "react-bootstrap";
import { GET_CLIENTS } from "../queries/clientQueries";
import Loader from "./Loader";
import AddClient from "./AddClient";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Plus } from "react-bootstrap-icons";

const Clients = () => {
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (loading) return <Loader />;
    if (error) return <p>error...</p>;
    return (
        <>
            {/* {!loading && !error && data?.clients?.length > 0 && data.clients.map((client,index) => {
                return (<div key={index}>
                    Name: {client.name} <br/>
                    Email: {client.email} <br/>
                    Phone: {client.phone} <br/><br/>
                </div>)
            })} */}
            <Container>
                {/* <h1>Clients</h1> */}
                <Row className="mt-3">
                    <Col><h1 style={{ textAlign: 'left' }}>Clients</h1></Col>
                    <Col style={{ textAlign: 'right' }}>
                        <Button variant="primary" onClick={handleShow}>
                            <Plus/> Add Client
                        </Button>
                    </Col>
                </Row>

                <Table striped hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && !error && data?.clients?.length > 0 && data.clients.map((client, index) =>
                            <ClientTableRow client={client} key={index} />)

                        }

                    </tbody>
                </Table>
            </Container>
            {show && <AddClient show={show} handleClose={handleClose} />}
        </>
    );
};

export default Clients;
