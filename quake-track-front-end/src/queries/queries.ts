import { gql } from '@apollo/client';

// Запит для отримання всіх землетрусів
export const GET_EARTHQUAKES = gql`
    query GetEarthquakes($page: Int!, $limit: Int!) {
        getEarthquakes(page: $page, limit: $limit) {
            earthquakes {
                id
                location
                magnitude
                date
            }
            totalCount
        }
    }
`;

export const GET_EARTHQUAKE = gql`
    query GetEarthquake($id: Int!) {
        earthquake(id: $id) {
            id
            location
            magnitude
            date
        }
    }
`;

// Мутація для створення землетрусу
export const CREATE_EARTHQUAKE = gql`
    mutation CreateEarthquake($createEarthquakeDto: CreateEarthquakeDto!) {
        createEarthquake(createEarthquakeDto: $createEarthquakeDto) {
            id
            location
            magnitude
            date
        }
    }
`;

// Мутація для оновлення землетрусу
export const UPDATE_EARTHQUAKE = gql`
    mutation UpdateEarthquake($id: Int!, $updateEarthquakeDto: UpdateEarthquakeDto!) {
        updateEarthquake(id: $id, updateEarthquakeDto: $updateEarthquakeDto) {
            id
            location
            magnitude
            date
        }
    }
`;

// Мутація для видалення землетрусу
export const REMOVE_EARTHQUAKE = gql`
    mutation RemoveEarthquake($id: Int!) {
        removeEarthquake(id: $id) {
            id
        }
    }
`;
