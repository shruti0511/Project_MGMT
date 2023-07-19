import React from 'react'
import { Button } from 'react-bootstrap'
import { Trash3Fill } from 'react-bootstrap-icons';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';


const ClientTableRow = ({ client }) => {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        // refetchQueries:[{query:GET_CLIENTS}]
        update(cache, { data: { deleteClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.filter(client => client.id !== deleteClient.id) },
            })
        }
    })

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <Button variant="danger" size='sm' onClick={deleteClient}>
                    <Trash3Fill />
                </Button>{' '}

            </td>
        </tr>
    )
}

export default ClientTableRow