import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $clientId: ID!, $status: ProjectStatus!,){
        addProject(name: $name, description: $description, clientId: $clientId, status:$status){
            id
            name
            status
        }
    }
`
const UPDATE_PROJECT = gql`
    mutation updateProject($name: String!, $description: String!, $id: ID!, $status: ProjectStatusUpdate!,){
        updateProject(name: $name, description: $description, id: $id, status:$status){
            id
            name
            status
        }
    }
`

const DELETE_PROJECT = gql`
    mutation deleteProject($id:ID!){
        deleteProject(id:$id){
            id

        }
    }
`




export {ADD_PROJECT,UPDATE_PROJECT,DELETE_PROJECT}