const TextDialog = () => {
    return ( <>
        <div className="modal fade" id="liveTextDialog" aria-labelledby="liveTextDialogLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title fs-5" id="liveTextDialogLabel">Enter Text</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                
                <form id="liveTextDialogForm" onSubmit={(e)=>{e.preventDefault()}}>
                    <div className="modal-body">
                        <div className="input-group">
                            <input type="text" className="form-control" id="text-modal-title" ng-model="textModal.value" placeholder="Enter Text" />
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
 
export default TextDialog;