import React from 'react'

const LoadMore = (props) => {
    return (
        <div className="text-center">
            <button className="btn" onClick={props.fetchData}>Load More Items</button>
        </div>
    )
}

export default LoadMore