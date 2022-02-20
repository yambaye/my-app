import { Link } from 'react-router-dom';
import classes from './DoctorItem.module.css';


// Component for each doctor
function DoctorItem(props){
    const {id, address, name, img} = props.doctor;
    const {district, line_1, line_2} = address;

    return(
        <li>
            <Link to={`/${id}`} className={classes.doctorButton}>
            <div className={classes.image}>
                <img src={img} alt={name} />
            </div>
            <div className={classes.name}>
                <h3>{name}</h3>
            </div>
            <div className={classes.address}>
                <h5>{line_1}</h5>
                <h5>{line_2}</h5>
                <h5>{district}</h5>
            </div>
            </Link>
        </li>
    )
};

export default DoctorItem;