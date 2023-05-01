import React from "react";
import {
  Text,
  Page,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ITransaction } from "../../utils/types";
import { getDate } from "../../utils/formatDate";
import { formatRupiah } from "../../utils/currency";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  title2: {
    fontSize: 20,
    margin: 16,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "light",
    textAlign: "center",
  },
  text: {
    margin: 6,
    fontSize: 14,
  },
  section1: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  headTable: {
    display: "flex",
    gap: -1,
    margin: -1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textHeaderTable: {
    margin: 0,
    width: "100%",
    padding: 8,
    fontSize: 14,
    border: 1,
    borderStyle: "solid",
    borderColor: "gray",
  },
  textBodyTable: {
    margin: 0,
    width: "100%",
    padding: 8,
    fontSize: 14,
    borderLeft: 1,
    borderRight: 1,
    borderStyle: "solid",
    borderColor: "gray",
  },
  textBodyTable2: {
    margin: 0,
    width: "100%",
    padding: 8,
    fontSize: 14,
    backgroundColor: "#eee",
    borderLeft: 1,
    borderRight: 1,
    borderStyle: "solid",
    borderColor: "gray",
  },
  textFooterTable: {
    margin: 0,
    width: "100%",
    padding: 8,
    fontSize: 14,
    borderTop: 1,
    borderStyle: "solid",
    borderColor: "gray",
  },
  textTotalTable: {
    width: "100%",
    padding: 8,
    fontSize: 14,
    borderLeft: 1,
    borderRight: 1,
    borderBottom: 1,
    borderStyle: "solid",
    borderColor: "gray",
  },
});

type props = {
  invoice: ITransaction;
};

const PdfFile = ({ invoice }: props) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.title}>Bali Karisma</Text>
        <Text style={styles.subTitle}>Jalan Subak Dalem GG 2 No. 4</Text>
        <Text style={styles.subTitle}>No. Hp : 081239528261</Text>
        <Text style={styles.title2}>INVOICE</Text>
        <View style={styles.section1}>
          <Text style={styles.text}>{getDate(invoice?.createdAt)}</Text>
          <Text style={styles.text}>Pelanggan: {invoice?.customer?.name}</Text>
        </View>
        <Text style={styles.text}>No Invoice: {invoice?.invoice_no}</Text>
        <Text style={styles.text}>Tipe Pembayaran: Cash</Text>
        <View style={styles.headTable}>
          <Text style={{ ...styles.textHeaderTable, flex: 1 }}>Jml</Text>
          <Text style={{ ...styles.textHeaderTable, flex: 5 }}>Produk</Text>
          <Text style={{ ...styles.textHeaderTable, flex: 3 }}>Harga</Text>
          <Text style={{ ...styles.textHeaderTable, flex: 3 }}>Total</Text>
        </View>
        <View>
          {invoice?.carts?.map((val, index: number) => {
            return (
              <View key={val._id} style={styles.headTable}>
                <Text
                  style={
                    index % 2 === 1
                      ? { ...styles.textBodyTable, flex: 1 }
                      : { ...styles.textBodyTable2, flex: 1 }
                  }
                >
                  {val.qty}
                </Text>
                <Text
                  style={
                    index % 2 === 1
                      ? { ...styles.textBodyTable, flex: 5 }
                      : { ...styles.textBodyTable2, flex: 5 }
                  }
                >
                  {val.product}
                </Text>
                <Text
                  style={
                    index % 2 === 1
                      ? { ...styles.textBodyTable, flex: 3 }
                      : { ...styles.textBodyTable2, flex: 3 }
                  }
                >
                  {formatRupiah(
                    val.additional_price ? val.additional_price : val.price
                  )}
                </Text>
                <Text
                  style={
                    index % 2 === 1
                      ? { ...styles.textBodyTable, flex: 3 }
                      : { ...styles.textBodyTable2, flex: 3 }
                  }
                >
                  {formatRupiah(val.total)}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.headTable}>
          <Text style={styles.textFooterTable}></Text>
          <Text style={styles.textFooterTable}></Text>
          <Text style={styles.textFooterTable}></Text>
          <Text style={{ ...styles.textFooterTable, backgroundColor: "#ccc" }}>
            {formatRupiah(invoice.grand_total)}
          </Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PdfFile;
