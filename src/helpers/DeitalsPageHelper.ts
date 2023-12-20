
export type item = {
    color: string
    data: number
    endAngle: number
    formattedValue: string
    id: string
    index: number
    label: string
    padAngle: number
    startAngle: number
    value: number
}

export type chartItem = {
    label: string
    value: number
    color: string
}

export const formatDates = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startDay = start.getDate();
    const endDay = end.getDate();

    const startMonth = start.toLocaleString('default', {month: 'short'});
    const endMonth = end.toLocaleString('default', {month: 'short'});

    if (start.getMonth() === end.getMonth()) {
        return `${startDay}${startMonth} - ${endDay}${endMonth} ${end.getFullYear()}`;
    }

    return `${startDay}${startMonth} ${start.getFullYear()} - ${endDay}${endMonth} ${end.getFullYear()}`;
}

export const formatForChart = (data: {[key: string]: number}) => {
    const modified = Object.keys(data).map((category: string) => {
        return {
            label: category,
            value: data[category],
            color: Color[category] ?? '#34a835'
        };
    });
    return modified
}

export const SelectedBkg = 'bg-lime-400 shadow-lg shadow-lime-500/50';
export const DeSelectedBkg = 'bg-lime-800 bg-opacity-60 shadow-lg';

export const sizing = {
    height: 250,
    legend: {
        direction: "column",
        position: {vertical: 'top', horizontal: "right"},
        padding: NaN,
    }
};

export const Color: {[key: string]: string} = {
    Food: "#b9d04c",
    Other: "#b7cd10",
    Fuel: "#a5ce8a",
    Rent: "#76a770",
    Bills: "#6ab767",
    Phone: "#4eae4a",
}

export const dummy = [
    {label: 'Group A', value: 400, color: '#0088FE'},
    {label: 'Group B', value: 300, color: '#00C49F'},
    {label: 'Group C', value: 300, color: '#FFBB28'},
    {label: 'Group D', value: 200, color: '#FF8042'},
];

export const getArcLabel = (item: item, sum:number): string => {
    if (sum) return `${((item.value / sum) * 100).toFixed(0)}%`;
    return '';
};

