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
import Logo from "./only_logo_blue.png";

import NotoSansBold from "../../Assets/fonts/NotoSans-Bold.ttf";
import NotoSansMedium from "../../Assets/fonts/NotoSans-Medium.ttf";
import NotoSansSemiBold from "../../Assets/fonts/NotoSans-SemiBold.ttf";
import NotoSansRegular from "../../Assets/fonts/NotoSans-Regular.ttf";
import NotoSansThin from "../../Assets/fonts/NotoSans-Thin.ttf";
import { groupObj } from "../../Constant/convert";
const PdfCetificate = ({ watch, img }) => {
  Font.register({
    family: "Noto Sans",
    fonts: [
      {
        src: NotoSansThin,
        fontWeight: "thin",
      },
      {
        src: NotoSansMedium,
        fontWeight: "medium",
      },
      {
        src: NotoSansSemiBold,
        fontWeight: "semibold",
      },

      {
        src: NotoSansBold,
        fontWeight: "bold",
      },
      {
        src: NotoSansRegular,
        fontWeight: "normal",
      },
    ],
  });
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Noto Sans",
    },
  });
  return (
    <Document title={`${watch("name")} Certificate`} style={styles.page}>
      <Page style={{ padding: "20px 30px 30px 30px" }}>
        <View style={{ paddingHorizontal: 40 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <Image
              style={{ width: 48, height: 36, marginRight: "12px" }}
              src={Logo}
            />
            <Text style={{ fontWeight: 700 }}>MOBASE ELECTRONICS POLAND</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "80px",
            fontWeight: 700,
            fontSize: 26,
            borderRadius: "12px",
            border: "1px solid #575aa3",
            backgroundColor: "#575aa3a5",
            marginBottom: "30px",
          }}
        >
          <Text style={{ marginBottom: "4px" }}>CERTYFIKAT</Text>
          <Text>CERTYFICATE</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "30px",
            padding: "0px 30px",
          }}
        >
          <View style={{ width: "100%", fontWeight: 700, fontSize: 18 }}>
            <Text>IMIĘ I NAZWISKO</Text>
            <Text
              style={{ fontWeight: 400, fontSize: 16, marginBottom: "10px" }}
            >
              : {watch("name")}
            </Text>
            <Text>OBSZAR</Text>
            <Text style={{ fontWeight: 400, fontSize: 16 }}>
              : {groupObj[watch("group")]}
            </Text>
          </View>

          <Image
            style={{ width: 150, height: 150 }}
            src={img.toString()}
            cache={false}
          />

          {/*image*/}
        </View>
        {watch("inspectorCertificate") === "YES" && (
          <View
            style={{
              width: "100%",
              height: "200px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              fontWeight: 700,
              fontSize: "20",
              borderRadius: "12px",
              border: "1px solid #575aa3",
              backgroundColor: "#575aa3a5",
              marginBottom: "30px",
            }}
          >
            <Text style={{ color: "#0a0a8f", marginBottom: "8px" }}>
              CERTYFIKAT INSPEKTORA PRODUKCJI
            </Text>
            <Text style={{ fontSize: "16", fontWeight: "500" }}>
              DATA OTRZYMANIA CERTYFIKATU :{watch("inspectorCertificateDate")}
            </Text>
            <Text style={{ color: "#0a0a8f", margin: "20px 0px 60px" }}>
              PODPIS OSOBY ZATWIERDZAJĄCEJ
            </Text>
            <Text style={{ fontSize: "16", fontWeight: "500" }}>
              Kierownik zespołu produkcyjnego _______________
            </Text>
          </View>
        )}
        {watch("solderingCertificate") === "YES" && (
          <View
            style={{
              width: "100%",
              height: "200px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              fontWeight: 700,
              fontSize: "20",
              borderRadius: "12px",
              border: "1px solid #575aa3",
              backgroundColor: "#575aa3a5",
              marginBottom: "30px",
            }}
          >
            <Text style={{ color: "#0a0a8f", marginBottom: "8px" }}>
              CERTYFIKAT OSOBY LUTUJĄCEJ
            </Text>
            <Text style={{ fontSize: "16", fontWeight: "500" }}>
              DATA OTRZYMANIA CERTYFIKATU :{watch("solderingCertificateDate")}
            </Text>
            <Text style={{ color: "#0a0a8f", margin: "20px 0px 60px" }}>
              PODPIS OSOBY ZATWIERDZAJĄCEJ
            </Text>
            <Text style={{ fontSize: "16", fontWeight: "500" }}>
              Kierownik zespołu produkcyjnego ______________
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};
export default PdfCetificate;
