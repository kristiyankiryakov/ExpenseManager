
// import {AiOutlineDownload, AiOutlineUpload} from "react-icons/ai";
import {BarChart} from "@mui/x-charts"
import {chartSetting, dataset} from "../../helpers/chartSettings";
import useHomeChart from "../../hooks/useHomeChart";

const HomeChart = () => {
    const chart = useHomeChart(dataset);

    return (
        <main className="w-[95%] mx-auto">
            <section className=" border border-gray-600 rounded-xl" >
                <BarChart
                    dataset={chart ?? dataset}
                    xAxis={[{scaleType: 'band', dataKey: 'month'}]}
                    series={[
                        {dataKey: 'income', label: 'Income', color: '#7cb937'},
                        {dataKey: 'expense', label: 'Expense', color: '#b7cd10'},
                    ]}
                    slotProps={{
                        legend: {
                            labelStyle: {
                                fontSize: 16,
                                fontWeight: 500,
                                fill: 'white',
                            },
                        },
                    }}

                    {...chartSetting}
                />
            </section>
        </main>
    )
}

export default HomeChart 