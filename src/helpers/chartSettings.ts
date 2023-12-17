import {axisClasses} from '@mui/x-charts';

type DataItem = {
    Income: number;
    Expense: number;
    month: string;
};

const chartSetting = {
    yAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    width: 350,
    height: 400,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};
const dataset: DataItem[] = [
    {
        Income: 65,
        Expense: 60,
        month: 'Aug',
    },
    {
        Income: 51,
        Expense: 51,
        month: 'Sept',
    },
    {
        Income: 60,
        Expense: 65,
        month: 'Oct',
    },
    {
        Income: 67,
        Expense: 64,
        month: 'Nov',
    },
    {
        Income: 61,
        Expense: 70,
        month: 'Dec',
    },
];

export {chartSetting, dataset};
export type {DataItem};
