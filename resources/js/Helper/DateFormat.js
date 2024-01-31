export default function DateFormat() {
    const date = new Date;
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const dateNumber = date.getDate();
    const day = date.toLocaleString('default', { weekday: 'long' });

    return {
        year,
        month,
        dateNumber,
        day
    };
}
