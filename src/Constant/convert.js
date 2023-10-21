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

export const skillMatrixWithDate = (date, skill) => {
  const todayDate = new Date();
  const targetDate = new Date(date);

  let differenceInMilliseconds = Math.abs(todayDate - targetDate);
  let differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays > 7) {
    return skill;
  } else {
    return differenceInDays;
  }
};
