import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "axios";

class ioTHistorical extends React.Component {
  constructor(props) {
    super(props);
    this.handleSendDataToDevice = this.handleSendDataToDevice.bind(this);
    this.state = {
      deviceStatus: false,
    };
  }

  handleSendDataToDevice() {
    this.setState((prevState) => ({
      deviceStatus: !prevState.deviceStatus,
    }));
    const status = true === 0 ? "OFF" : "ON";
    const url = `https://us-west2-cmpe-297-291423.cloudfunctions.net/test?message=${status}`;

    axios(url, {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {});
  }
  render() {
    return (
      <div>
        <Container>
          <Row className="show-grid">
            <h4> IoT DEVICE ON/OFF</h4>
            <BootstrapSwitchButton
              checked={false}
              onlabel="ON"
              offlabel="OFF"
              onChange={this.handleSendDataToDevice}
              size="lg"
            />
          </Row>
        </Container>
      </div>
    );
  }
}

export default ioTHistorical;
