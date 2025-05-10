/**
 * 
 * @param {object} obj 
 * @param {Number} obj.progress
 * @returns 
 */

const ProgressBar = ({progress, height}) => {

    return ( <>
        {<div className="w-100 ">
            <div className="">
                <div 
                    className="progress" role="progressbar" aria-label="Example with label" 
                    aria-valuenow={((progress ?? 0) * 100).toFixed(0)} aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar" style={{width: `${(progress ?? 0)*100}%`}}>
                            {((progress ?? 0) * 100).toFixed(0)}%
                        </div>
                </div>   
                   
            </div>
       </div>}
    </> );
}
 
export default ProgressBar;