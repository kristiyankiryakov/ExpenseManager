import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import Login from './Login'
// import axios from 'axios'
import useUserStore from '../stores/userStore'

type Props = {
    children: JSX.Element
}

const Protected = ({children}: Props) => {
    const {user, reFetchUser} = useUserStore((state) => ({user: state.user, reFetchUser: state.reFetchUser}));
    const token = Cookies.get('jwt');
    const navigate = useNavigate();

    if (token && user) {
        return children
    } else if (token) {
        reFetchUser(token)
    } else {
        navigate('/login');
        return <Login />
    }

};

export default Protected

