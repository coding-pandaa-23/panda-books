const TextAreaDialog = () => {
    return ( <>
        <div className="modal fade" id="liveTextareaDialog" aria-labelledby="liveTextareaDialogLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title fs-5" id="liveTextareaDialogLabel">Enter Text</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                
                <form id="liveTextareaDialogForm" onSubmit={(e)=>{e.preventDefault()}}>
                    <div className="modal-body">
                        <div className="input-group">
                            <textarea 
                                type="text" className="form-control h-min-40" 
                                id="text-area-title" 
                                placeholder="Enter Content" 
                                
                                ></textarea>
                        </div>
                    </div>
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
 
export default TextAreaDialog;