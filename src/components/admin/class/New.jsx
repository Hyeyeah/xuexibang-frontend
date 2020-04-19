import React, { Component } from "react";

import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  DatePicker,
  message
} from "antd";

class New extends Component {
  state = {
    data: {
      date: "",
      content: "",
      deadline: ""
    }
  };

  onChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  onSubmitAnnounce = value => {
    console.log("onOk: ", value);
    this.success();
    this.props.onClose();
  };

  onSubmitHomework = value => {
    console.log("onOk: ", value);
    this.success();
    this.props.onClose();
  };

  success = () => {
    message.success(`${this.props.mode} has been posted.`);
  };

  render() {
    const { onClose, visible, mode } = this.props;
    return (
      <div>
        <Drawer
          title={
            mode === "Announcement"
              ? "Create an announcement"
              : "Create a homework"
          }
          width={600}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          placement="left"
          footer={
            <div
              style={{
                textAlign: "right"
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                onClick={
                  mode === "Announcement"
                    ? this.onSubmitAnnounce
                    : this.onSubmitHomework
                }
                type="primary"
              >
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical" hideRequiredMark>
            <p style={{ fontWeight: 600 }}>线性代数 123456</p>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "please enter description"
                    }
                  ]}
                >
                  <Input.TextArea
                    name="content"
                    onChange={this.onChange}
                    rows={8}
                    placeholder="please enter description"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="deadline"
                  label={
                    mode === "Announcement" ? "Deadline (optional)" : "Deadline"
                  }
                  rules={[
                    {
                      required: false
                    }
                  ]}
                >
                  <DatePicker
                    name="deadline"
                    showTime
                    onChange={this.onChange}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default New;