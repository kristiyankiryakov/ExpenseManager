import {Skeleton} from '@mui/material';
import {Datepicker} from 'flowbite-react';
import moment from 'moment';
import {Key, useState} from "react";
import Period from '../../enums/ExpensePeriod.ts';
import {ComponentPage} from '../../enums/Page.ts';
import {isCategorySelected} from '../../helpers/CategoryHelpers.ts';
import {customTheme} from '../../helpers/calendarTheme.ts';
import {getIcon} from '../../helpers/icons.tsx';
import useCategories from "../../hooks/useCategories.ts";
import useFilteredCats from '../../hooks/useFilteredCats.ts';
import useTransactions from "../../hooks/useTransactions.ts";
import Transaction from '../../interfaces/Transaction.ts';
import transactionStore from '../../stores/transactionStore.tsx';
import typeStore from '../../stores/typeStore.tsx';
import AddTransaction from './AddTransaction.tsx';
import Amount from './Amount.tsx';
import CategoryModal from './CategoryModal.tsx';
import CreateCategoryBtn from './CreateCategoryBtn.tsx';
import CurrentDate from './CurrentDate.tsx';
import FilterCategories from './FilterCategories.tsx';
import PageSwitch from './PageSwitch.tsx';
import SingleTransaction from "./SingleTransaction.tsx";

export const Index = () => {
    const {incomeExpenseType: type} = typeStore();
    const [selectedDate, setSelectedDate] = useState<moment.Moment | Date>(moment());
    const {userCategories, selectedCategoryName, setSelectedCategory, addCategoryMutation} = useCategories();
    const {addTransactionMutation, amount, setAmount, isLoading} = useTransactions({type, period: Period.DAY, setSelectedCategory});
    const {transactions: dailyTransactions} = transactionStore();
    const [filter, setFilter] = useState("");
    const [openModal, setOpenModal] = useState<string | undefined>();
    const filteredCats = useFilteredCats({userCategories, filter});

    return (
        <main className="bg-slate-900 flex flex-col h-screen justify-between">;

            <PageSwitch page={ComponentPage.IncomeExpense} />

            <div className="flex-col space-y-10" >

                <section className={`flex w-[95%] justify-around m-auto mt-10`}>
                    <Amount amount={amount} setAmount={setAmount} />
                    <FilterCategories filter={filter} setFilter={setFilter} />
                </section>

                <div className="grid grid-cols-4 w-[95%] m-auto border border-gray-600 rounded-xl bg-slate-800 h-44 overflow-y-auto scroll-smooth" >
                    {filteredCats && filteredCats.map((category, i) => {
                        return (
                            <div onClick={() => setSelectedCategory(i)} id="2344" key={category.name} className="flex-col space-y-1 justify-center items-center my-2" >
                                <div tabIndex={0} className={`p-2 rounded-lg w-fit m-auto bg-lime-500 focus:ring-2 focus:outline-none focus:ring-lime-300`} >
                                    <span>{getIcon(category.name)}</span>
                                </div>
                                <div className={`bg-lime-700 w-fit rounded-lg px-2 m-auto ${isCategorySelected(selectedCategoryName, category.name) && 'bg-lime-500 shadow-md shadow-lime-300'}`} >
                                    <p className="text-center text-gray-300" >{category.name}</p>
                                </div>
                            </div>
                        )
                    })}
                    <CreateCategoryBtn setOpenModal={setOpenModal} />
                </div>
            </div>

            <section className="w-[95%] my-2 mx-auto" >
                <Datepicker theme={customTheme} autoHide onSelectedDateChanged={(d) => {
                    const temp = moment(d);
                    if (temp.date() == 1) {
                        temp.add(1, 'day');
                    }
                    setSelectedDate(temp)
                }} />
            </section>

            <AddTransaction selectedCategoryName={selectedCategoryName} date={selectedDate} amount={amount} addTransaction={addTransactionMutation} />

            <section className={`mb-4 w-full mx-auto h-60 max-h-80 overflow-y-auto`} >
                <div className='flex items-center justify-between w-[90%] mx-auto text-gray-500' >
                    <h2 className=' text-lg font-medium' >Overview</h2>
                    <CurrentDate />
                </div>

                {/* <p className="text-right text-stone-400 pr-3">{isExpensePage ? 'Daily Expenses:' : 'Daily Income'}</p> */}

                {dailyTransactions && dailyTransactions.map((transaction: Transaction, i: Key | null | undefined) => {
                    return (isLoading ?
                        <div className='w-[95%] mx-auto' > <Skeleton sx={{marginLeft: "auto", marginRight: "auto", margin: "0.5rem"}} animation="pulse" variant="rounded" width={350} height={40} /> </div>
                        :
                        <SingleTransaction transaction={transaction} key={i} />
                    );
                })}

            </section>

            <CategoryModal openModal={openModal} setOpenModal={setOpenModal} addCategory={addCategoryMutation} userCategories={userCategories} />

        </main >
    )
}
