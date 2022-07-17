let firebase = {};
(function () {
    const api_url = 'http://localhost:8069/api'
    async function fetch_request(endpoint, method, req_data={}) {
        let fetch_options = {
            method: method,
        }
        if(method.toLowerCase() == 'get'){
            fetch_options.data = req_data;
        }
        else{
            fetch_options.body = JSON.stringify(req_data);
        }
        console.log(fetch_options);
        try {
            const response = await fetch(api_url+endpoint, fetch_options);
            return response.json();
        } catch (error) {
            console.log('Error in '+api_url+endpoint, error);
            return new Promise(function (resolve, reject) {
                reject(error);
            });
        }
    }

    firebase = {
        get_data: async function(endpoint, req_data={}){
            let res = await fetch_request(endpoint, 'GET', req_data);
            return res;
        },

        post_data: async function(endpoint, item_to_save={}){
            let req_data = new FormData();
            for (let key in Object.keys()) {
                req_data.append(key, item_to_save[key]);
            }
            item_to_save.files.forEach((file, index) => {
                req_data.append('files', {
                    name: 'file' + index,
                    uri: file
                });
            });

            let res = await fetch_request(endpoint, 'POST', req_data);
            return res;
        },
    }
})();

export default firebase;