import axios, { AxiosError } from 'axios'
import DOMPurify from 'dompurify'
import { localStorageService } from './local-storage.service'
import { CONSTRACTION_STORAGE_KEY } from '../consts/storage-keys'


const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


async function ajax(endpoint: string, method = 'GET', data: null | any = null) {
    endpoint = DOMPurify.sanitize(endpoint)
    method = DOMPurify.sanitize(method)

    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            withCredentials: true,
            params: (method === 'GET') ? data : null,
        })
        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
        const error = err as AxiosError
        if (error.response && error.response.status === 401) {
            localStorageService.save(CONSTRACTION_STORAGE_KEY, '')
        }
        throw err
    }
}


export const httpService = {
    get(endpoint: string, data?: any) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint: string, data?: any) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint: string, data?: any) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint: string, data?: any) {
        return ajax(endpoint, 'DELETE', data)
    }
}