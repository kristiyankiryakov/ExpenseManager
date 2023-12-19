
// import {AiOutlineDownload, AiOutlineUpload} from "react-icons/ai";
import {BarChart} from "@mui/x-charts"
import useHomeChart from "../hooks/useHomeChart.ts";
import {dataset, chartSetting} from "../helpers/chartSettings.ts";

const IncomeVsExpenses = () => {
    // const chart = useHomeChart(dataset);

    return (
        <main className="flex-col w-[95%] mx-auto">
            <section className=" border border-gray-600 rounded-xl" >
                <BarChart
                    // dataset={chart ?? dataset}
                    dataset={dataset}
                    xAxis={[{scaleType: 'band', dataKey: 'month'}]}
                    series={[
                        {dataKey: 'Income', label: 'Income', color: '#7cb937'},
                        {dataKey: 'Expense', label: 'Expense', color: '#b7cd10'},
                    ]}
                    slotProps={{
                        legend: {

                            labelStyle: {
                                fontSize: 16,
                                fontWeight: 500,
                                fill: '#f1f1f1 ',
                            },
                        },
                    }}

                    {...chartSetting}
                />
            </section>
        </main>
    )
}

export default IncomeVsExpenses 