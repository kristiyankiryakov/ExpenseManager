import {useUser} from '../../context/userContext';

// type Props = {}

export const Index = () => {
    const {user} = useUser();

    return (
        <div className=' flex flex-col justify-between h-screen text-white' >
            <div>&nbsp;</div>

            <p className='pb-20 pl-3 text-white text-2xl font-bold' >WELCOME TO THE FUTURE OF TRACKING</p>
        </div>
    )
}
