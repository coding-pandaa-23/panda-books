import { useEffect, useState } from "react";
import DB from "../Database/Database.db";
import NotAdminView from "../Views/NotAdmin.view";
import Auth from "../Utils/Auth.firebase";
import LoadingPage from "./Loading.page";

const AdminChecker = ({withAlertVew = false, children}) => {
    
    const auth = new Auth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(()=>{
        auth.onAuthStateChange((fbUser)=>{
            setIsLoading(true);
            setUser(fbUser);
            initialize(fbUser);
        })
        
    // eslint-disable-next-line
    }, [])

    async function initialize(fbUser){
        let isAdminCheck = await DB.isAdmin(fbUser?.uid);
        setIsAdmin(isAdminCheck);
        setIsLoading(false);
    }

    return (<>
        {user && isAdmin && (children)}
        {(isLoading && withAlertVew) && <LoadingPage isLoading={true} /> }
        {(!isLoading && withAlertVew && !isAdmin) && <NotAdminView />}
    </>);
}
 
export default AdminChecker;