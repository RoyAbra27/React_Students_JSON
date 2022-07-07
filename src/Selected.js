import React from 'react'

const Selected = (props) => {
    return (
        <div style={{ backgroundColor: "rgb(44, 198, 131)" }}>

            {props.stdntLst.map((stdnt, ind) => <div key={ind}> {stdnt.name}{" "}{stdnt.age}
                <button onClick={() => props.deleteFromDB(stdnt.id)}>Delete</button>
            </div>)}

        </div>
    )
}

export default Selected