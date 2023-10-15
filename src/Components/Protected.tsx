import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import Login from './Login'
import {useUser} from '../context/userContext'
import axios from 'axios'

type Props = {
    children: JSX.Element
}

const Protected = ({children}: Props) => {

    const {user, setUser} = useUser();
    const token = Cookies.get('jwt');
    const navigate = useNavigate();

    if (token && user) {
        return children
    } else if (token) {
        (async () => {
            const result = await axios.get('http://localhost:3500/auth/refresh', {headers: {'Authorization': `Bearer ${token}`}, withCredentials: true});
            console.log(result);
            setUser(result.data.userData);
        })();
    } else {
        navigate('/login');
        return <Login />
    }

};

export default Protected

