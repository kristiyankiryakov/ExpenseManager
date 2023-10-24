
// import {AiOutlineDownload, AiOutlineUpload} from "react-icons/ai";
import {BarChart} from "@mui/x-charts"
import {axisClasses} from '@mui/x-charts';

const chartSetting = {
    yAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    width: 500,
    height: 400,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};
const dataset = [
    {
        Income: 65,
        Expenses: 60,
        month: 'Aug',
    },
    {
        Income: 51,
        Expenses: 51,
        month: 'Sept',
    },
    {
        Income: 60,
        Expenses: 65,
        month: 'Oct',
    },
    {
        Income: 67,
        Expenses: 64,
        month: 'Nov',
    },
    {
        Income: 61,
        Expenses: 70,
        month: 'Dec',
    },
];

const IncomeVsExpenses = () => {
    return (
        <>
            {/* <section className='flex justify-around text-stone-300'>
                <div className='Income'>
                    <div className='flex-col w-fit space-y-4 p-3'>
                        <div className='flex-col justify-center items-center bg-green-500 w-fit p-3 rounded-full m-auto'>
                            <AiOutlineDownload size={25} color="white" />
                        </div>
                        <h3 className='text-center text-xl font-medium'>Income</h3>
                        <p className='font-medium text-lg text-center'>$ 6549.32</p>
                    </div>
                </div>

                <div className='Expenses'>
                    <div className='flex-col w-fit space-y-4 p-3'>
                        <div className='flex-col justify-center items-center bg-red-500 w-fit p-3 rounded-full m-auto'>
                            <AiOutlineUpload size={25} color="white" />
                        </div>
                        <h3 className='text-center text-xl font-medium'>Expenses</h3>
                        <p className='font-medium text-lg text-center'>$ 3049.32</p>
                    </div>
                </div>
            </section> */}
            <section className="w-[95%] mx-auto" >
                <BarChart
                    dataset={dataset}
                    xAxis={[{scaleType: 'band', dataKey: 'month'}]}
                    series={[
                        {dataKey: 'Income', label: 'Income', },
                        {dataKey: 'Expenses', label: 'Expenses', },
                    ]}
                    {...chartSetting}
                />
            </section>
        </>
    )
}

export default IncomeVsExpenses