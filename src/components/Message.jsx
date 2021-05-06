import { Fragment, useState } from "react";
import Alert from 'react-bootstrap/Alert';


const Message = ({type , message , time}) => {
    const [visible, updateState] = useState(true);

    const ocultar = () => {
        if(time >0){
            setTimeout(() => {
                updateState(false)
            }, 3000);
        }
    }
    
    ocultar();

    return( 
        <Fragment>
            {(visible)
                ?   <Alert variant={type}>
                    {message}
                    </Alert>
                : null
            }
        </Fragment>
    )
}

export default Message;