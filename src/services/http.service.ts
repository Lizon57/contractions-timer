import axios from 'axios'
import DOMPurify from 'dompurify'


async function ajax(endpoint: string, method = 'GET', data: null | any = null) {
    endpoint = DOMPurify.sanitize(endpoint)
    method = DOMPurify.sanitize(method)

    try {
        const res = await axios({
            url: endpoint,
            method,
            data: (method === 'GET') ? null : data,
            params: (method === 'GET') ? data : null,
            headers: {
                Origin: 'https://abraweather.onrender.com/'
            }
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        throw err
    }
}


export const httpService = {
    get<T>(endpoint: string, data?: T) {
        return ajax(endpoint, 'GET', data)
    },
    post<T>(endpoint: string, data?: T) {
        return ajax(endpoint, 'POST', data)
    },
    put<T>(endpoint: string, data?: T) {
        return ajax(endpoint, 'PUT', data)
    },
    delete<T>(endpoint: string, data?: T) {
        return ajax(endpoint, 'DELETE', data)
    }
}