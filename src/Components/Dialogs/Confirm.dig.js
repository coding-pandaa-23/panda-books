const ConfirmDialog = () => {
    return ( <>
        <div className="modal fade" id="liveConfirmDialog" aria-labelledby="liveConfirmModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="liveConfirmModalLabel"> </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className="text-secondary message"></p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-cancel" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary btn-confirm" data-bs-dismiss="modal">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </> );
}
 
export default ConfirmDialog;