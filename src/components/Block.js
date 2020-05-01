import React from 'react';


const Block = (props) => {
    if(props.isImage) {
        return (
            <div className="block">
                <img src={props.url}/>
            </div>
        );
    }
    return (
        <div className="block">
            <video width="100%" controls>
                <source src={props.url} type="video/mp4" />
            </video>
        </div>
    );
    
}

export default Block