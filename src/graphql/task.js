import { gql } from '8base-react-sdk';

export const GET_TASK = gql`
  query GetTask {
    tasksList {
      items {
        name
        id
        status
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation TaskCreate($data: TaskCreateInput!) {
    taskCreate(data: $data) {
      id
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask($data: TaskUpdateInput!, $filter: TaskKeyFilter) {
    taskUpdate(data: $data, filter: $filter) {
      id
    }
  }
`;

export const DEL_TASK = gql`
  mutation DeleteTask($filter: TaskFilter!) {
    taskDeleteByFilter(filter: $filter) {
      success
    }
  }
`;