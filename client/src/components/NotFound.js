import React, { useEffect } from 'react';


const NotFound = (props) => {
    useEffect(() => {
        props.history.push('/');
    }, [props.history])
    return ( 
        <div>
            Page not found
        </div> 
    );
}
 
export default NotFound;