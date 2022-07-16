// import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

// const firebaseConfig = {
//     databaseURL: "https://console.firebase.google.com/project/djamware-abda1/database/djamware-abda1-default-rtdb/data/~2F",
//     apiKey: "AIzaSyBzHcKMRwhiuaw7avJxVdZgPzh0JQa-xPQ",
//     authDomain: "djamware-abda1.firebaseapp.com",
//     projectId: "djamware-abda1",
//     storageBucket: "djamware-abda1.appspot.com",
//     messagingSenderId: "486234746779",
//     appId: "1:486234746779:web:5cccefa4834267eb943b3e",
//     measurementId: "G-SWY99JL8SY"
// };

// firebase.initializeApp(firebaseConfig);

// firebase.firestore();

import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'http://localhost:8069/api'
})

export const post_data = (item_to_save, onUploadProgress) => {
    const input_data = new FormData();
    for (let key in  Object.keys()){
        input_data.append(key, item_to_save[key]);
    }
    if (item_to_save.id)
    {
        input_data.append('id', item_to_save.id);
    }
    //console.log(item_to_save, data, 4444);
    if(!item_to_save.files){
        item_to_save.files = [];
    }

    item_to_save.files.forEach((image, index)=>{
        input_data.append('files', {
            name: 'file' + index,
            uri: image
        });
    });

    if (item_to_save.location)
    {
        input_data.append('location', JSON.stringify(item_to_save.location));
    }
    return apiClient.post(endpoint, input_data, {
        onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total)
    });
}

const get_data = (endpoint) => client.get(endpoint, input_data);

const firebase = {
    post_data,
    get_data,
}
export default firebase;