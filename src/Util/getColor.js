export const getColor = (company) => {
  console.log(company.toLowerCase());
  if (company.toLowerCase() === "mobase")
    return {
      backgroundColor: "#0026e1",
      color: "#fff",
    };
  else if (company.toLowerCase() === "get")
    return {
      backgroundColor: "#99b8d7",
      color: "#000",
    };
  else if (company.toLowerCase() === "cl")
    return {
      backgroundColor: "#d5e6f7",
      color: "#000",
    };
  else
    return {
      backgroundColor: "#000",
      color: "#fff",
    };
};
