import { useState } from "react";
import DB from "../Database/Database.db";
import NotAdminView from "../Views/NotAdmin.view";

const AdminChecker = ({uid, withAlertVew = false, children}) => {
    const [isAdmin, setIsAdmin] = useState(false);

    if(uid){
       try {
            DB.isAdmin(uid).then((value)=>{
                setIsAdmin(value);
            })
       } catch (error) {
            setIsAdmin(false);
       }
    }

    return (<>
        {isAdmin && (children)}
        {!isAdmin && withAlertVew && <NotAdminView />}
    </>);
}
 
export default AdminChecker;