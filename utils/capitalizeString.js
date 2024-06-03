export const capitalizeString = (str) => {
    if(typeof str !== "string") return ""
    return str
        .split(" ")
        .map((item) => 
            item[0].toUpperCase() + 
            item.slice(1).toLowerCase()
        )
        .join(" ");
}