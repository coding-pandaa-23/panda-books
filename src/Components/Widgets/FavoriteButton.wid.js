import { useEffect, useState } from "react";
import ProgressDB from "../Database/Progress.db";
import Auth from "../Utils/Auth.firebase";

/**
 * @param {Object} obj 
 * @param {Boolean} obj.bid
 * @param {Function} obj.onRegister
 * @returns 
 */
const FavoriteButton = ({bid, onRegister}) => {
    const pdb = new ProgressDB();
    const auth = new Auth();

    const [isLoading, setLoading] = useState(true);
    const [progress, setProgress] = useState();

    useEffect(()=>{
        initialize();
    }, [])

    async function initialize(){
        setLoading(true);
        setProgress(await pdb.checkout(bid));
        setLoading(false);
    }

    /**
     * @callback ToggleCallback
     * @param {import('../Models/Progress.model').default} progress
     */

    /**
     * @param {ToggleCallback} callback
     */
    async function toggleFav(){
        if(auth.currentUser && bid){
            setLoading(true)
            let nProgress = await pdb.toggleFavorite(bid);
            setProgress(nProgress);
            setLoading(false);
        }else {
            onRegister && onRegister();
        }
    }

    return ( <>
        {!isLoading && <button type="button" className="btn btn-light text-secondary mx-1" onClick={toggleFav}>
            {!progress?.isFavorite && <code><i className="fa-regular fa-heart fa-xl"></i></code>}
            {progress?.isFavorite && <code><i className="fa-solid fa-heart fa-xl"></i></code>}
        </button>}

        {isLoading && <button type="button" className="btn btn-light text-secondary mx-1 d-flex align-items-center disabled">
            <div className="spinner-grow text-danger" role="status" style={{height: 20, width: 20}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </button>}

    </> );
}
 
export default FavoriteButton;