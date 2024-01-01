import {BiDollar} from 'react-icons/bi'

type Props = {
    amount: number | null
    setAmount: React.Dispatch<React.SetStateAction<number | null>>
}

const Amount = ({amount, setAmount}: Props) => {
    return (
        <div className={`relative w-[25%]`}>
            <input min={0} value={amount ?? ''} onChange={(event) => setAmount(event.target.valueAsNumber)}
                className={`w-full outline-none text-lg text-center bg-gray-700 p-2 rounded-xl text-stone-300 font-medium placeholder-stone-400 border-none focus:ring-2 focus:outline-none focus:ring-lime-500`}
                type="number" placeholder="5.99" />
            <div className="absolute top-2.5 left-0 text-stone-300 m-0 p-0">
                <BiDollar style={{color: '#a3e635'}} size={24} />
            </div>
        </div>
    )
}

export default Amount