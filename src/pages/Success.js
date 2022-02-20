import { useHistory } from 'react-router-dom';

import classes from './Success.module.css';

// The display of booking success page
function Success(){

    const history = useHistory();
    
    // Back to main page and refresh
    function goBackAndRefresh(){
        history.replace('/');
        history.go(0);
    }

    return(
        <section className={classes.container}>
            <div className={classes.window}>
                <div className={classes.upper}>
                    <p className={classes.check}>&#10004;</p>
                    <p className={classes.success}>SUCCESS</p>
                </div>
                <div className={classes.lower}>
                    <p>
                        You successfully scheduled an appointment.
                    </p>
                    <button onClick={() => goBackAndRefresh()}>
                        Done
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Success;