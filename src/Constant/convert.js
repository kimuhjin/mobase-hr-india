export const groupObj = {
  "1ks_4mf": "0th floor (1KS & 4MF)",
  ofd: "0th floor  (OFD)",
  "5sr": "clean room (5RC)",
  "3cl": "clean room (3CL)",
  ren: " 1st floor (Ren)",
  smt: "smt (SMT)",
};

export const groupTitle = (value) => {
  if (value === "admin") return "Admin";
  else return groupObj[value];
};

export const skillMatrixWithDate = (date, skill) => {
  const todayDate = new Date();
  const targetDate = new Date(date);

  let differenceInMilliseconds = Math.abs(todayDate - targetDate);
  let differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );
  if (!date) return skill;
  else {
    if (differenceInDays > 7) {
      return skill;
    } else {
      return differenceInDays;
    }
  }
};
