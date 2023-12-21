import {axisClasses} from '@mui/x-charts';

type DataItem = {
    income: number;
    expense: number;
    month: string;
};

const chartSetting = {
    yAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    width: 350,
    height: 300,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};
const dataset: DataItem[] = [
    {
        income: 65,
        expense: 60,
        month: 'Aug',
    },
    {
        income: 51,
        expense: 51,
        month: 'Sept',
    },
    {
        income: 60,
        expense: 65,
        month: 'Oct',
    },
    {
        income: 67,
        expense: 64,
        month: 'Nov',
    },
    {
        income: 61,
        expense: 70,
        month: 'Dec',
    },
];

export {chartSetting, dataset};
export type {DataItem};
