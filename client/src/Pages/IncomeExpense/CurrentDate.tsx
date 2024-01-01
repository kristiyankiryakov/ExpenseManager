import { useEffect, useState } from 'react';
import moment from 'moment';
// import 'moment/'; // Import the English locale

const CurrentDate = () => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        // Get the current date in the desired format
        const formattedDate = moment().format('MMM, DD YYYY');
        setCurrentDate(formattedDate);
    }, []);

    return (
        <p className='' >{currentDate}</p>
    );
};

export default CurrentDate;
