import DoctorItem from './DoctorItem';
import classes from './DoctorList.module.css';

function DoctorList(props){
    return(
        <ul>
            {props.doctors.map((doctor) => (
                <DoctorItem 
                    key={doctor.id}
                    name={doctor.name}
                    address={doctor.address}
                    link={doctor.id}
                    img={doctor.img}
                />
            ))
            }
        </ul>
    )
};

export default DoctorList;