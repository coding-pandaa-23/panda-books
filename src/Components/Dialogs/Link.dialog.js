const LinkDialog = () => {
    return ( <>
        <div className="modal fade" id="liveLinkDialog" aria-labelledby="liveLinkDialogLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title fs-5" id="liveLinkDialogLabel">Enter Text</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                
                <form id="liveLinkDialogForm" onSubmit={(e)=>{e.preventDefault()}}>
                    <div className="modal-body">
                        {/* Icon */}
                        <div className="input-group mb-3">
                            <select  name="icon" className="form-control"  id="text-modal-icon">
                                <option value="fa-facebook-messenger text-primary">Messengar</option>
                                <option value="fa-facebook text-primary">Facebook</option>
                                <option value="fa-instagram text-danger">Instagram</option>
                                <option value="fa-twitter text-primary">Twitter</option>
                                <option value="fa-snapchat text-warning">Snapchat</option>
                            </select>
                        </div>

                        {/* Path */}
                        <div className="input-group mb-3">
                            <input type="text" name="path" className="form-control" id="text-modal-path" placeholder="Enter Path" />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger btn-delete" data-bs-dismiss="modal">Delete</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary btn-confirm" data-bs-dismiss="modal">Save</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </> );
}
 
export default LinkDialog;