import classes from './Header.module.css';

function Header(){
    return(
        <header className={classes.header}>
            <h1>Book an Appointment</h1>
            {/* <div className={classes.successTag}>
                <div className={classes.successText}>
                    Successfully booked!
                </div>
            </div> */}
        </header>
    )
};

export default Header;