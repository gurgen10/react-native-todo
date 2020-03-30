const  BASE_URL = 'https://rn-todo-app-b6a93.firebaseio.com/todos';
export class Http {
   
    static HEADERS = { 'Content-Type': 'application/json' }

    static async get() { 
        try {
            return await request(BASE_URL + '.json', 'GET');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async post(data = {}) {
        try {
            return await request(BASE_URL + '.json', 'POST', data);
        } catch (error) {
            console.log(error);
            throw error;
        }


    }

    static async patch(id, data = {}) {
        console.log(BASE_URL +  `/${id}.json`);
        console.log(data);
        
        try {
            return await request(BASE_URL +  `/${id}.json`, 'PATCH', data);
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
    static async  delete(id) {
        try {
            return await request(BASE_URL +  `/${id}.json`, 'DELETE');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

async function request(url, method, data) {

    const config = {
        method,
        headers: Http.HEADERS,
    }

    if (method === 'POST' || method === 'PATCH') {
        config.body = JSON.stringify(data)
    }

    console.log(config);
    
    

    const response = await fetch(url, config);
    return await response.json();

}