import { getBlob, getDownloadURL, getStream, ref, uploadBytes } from "firebase/storage";
import { storageI } from "./firebase.util";



export default class StorageUtil {

    /**
     * Upload Or Update a book
     * @param {String} bid 
     * @param {File} file 
     * @returns {Promise<String>}
     */
    async uploadBook(bid, file){
        try {
            const bookRef = ref(storageI, `/public/books/${bid}.pdf`);

            let snapshot = await uploadBytes(bookRef, file);
            let downloadLink = await getDownloadURL(snapshot.ref);  

            return downloadLink;
        } catch (error) {
            console.log(error)
        }
    }

    async getFile(bid){
        try {
            const bookRef = ref(storageI, `/public/books/${bid}.pdf`);
            let blob = await getBlob(bookRef);

            return blob;
        } catch (error) {
            console.log(error);
        }
    }
}