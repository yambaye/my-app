import Header from './Header';
import classes from './Layout.module.css';

function Layout(props) {
    return(
        <div className={classes.container}>
            <Header />
            {props.children}
        </div>
    )
};

export default Layout;