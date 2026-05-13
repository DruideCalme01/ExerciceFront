const BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (res) => {
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Erreur serveur");
    }
    return res.json();
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const api = {
    get: (url) => 
        fetch(`${BASE_URL}${url}`, {
            headers: getHeaders()
        }).then(handleResponse),

    post: (url, body) => 
        fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body)
        }).then(handleResponse),

    put: (url, body) => 
        fetch(`${BASE_URL}${url}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(body)
        }).then(handleResponse),

    delete: (url) => 
        fetch(`${BASE_URL}${url}`, {
            method: 'DELETE',
            headers: getHeaders()
        }).then(handleResponse)
};