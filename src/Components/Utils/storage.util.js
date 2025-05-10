import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageI } from "./firebase.util";



export default class StorageUtil {

    /**
     * @callback StateCallback
     * @param {UploadTaskSnapshot} progress
     * @param {Boolean} completed
     * @param {String} downloadLink
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

                if(snapshot.state ==='success'){
                    let downloadLink = await getDownloadURL(snapshot.ref);  
                    data.onStateChanged(progress, true, downloadLink)
                }else{
                    data.onStateChanged(progress, false, null);
                }
            });

            let snapshot = await task;
            let link = await getDownloadURL(snapshot.ref); 
            console.log('Download Link: ' + link);
            
            return link

        } catch (error) {
            console.log(error)
        }
    }
}