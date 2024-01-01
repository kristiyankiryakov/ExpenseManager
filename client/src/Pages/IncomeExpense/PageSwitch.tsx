import {ComponentPage, Page} from '../../enums/Page';
import {getIcon} from '../../helpers/icons'
import typeStore from '../../stores/typeStore';

type Props = {
    page: ComponentPage
}

const selectedBckg = 'bg-lime-400 shadow-lg shadow-lime-500/50';
const DeSelectedBckg = 'bg-lime-800 bg-opacity-60 shadow-lg';

const PageSwitch = ({page}: Props) => {

    const {type, setType} = typeStore((state) => ({type: page === ComponentPage.IncomeExpense ? state.incomeExpenseType : state.detailsChartType, setType: page === ComponentPage.IncomeExpense ? state.setIncomeExpenseType : state.setDetailsChartType}));

    const isExpensePage = type === Page.EXPENSE;

    return (
        <div className='flex w-11/12 justify-around text-white py-2 mx-auto rounded-2xl bg-lime-700 font-medium text-sm' >
            <button onClick={() => setType(Page.EXPENSE)} className={` px-6 py-1 rounded-lg focus:ring-2 focus:outline-none focus:ring-lime-300 ${isExpensePage ? selectedBckg : DeSelectedBckg}`} ><span className='pr-1' >{getIcon("Down")}</span>{Page.EXPENSE}</button>
            <button onClick={() => setType(Page.INCOME)} className={`px-6 py-1 rounded-lg focus:ring-2 focus:outline-none focus:ring-lime-300 ${!isExpensePage ? selectedBckg : DeSelectedBckg}`}  ><span className='pr-1' >{getIcon("Up")}</span>{Page.INCOME}</button>
        </div>
    )
}

export default PageSwitch