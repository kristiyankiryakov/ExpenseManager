import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import Login from './Login'

type Props = {
    children: JSX.Element
}

const Protected = ({children}: Props) => {

    const [user, setUser] = useState<null | boolean>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('jwtToken');
        if (token) {
            setUser(true);
        } else {
            setUser(false);
        }
    }, []);

    if (user) {
        return children
    } else {
        navigate('/login');
        return <Login />
    }

};

export default Protected

