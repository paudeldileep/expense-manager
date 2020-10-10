import React from 'react'
import Monthlyplot from './Monthlyplot'
import Yearlyplot from './Yearlyplot'
import Avgplot from './Avgplot'

const Plothome = props => {


    
    return (
        <div>
            
            <div className="m-plot-div">
            <Monthlyplot/>
            </div>
            <div className="y-plot-div">
<Yearlyplot/>
</div>
<div className="avg-plot-div">
<Avgplot/>
</div>
        </div>
    )
}



export default Plothome
