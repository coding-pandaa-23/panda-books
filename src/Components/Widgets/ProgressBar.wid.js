const ProgressBar = (props) => {
    let progress = props.progress ?? 0;

    return ( <>
       <div className="m-2 h-80 d-flex justify-content-center align-items-center" style={{width: '20vw'}}>
            <div className="d-block w-100">

                <div className="text-center mb-5">
                    <i className="fa-solid fa-book-open text-secondary fa-7x"></i>
                </div>

                {(progress !== -1) && (progress !== 1) && <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={(progress * 100).toFixed(0)} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar" style={{width: `${progress*100}%`}}></div>
                </div>}
            </div>
       </div>
    </> );
}
 
export default ProgressBar;