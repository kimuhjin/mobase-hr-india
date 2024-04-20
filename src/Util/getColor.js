export const getColor = (company) => {
  const company_ = company?.toLowerCase();
  if (company_ === "mobase")
    return {
      backgroundColor: "#0026e1",
      color: "#fff",
    };
  else if (company_ === "get")
    return {
      backgroundColor: "#99b8d7",
      color: "#000",
    };
  else if (company_ === "cl")
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
