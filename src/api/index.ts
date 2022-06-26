import axios from 'axios';
const api_key = 'AIzaSyAcd6_4b3bsnDHg6ybr6HtrvDz1O3MHLIU';
const api_url = 'https://www.googleapis.com/books/v1/volumes';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
    },
});


export const getAllBooks = (q: string, startIndex: number, orderBy?: string) => api.get(`${api_url}`, {
    params: {
        q,
        filter: 'free-ebooks',
        key: api_key,
        maxResults: 30,
        startIndex,
        orderBy
    }
});

export const getBookById = (id: string) => api.get(`${api_url}/${id}`, {
    params: { key: api_key }
});