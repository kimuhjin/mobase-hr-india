import { pdf } from "@react-pdf/renderer";

const openPDF = (blob) => {
  if (!blob) return;

  const fileURL = URL.createObjectURL(
    new Blob([blob], { type: "application/pdf" })
  );
  window.open(fileURL);
};

export const documentOpenToWindow = async (document) => {
  const blob = await pdf(document).toBlob();

  await openPDF(blob);
};
