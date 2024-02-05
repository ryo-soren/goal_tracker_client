const baseURL = "http://localhost:3000"
// const baseURL = "https://goal-tracker-api-45bv.onrender.com/api/v1"

export const Goal = {
    index(){
        return fetch(`${baseURL}/goals`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {return res.json() })
    },
    
    show(id){
        return fetch(`${baseURL}/goals/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => {return res.json()})
    },

    create(params){
        return fetch(`${baseURL}/goals`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
    },

    update(id, params){
        return fetch(`${baseURL}/goals/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
    },

    destroy(id){
        return fetch(`${baseURL}/goals/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json())
    }
}

export const User = {
    create(params){
        return fetch(`${baseURL}/users`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({ user: params })
        }).then(res => res.json())
    },

    update(id, params){
        return fetch(`${baseURL}/users/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
    },

    destroy(id){
        return fetch(`${baseURL}/goals/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json())
    }

}

export const Session = {
    current() {
        return fetch(`${baseURL}/current_user`, {
            credentials: "include",
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                
            }
        }).then(res => res.json())
    },

    create(params) {
        return fetch(`${baseURL}/sessions`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => res.json())
    },

    destroy() {
        return fetch(`${baseURL}/sessions`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(res => res.json())
    } 

}