import React, { Component } from "react";
import { Tooltip } from "antd";
import { CommentOutlined } from "@ant-design/icons";

class Actions extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span onClick={this.props.onClick} style={{ cursor: "pointer" }}>
            <Tooltip title="Comment">
              <CommentOutlined />
            </Tooltip>
            <span> 23 Comments</span>
          </span>

          <div>3days left</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Actions;
