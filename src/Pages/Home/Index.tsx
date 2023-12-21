import HomeChart from './HomeChart'
import HomeChar from "../../../public/home-character.png";
import {useUser} from '../../context/userContext';

// type Props = {}

export const Index = () => {
    const {user} = useUser();

    return (
        <div className='flex flex-col h-screen justify-around' >
            <section className='text-lime-500 text-2xl text-left pl-5 font-medium' >
                <p>Welcome back, {user?.username} </p>
            </section>
            <div>
                <div className='flex w-11/12 mx-auto justify-between mb-3' >
                    <div className='flex flex-col text-lime-500 text-2xl font-bold text-center justify-center' >
                        <div className='flex flex-col gap-1' >
                            <p>Get Your</p>
                            <p>Finances Right,</p>
                            <p>TODAY !</p>
                        </div>
                    </div>
                    <div className="w-50 h-64"  >
                        <img className='w-full h-full object-cover' src={HomeChar} alt="Home character" />
                    </div>
                </div>

                <HomeChart />
            </div>
        </div>
    )
}
