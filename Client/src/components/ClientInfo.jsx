import React from 'react'
import { Badge3d, Envelope, PersonBadge, Phone } from 'react-bootstrap-icons'

const ClientInfo = ({ client }) => {
    return (
        <div>
            <h5 className='mt-5'>Client Information</h5>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <PersonBadge className='icon' /> {client.name}
                </li>
                <li className='list-group-item'>
                    <Envelope className='icon' /> {client.email}
                </li>
                <li className='list-group-item'>
                    <Phone className='icon' /> {client.phone}
                </li>
            </ul>
        </div>
    )
}

export default ClientInfo