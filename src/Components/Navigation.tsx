import {faChartSimple, faCirclePlus, faHouse, faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";

const Navigation = () => {

    return (
        <nav className="bg-slate-900" >
            <div className={`flex bg-slate-800 p-2 w-full justify-around rounded-t-xl`}>
                <Link to="/"  ><FontAwesomeIcon icon={faHouse} color="white" size="2xl" /></Link>
                <Link to="/add" ><FontAwesomeIcon icon={faCirclePlus} color="white" size="2xl" /></Link>
                <Link to="/details" ><FontAwesomeIcon icon={faChartSimple} color="white" size="2xl" /></Link>
                <Link to={`/profile`} ><FontAwesomeIcon icon={faUser} color="white" size="2xl" /></Link>
            </div>
        </nav>
    )
}

export default Navigation