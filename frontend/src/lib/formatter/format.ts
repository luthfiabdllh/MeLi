 function formatNumber(num: number) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
    return num.toString();
  }

  function truncate(str: string, max: number) {
    return str.length > max ? str.slice(0, max) + "..." : str;
}
    function formatDate(date: string) {
        const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        };
        return new Date(date).toLocaleDateString("en-US", options);
    }
    
    export { formatNumber, truncate, formatDate };