import {Datepicker} from 'flowbite-react';
import {useState} from "react";
import Period from '../../enums/ExpensePeriod.ts';
import Page from '../../enums/Page.ts';
import {getIcon} from '../../helpers/icons.tsx';
import useCategories from "../../hooks/useCategories.ts";
import useExpenses from "../../hooks/useExpenses.ts";
import AddTransaction from './AddTranscation.tsx';
import Amount from './Amount.tsx';
import CategoryModal from './CategoryModal.tsx';
import CreateCategoryBtn from './CreateCategoryBtn.tsx';
import FilterCategories from './FilterCategories.tsx';
import PageSwitch from './PageSwitch.tsx';
import SingleExpense from './SingleExpense.tsx';
import useFilteredCats from '../../hooks/useFilteredCats.ts';

const Index = () => {
    const {userCategories, selectCategory, selectedCategory, setSelectedCategory, addCategory, setNewCategory} = useCategories();
    const {dailyExpenses, addExpense, amount, setAmount, setSelectedDate} = useExpenses({period: Period.DAY, userCategories, selectedCategory, setSelectedCategory});
    
    const [pageSwitch, setPageSwitch] = useState<Page>(Page.EXPENSE);
    const [filter, setFilter] = useState("");
    const [openModal, setOpenModal] = useState<string | undefined>();

    const filteredCats = useFilteredCats({userCategories, filter});
    const isExpensePage = pageSwitch === Page.EXPENSE;

    return (
        <main className="bg-slate-900 flex flex-col h-screen justify-between">;

            <PageSwitch setPageSwitch={setPageSwitch} isExpensePage={isExpensePage} />

            <div className="flex-col space-y-10" >

                <section className={`flex w-[95%] justify-around m-auto mt-10`}>
                    <Amount amount={amount} setAmount={setAmount} />
                    <FilterCategories filter={filter} setFilter={setFilter} />
                </section>

                <div className="grid grid-cols-4 w-[95%] m-auto border border-gray-600 rounded-xl bg-slate-800 h-44 overflow-y-auto scroll-smooth" >
                    {filteredCats && filteredCats.map((category, i) => {
                        return (
                            <div onClick={() => selectCategory(i)} id="2344" key={category.name} className="flex-col space-y-1 justify-center items-center my-2" >
                                <div tabIndex={0} className={`p-2 rounded-lg w-fit m-auto bg-lime-500 focus:ring-4 focus:outline-none focus:ring-lime-300`} >
                                    <span>{getIcon(category.name)}</span>
                                </div>
                                <div className="bg-lime-700 w-fit rounded-lg px-2 m-auto" >
                                    <p className="text-center text-gray-300" >{category.name}</p>
                                </div>
                            </div>
                        )
                    })}
                    <CreateCategoryBtn setOpenModal={setOpenModal} />
                </div>
            </div>

            <section className="w-[95%] my-2 mx-auto" >
                <Datepicker style={{color: "#646b6e"}} autoHide onSelectedDateChanged={(d) => setSelectedDate(d)} />
            </section>

            <AddTransaction addExpense={addExpense} />

            <section className={`mb-4 w-full mx-auto h-60 max-h-80 overflow-y-auto`} >
                <p className="text-right text-stone-400 pr-3">{isExpensePage ? 'Daily Expenses:' : 'Monthly Income'}</p>

                {(isExpensePage && dailyExpenses) && dailyExpenses.map((expense, i) => {
                    return <SingleExpense expense={expense} key={i} />;
                })}

            </section>

            <CategoryModal openModal={openModal} setOpenModal={setOpenModal} addCategory={addCategory} setNewCategory={setNewCategory} />
        </main >
    )
}

export default Index