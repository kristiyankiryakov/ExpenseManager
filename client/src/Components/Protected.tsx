import Cookies from 'js-cookie'
import useUserStore from '../stores/userStore'
import { Navigate } from "react-router-dom";

type Props = {
    children: JSX.Element
}

const Protected = ({ children }: Props) => {
    const { user, reFetchUser } = useUserStore();
    const token = Cookies.get('jwt');

    if (token && user) {
        return children
    } else if (token) {
        reFetchUser();
    } else {
        return <Navigate to="/login" replace={true} />
    }

};

export default Protected

