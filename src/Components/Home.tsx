import IncomeVsExpenses from './IncomeVsExpenses'

const Home = () => {
    return (
        <main className='d-flex flex-col'>
            <header className='h-36 bg-red-500'>
                Welcome, section
            </header>
            <IncomeVsExpenses />
        </main>
    )
}

export default Home