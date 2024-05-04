export const groupObj = {
  smt: "SMT(smt)",
  eol: "SMT(eol)",
  switch: "ASS'Y(switch)",
  keyset: "ASS'Y(keyset)",
  quality_team: "Quality team",
  material_team: "Material team",
  sales_team: "Sales team",
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
