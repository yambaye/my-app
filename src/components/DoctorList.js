import DoctorItem from './DoctorItem';

// Component for the list of all the doctors
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