import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Col,
  Row,
  Button,
  Upload,
  message
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getUniversities } from "../../../services/universityService";
import { getMajors } from "../../../services/majorService";
import { newCourse } from "../../../services/courseService";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 }
};

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class ClassForm extends Component {
  state = {
    loading: false,
    schoolOptions: [],
    majorOptions: [],
    semester: [
      "2020 Spring",
      "2020 Fall",
      "2021 Spring",
      "2021 Fall",
      "2022 Spring",
      "2022 Fall"
    ],
    data: {}
  };

  componentDidMount = async () => {
    const { data: schoolOptions } = await getUniversities();
    const { data: majorOptions } = await getMajors();

    const token = localStorage.getItem("token");

    this.setState({
      schoolOptions,
      majorOptions,
      token: { "x-auth-token": token }
    });
  };

  handleUpload = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          data: { ...this.state.data, thumbnail: info.file.response },
          imageUrl,
          loading: false
        });
      });
    }
  };

  onChangeThumb = e => {
    this.setState({
      thumbnail: e.target.value
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleValue = (value, name) => {
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };

  onSubmit = async value => {
    console.log(value);
    // e.preventDefault();
    const { data } = this.state;
    // if (
    //   data.university &&
    //   data.major &&
    //   data.name &&
    //   data.number &&
    //   data.semester
    // ) {
    try {
      await newCourse(data);
      message.success(`${data.name} has been created successfully.`);
      this.setState({ data: {} });
      this.props.history.replace("/dashboard/admin/classes");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        message.error(ex.response.data);
    }
    // } else message.error("Please fill every required field");
  };

  render() {
    const {
      schoolOptions,
      majorOptions,
      semester,
      loading,
      imageUrl,
      data
    } = this.state;

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Card style={{ width: "85%", margin: "0 auto" }}>
        {data && (
          <Form
            {...layout}
            style={{ paddingTop: "2em", paddingLeft: "3em" }}
            onFinish={this.onSubmit}
            hideRequiredMark
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  label="University"
                  name="university"
                  rules={[
                    { required: true, message: "Please input university!" }
                  ]}
                >
                  <Select
                    name="university"
                    showSearch
                    value={data.university}
                    placeholder="Select university"
                    optionFilterProp="children"
                    onChange={e => this.handleValue(e, "university")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {schoolOptions.map(x => (
                      <Option value={x._id} key={x._id}>
                        {x.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="major"
                  label="Major"
                  rules={[{ required: true, message: "Please input major!" }]}
                >
                  <Select
                    name="major"
                    showSearch
                    value={data.major}
                    placeholder="Select Major"
                    optionFilterProp="children"
                    onChange={e => this.handleValue(e, "major")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {majorOptions.map(x => (
                      <Option value={x._id} key={x._id}>
                        {x.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="name"
                  label="Class Name"
                  rules={[
                    { required: true, message: "Please input class name!" }
                  ]}
                >
                  <Input
                    placeholder="Enter class name"
                    name="name"
                    onChange={this.handleChange}
                    value={data.name}
                  />
                </Form.Item>

                <Form.Item
                  name="number"
                  label="Class number"
                  rules={[
                    { required: true, message: "Please input class number!" }
                  ]}
                >
                  <Input
                    placeholder="Enter class number"
                    name="number"
                    onChange={this.handleChange}
                    value={data.number}
                  />
                </Form.Item>

                <Form.Item
                  name="semester"
                  label="Semester"
                  rules={[
                    { required: false, message: "Please Choose semester" }
                  ]}
                >
                  <Select
                    placeholder="Choose semester"
                    onChange={e => this.handleValue(e, "semester")}
                  >
                    {semester.map(s => (
                      <Option value={s} key={s}>
                        {s}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="laoshi"
                  label="Laoshi"
                  rules={[{ required: false }]}
                >
                  <Input
                    placeholder="Enter laoshi"
                    name="laoshi"
                    onChange={this.handleChange}
                    value={data.laoshi}
                  />
                </Form.Item>

                <Form.Item
                  name="weeks"
                  label="Class week"
                  rules={[{ required: false }]}
                >
                  <Input
                    placeholder="Enter class Week"
                    name="weeks"
                    onChange={this.handleChange}
                    value={data.weeks}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="time"
                  label="Class time"
                  rules={[{ required: false }]}
                >
                  <Input
                    placeholder="Enter class time"
                    name="time"
                    onChange={this.handleChange}
                    value={data.time}
                  />
                </Form.Item>

                <Form.Item
                  name="classroom"
                  label="Classroom"
                  rules={[{ required: false }]}
                >
                  <Input
                    placeholder="Enter classroom"
                    name="classroom"
                    onChange={this.handleChange}
                    value={data.classroom}
                  />
                </Form.Item>

                <Form.Item
                  name="qqNumber"
                  label="QQ number"
                  rules={[{ required: false }]}
                >
                  <Input
                    placeholder="Enter QQ number"
                    name="qqNumber"
                    onChange={this.handleChange}
                    value={data.qqNumber}
                    type="string"
                  />
                </Form.Item>

                <Form.Item
                  name="notes"
                  label="Notes"
                  rules={[{ required: false }]}
                >
                  <Input.TextArea
                    placeholder="Enter notes"
                    name="notes"
                    onChange={this.handleChange}
                    value={data.notes}
                  />
                </Form.Item>
                <Form.Item
                  name="thumbnail"
                  label="Thumbnail"
                  rules={[{ required: false }]}
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://localhost:5000/api/courses/thumbnail"
                    headers={this.state.token}
                    beforeUpload={beforeUpload}
                    onChange={this.handleUpload}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="thumbnail"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>

                <Form.Item
                  style={{
                    float: "right",
                    marginRight: "2em"
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    // onClick={this.onSubmit}
                  >
                    Create class
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Card>
    );
  }
}

export default ClassForm;
