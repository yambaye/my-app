import DoctorItem from './DoctorItem';
import classes from './DoctorList.module.css';

function DoctorList(props){
    return(
        <ul>
            {props.doctors.map((doctor) => (
                <DoctorItem 
                    key={doctor.id}
                    doctor={doctor}
                />
            ))
            }
        </ul>
    )
};

export default DoctorList;