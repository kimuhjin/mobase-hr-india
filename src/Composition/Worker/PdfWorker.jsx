import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import { groupObj } from "../../Constant/convert";
const Pdfworker = ({ watch, skillMatrix, img }) => {
  Font.register({
    family: "Roboto",
    src: "https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmSU5vAw.ttf",
  });
  Font.register({
    family: "Roboto",
    src: "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmSU5fBBc9.ttf",
  });
  Font.register({
    family: "Roboto",
    src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
  });
  Font.register({
    family: "Roboto",
    src: "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc9.ttf",
  });
  Font.register({
    family: "Roboto",
    src: "https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc9.ttf",
  });

  // Create style with font-family
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
    },
  });
  return (
    <Document title={watch("name")} style={styles.page}>
      <Page>
        {/* Header */}
        <View style={{ paddingTop: 30, paddingHorizontal: 40 }}>
          <Text
            style={{
              width: "100%",
              borderBottom: "4px solid #000",
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Basic Info
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View>
              {watch("group") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Group: {groupObj[watch("group")]}
                </Text>
              ) : null}

              {watch("employeeNumber") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Employee Number: {watch("employeeNumber")}
                </Text>
              ) : null}
              {watch("company") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Company: {watch("company")}
                </Text>
              ) : null}
              {watch("area") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Area: {watch("area")}
                </Text>
              ) : null}
              {watch("position") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Position: {watch("position")}
                </Text>
              ) : null}
              {watch("employmentDate") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Date of employment: {watch("employmentDate")}
                </Text>
              ) : null}
              {watch("employmentDate_Mobase") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Date of employment (Mobase): {watch("employmentDate_Mobase")}
                </Text>
              ) : null}
              {watch("inspectorCertificate") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Inspector Certificate: {watch("inspectorCertificate")}
                </Text>
              ) : null}
              {watch("inspectorCertificateDate") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Inspector Certificate Date:
                  {watch("inspectorCertificateDate")}
                </Text>
              ) : null}
              {watch("solderingCertificate") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Soldering Certificate: {watch("solderingCertificate")}
                </Text>
              ) : null}
              {watch("solderingCertificateDate") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Soldering Certificate: {watch("solderingCertificateDate")}
                </Text>
              ) : null}
              {watch("deputyTeamLeader") ? (
                <Text style={{ fontSize: 14, marginBottom: 4 }}>
                  Deputy Supervisor: {watch("deputyTeamLeader")}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                width: 150,
                height: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 150, height: "150" }}
                src={img.toString()}
                cache={false}
              />

              <Text style={{ fontSize: 14, marginTop: 4 }}>
                {watch("name")}
              </Text>
            </View>
          </View>
          {skillMatrix.length > 0 ? (
            <View>
              <Text
                style={{
                  width: "100%",
                  borderBottom: "4px solid #000",
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 10,
                  marginTop: 50,
                }}
              >
                Skill Matrix
              </Text>

              {skillMatrix.map((label) => {
                return (
                  <Text style={{ fontSize: 12, marginBottom: 4 }} key={label}>
                    {label}
                  </Text>
                );
              })}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
};
export default Pdfworker;
