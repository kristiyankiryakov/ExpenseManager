import Page from '../../enums/Page'
import {getIcon} from '../../helpers/icons'

type Props = {
    setPageSwitch: React.Dispatch<React.SetStateAction<Page>>
    isExpensePage: boolean
}

const selectedBckg = 'bg-lime-400 shadow-lg shadow-lime-500/50';
const DeSelectedBckg = 'bg-lime-800 bg-opacity-60 shadow-lg';

const PageSwitch = ({setPageSwitch, isExpensePage}: Props) => {
    return (
        <div className='flex w-11/12 justify-around text-white py-2 mx-auto rounded-2xl bg-lime-700 font-medium text-sm' >
            <button onClick={() => setPageSwitch(Page.EXPENSE)} className={` px-6 py-1 rounded-lg focus:ring-2 focus:outline-none focus:ring-lime-300 ${isExpensePage ? selectedBckg : DeSelectedBckg}`} ><span className='pr-1' >{getIcon("Down")}</span>{Page.EXPENSE}</button>
            <button onClick={() => setPageSwitch(Page.INCOME)} className={`px-6 py-1 rounded-lg focus:ring-2 focus:outline-none focus:ring-lime-300 ${!isExpensePage ? selectedBckg : DeSelectedBckg}`}  ><span className='pr-1' >{getIcon("Up")}</span>{Page.INCOME}</button>
        </div>
    )
}

export default PageSwitch