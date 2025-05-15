import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageI } from "./firebase.util";



export default class StorageUtil {

    /**
     * @callback StateCallback
     * @param {Number} progress
     */
    
    /**
     * @param {object} data 
     * @param {String} data.path e.g. /public/books/book_id.pdf 
     * @param {File} data.file 
     * @param {StateCallback} data.onStateChanged
     * @returns {Promise<String>}
     */
    async uploadFile(data){
        try {
            const fileRef = ref(storageI, data.path);

            let task = uploadBytesResumable(fileRef, data.file);
            task.on('state_changed', async (snapshot)=>{
                let progress = snapshot.bytesTransferred / snapshot.totalBytes;
                data.onStateChanged(progress);
            });

            let snapshot = await task;
            let link = await getDownloadURL(snapshot.ref);             
            return link

        } catch (error) {
            console.log(error)
        }
    }
}