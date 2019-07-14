import * as React from "react";
import { rootState } from "store/reducers";
import { connect } from "react-redux";
import { Home } from "components";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namefrom: "",
      emailfrom: "",
      namefor: "",
      emailfor: "",
      theme: "",
      content: "",
      valCheckMsg: ["", "", "", ""],
      checkall: false
    };
    this.changeInput = this.changeInput.bind(this);
    this.validationCheck = this.validationCheck.bind(this);
  }
  changeInput = (num, e) => {
    const checkMsg = [
      ...this.state.valCheckMsg.slice(0, num),
      "",
      ...this.state.valCheckMsg.slice(num + 1)
    ];
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      ...this.state,
      valCheckMsg: checkMsg,
      [id]: value
    });
  };
  validationCheck = (num, e) => {
    const checkMsg = [
        ...this.state.valCheckMsg.slice(0, num),
        "",
        ...this.state.valCheckMsg.slice(num + 1)
      ],
      emailCheck = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/,
      value = e.target.value;

    switch (num) {
      case 0:
        if (value === "") {
          checkMsg[num] = "Имя не может быть пустым";
        } else if (false) {
          checkMsg[num] = "Please enter correct name format";
        }
        break;
      case 1:
        if (value === "") {
          checkMsg[num] = "Email не может быть пустым";
        } else if (!emailCheck.test(value)) {
          checkMsg[num] = "Please enter correct email format";
        }
        break;
      case 2:
        if (value === "") {
          checkMsg[num] = "Тема письма не может быть пустым";
        } else if (false) {
          checkMsg[num] = "Please enter correct theme format";
        }
        break;
      case 3:
        if (value === "") {
          checkMsg[num] = "Сообщение не может быть пустым";
        } else if (false) {
          checkMsg[num] = "Please enter correct contens format";
        }
        break;
      default:
        break;
    }
    this.setState(
      {
        valCheckMsg: checkMsg
      },
      this.beforeAuth
    );
  };
  render() {
    return (
      <>
        <Home
          changeInput={this.changeInput}
          validationCheck={this.validationCheck}
          valCheckMsg={this.state.valCheckMsg}
        />
      </>
    );
  }
}

const mapStateToProps = rootState => ({});

const mapDispatchToProps = dispatch => ({});

const connectModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);

export default connectModule;
