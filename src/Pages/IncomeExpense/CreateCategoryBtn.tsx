import React from 'react'
import {AiOutlineAppstoreAdd} from 'react-icons/ai'

type Props = {
    setOpenModal : React.Dispatch<React.SetStateAction<string | undefined>>
}

const CreateCategoryBtn = ({setOpenModal}: Props) => {
    return (
        <div onClick={() => setOpenModal('dismissible')} className="flex-col space-y-1 justify-center items-center my-2 col-start-4" >
            <div className=" p-2 bg-lime-500 rounded-lg w-fit m-auto" >
                <AiOutlineAppstoreAdd size={30} color="white" />
            </div>
            <div className="bg-lime-900 w-fit rounded-lg px-2 m-auto" >
                <p className="text-center text-gray-300" >Add</p>
            </div>
        </div>
    )
}

export default CreateCategoryBtn