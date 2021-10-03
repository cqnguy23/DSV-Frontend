import { Button, Col, Divider, Form, Input, Layout, Rate, Row } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import productActions from "../redux/actions/products.actions";

const Reviews = () => {
  const { TextArea } = Input;
  const params = useParams();
  const dispatch = useDispatch();
  const productID = params.id;
  const reviews = useSelector(
    (state) => state.products.selectedProduct.product.reviewsID
  );
  const onFinish = (values) => {
    dispatch(productActions.addReview({ productID, review: values }));
  };
  return (
    <Layout style={{ minHeight: "70vh" }} id="review-form">
      <Divider orientation="left" plain>
        Reviews
      </Divider>
      <Row>
        <Col
          style={{ marginLeft: "116px", fontSize: "14px", fontWeight: "bold" }}
          span={3}
        >
          {" "}
          Your Review{" "}
        </Col>
        <Col span={16}>
          <Form
            name="control-hooks"
            onFinish={onFinish}
            requiredMark={false}
            className="single-review-form"
            colon={false}
          >
            <Form.Item name="title">
              <Input placeholder="TITLE" />
            </Form.Item>
            <Form.Item name="content">
              <TextArea placeholder="Add your comment here..." rows={6} />
            </Form.Item>
            <Form.Item>
              <Row style={{ justifyContent: "space-between" }}>
                <Col>
                  <div>*Rating for us</div>
                  <Form.Item
                    name="rating"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Rate allowHalf />
                  </Form.Item>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "120px", height: "35px" }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
        <Divider />
      </Row>
      {reviews?.map((review) => {
        return (
          <>
            <Row style={{ margin: "30px 0px 30px 125px" }}>
              <Col
                span={3}
                style={{
                  paddingTop: "20px",
                }}
              >
                <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {review.user.name}
                </div>
                <div>{moment(review.createdAt).format("DD MMM")}</div>
              </Col>
              <Col span={16} className="single-review-post">
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {" "}
                  {review.title}
                </div>
                <Rate disabled allowHalf value={review.rating} />
                <div style={{ marginTop: "20px" }}>{review.content}</div>
              </Col>
            </Row>
            <Divider dashed />
          </>
        );
      })}
    </Layout>
  );
};

export default Reviews;
