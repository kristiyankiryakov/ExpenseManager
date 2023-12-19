
type Props = {
    addExpense: () => void
}

const AddTransaction = ({addExpense}: Props) => {
    return (
        <section className="w-[95%] mx-auto" >
            <button onClick={addExpense} type="button" className="w-full text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Add</button>
        </section>

    )
}

export default AddTransaction