export function getDateISOFormat(currentDate,late){
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T${late?"23:59:00.000":"00:00:00.000"}`;
    return formattedDate
}