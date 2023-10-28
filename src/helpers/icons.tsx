// import {MdOutlineFastfood} from "react-icons/md";
// import {BsFillFuelPumpDieselFill} from "react-icons/bs";
// import {BsHouseDoorFill} from "react-icons/bs";
// import {GiExpense} from "react-icons/gi"
// import {AiFillPhone} from "react-icons/ai";
// import {BsThreeDots} from "react-icons/bs";
import Icons from "../interfaces/Icons";
import {faBurger, faGasPump, faHouse, faMoneyBill, faPhone, faEllipsis} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';




export const icons: Icons = {
    Food: <FontAwesomeIcon icon={faBurger} color="white" size="xl" />,
    Fuel: <FontAwesomeIcon icon={faGasPump} color="white" size="xl" />,
    Rent: <FontAwesomeIcon icon={faHouse} color="white" size="xl" />,
    Bills: <FontAwesomeIcon icon={faMoneyBill} color="white" size="xl" />,
    Phone: <FontAwesomeIcon icon={faPhone} color="white" size="xl" />,
    Other: <FontAwesomeIcon icon={faEllipsis} color="white" size="xl" />,
    // Rent: <BsHouseDoorFill color="white" size={24}  />,
    // Bills: <GiExpense color="white" size={24}  />,
    // Phone: <AiFillPhone color="white" size={24}  />,
    // Other: <BsThreeDots color="white" size={24}  />
}
