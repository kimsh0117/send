import * as React from "react";
import { sendEmailAction } from "store/actions";
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
      attaches: [],
      valCheckMsg: ["", "", "", "", "", ""],
      checkAll: false
    };
    this.changeInput = this.changeInput.bind(this);
    this.validationCheck = this.validationCheck.bind(this);
    this.beforeSend = this.beforeSend.bind(this);
    this.send = this.send.bind(this);
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
      nameCheck = /^[a-zA-Zа-яА-Я]*$/,
      value = e.target.value;

    switch (num) {
      case 0:
        if (value === "") {
          checkMsg[num] = "Имя не может быть пустым";
        } else if (!nameCheck.test(value)) {
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
          checkMsg[num] = "Имя не может быть пустым";
        } else if (!nameCheck.test(value)) {
          checkMsg[num] = "Please enter correct name format";
        }
        break;
      case 3:
        if (value === "") {
          checkMsg[num] = "Email не может быть пустым";
        } else if (!emailCheck.test(value)) {
          checkMsg[num] = "Please enter correct email format";
        }
        break;
      case 4:
        if (value === "") {
          checkMsg[num] = "Тема письма не может быть пустым";
        } else if (false) {
          checkMsg[num] = "Please enter correct theme format";
        }
        break;
      case 5:
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
      this.beforeSend
    );
  };
  beforeSend = () => {
    if (this.state.valCheckMsg.every(msg => msg === "")) {
      this.setState({
        checkAll: true
      });
    } else {
      this.setState({
        checkAll: false
      });
    }
  };
  send = () => {
    let { theme, namefrom, emailfrom, namefor, emailfor, content } = this.state,
      letter = {
        subject: theme,
        "from.name": namefrom,
        "from.email": emailfrom,
        "to.name": namefor,
        message: { text: content }
      },
      mca = [emailfor];
    // trigger dispatch
    this.props.sendEmail(letter, mca);
  };
  render() {
    let {emailfor, status, messages} = this.props;
    return (
      <>
        <Home
          // methods
          changeInput={this.changeInput}
          validationCheck={this.validationCheck}
          send={this.send}
          // states
          valCheckMsg={this.state.valCheckMsg}
          checkAll={this.state.checkAll}
          // props
          emailfor={emailfor}
          status={status}
          messages={messages}
        />
      </>
    );
  }
}

const mapStateToProps = rootState => ({
  emailfor: rootState.send.emailfor,
  status: rootState.send.sending,
  messages: rootState.send.messages
})

const mapDispatchToProps = dispatch => ({
  sendEmail: (letter, mca) =>
    dispatch(sendEmailAction.sendEmailRequest(letter, mca))
});

const connectModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);

export default connectModule;
