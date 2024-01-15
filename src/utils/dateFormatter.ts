export function convertYMDtoDMY(ymdDate:string) {
    const [year, month, day] = ymdDate.split('-');
    const dmyDate = `${day}-${month}-${year}`;
    return dmyDate;
  }