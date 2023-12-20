
const Color: {[key: string]: string} = {
    Food: "#b9d04c",
    Other: "#b7cd10",
    Fuel: "#a5ce8a",
    Rent: "#76a770",
    Bills: "#6ab767",
    Phone: "#4eae4a",
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