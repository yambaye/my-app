import { Link } from 'react-router-dom';
import classes from './DoctorItem.module.css';

function DoctorItem(props){
    return(
        <li>
            <Link to={`/${props.link}`} className={classes.doctorButton}>
            <div className={classes.image}>
                <img src={props.img} alt={props.name} />
            </div>
            <div className={classes.name}>
                <h3>{props.name}</h3>
            </div>
            <div className={classes.address}>
                <h5>{props.address.line_1}</h5>
                <h5>{props.address.line_2}</h5>
                <h5>{props.address.district}</h5>
            </div>
            </Link>
        </li>
    )
};

export default DoctorItem;