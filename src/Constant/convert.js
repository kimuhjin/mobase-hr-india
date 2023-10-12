const group = {
  "1ks_4mf": "1KS & 4MF",
  ofd: "OFD",
  "5sr": "5RC",
  "3cl": "3CL",
  ren: " Ren",
  smt: "SMT",
};

export const groupTitle = (value) => {
  if (value === "admin") return "Admin";
  else return group[value];
};
