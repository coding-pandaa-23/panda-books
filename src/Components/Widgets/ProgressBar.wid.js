/**
 * 
 * @param {object} obj 
 * @param {Number} obj.progress
 * @returns 
 */

const ProgressBar = ({progress, height}) => {

    return ( <>
        {<div className="w-100 m-0">
            <div 
                className="progress" role="progressbar" aria-label="Example with label" style={{height: height}} 
                aria-valuenow={((progress ?? 0) * 100).toFixed(0)} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar" style={{width: `${(progress ?? 0)*100}%`, height: height}}>
                        {((progress ?? 0) * 100).toFixed(0)}%
                    </div>
            </div>   
       </div>}
    </> );
}
 
export default ProgressBar;