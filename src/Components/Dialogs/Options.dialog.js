const OptionsDialog = () => {
    return ( <div id="liveOptionsDialog" className="modal fade">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Options</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <ul className="list-group list-group-flush h-30 of-auto">
                    <li></li>
                </ul>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">Cancel</button>
            </div>
            </div>
        </div>
    </div> );
}
 
export default OptionsDialog;