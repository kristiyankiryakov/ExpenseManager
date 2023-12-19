import React from 'react'
import {BiCategory} from 'react-icons/bi'

type Props = {
    filter: string
    setFilter: React.Dispatch<React.SetStateAction<string>>
}

const FilterCategories = ({filter, setFilter}: Props) => {
    return (
        <div className="relative">
            <input className={`w-full bg-gray-700 outline-none text-lg text-center p-2  text-stone-100 rounded-xl placeholder-stone-400 border-none focus:outline-none focus:ring-2  focus:ring-lime-500`} type="text"
                value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search Category" />
            <div className="absolute top-2 left-2" >
                <BiCategory size={30} color='#a3e635' />
            </div>
        </div>
    )
}

export default FilterCategories