import { ImportOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import React, { useRef } from "react";
import { CSVReader } from "react-papaparse";
import { useDispatch } from "react-redux";
import productActions from "../redux/actions/products.actions";

const UploadButton = () => {
  const buttonRef = useRef();
  const dispatch = useDispatch();
  const handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };
  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };
  const handleOnFileLoad = async (data) => {
    console.log(data);
    const products = data.map((csvData) => {
      return {
        id: csvData.data["Product ID"],
        name: csvData.data["Product Name"],
        price: csvData.data["Price"],
        s: csvData.data["Quantity (S)"],
        m: csvData.data["Quantity (M)"],
        l: csvData.data["Quantity (L)"],
      };
    });
    dispatch(productActions.importProducts(products));
  };

  return (
    <Row>
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
        config={{ header: true }}
        style={{}}
      >
        {({ file }) => (
          <div style={{ display: "flex" }}>
            <Button
              onClick={handleOpenDialog}
              style={{
                borderRadius: 0,
                marginLeft: "10px",
                marginRight: 0,
                width: "90px",
                height: "48px",
                paddingLeft: 0,
                paddingRight: 0,
              }}
              icon={<ImportOutlined />}
            >
              Import
            </Button>
          </div>
        )}
      </CSVReader>
    </Row>
  );
};

export default UploadButton;
