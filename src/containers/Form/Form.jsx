import * as React from "react";
import { sendEmailAction } from "store/actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Progress, Form } from "components";

class FormContainer extends React.Component {
  state = {
    namefrom: "",
    emailfrom: "",
    namefor: "",
    emailfor: "",
    theme: "",
    content: "",
    attaches: [],
    sizes: [],
    valCheckMsg: ["", "", "", "", "", ""],
    checkAll: false,
    dragging: false
  };

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
      value = e.target.value.replace(/\s/gi, "");

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
    let {
        theme,
        namefrom,
        emailfrom,
        namefor,
        emailfor,
        content,
        attaches
      } = this.state,
      letter = {
        subject: theme,
        "from.name": namefrom,
        "from.email": emailfrom,
        "to.name": namefor,
        message: { text: content },
        attaches
      },
      mca = [emailfor];
    // trigger dispatch
    this.props.sendEmail(letter, mca);
    this.setState({
      namefrom: "",
      emailfrom: "",
      namefor: "",
      emailfor: "",
      theme: "",
      content: "",
      attaches: [],
      sizes: []
    });
  };
  fileUploadClick = e => {
    let files = e.target.files[0];
    this.fileValidation(files, e);
  };
  fileValidation = (files) => {
    if (
      files.size < 5120 &&
      this.totalCapacity(this.state.sizes) + files.size < 20480
    ) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({
          attaches: [
            ...this.state.attaches,
            {
              name: files.name,
              content: e.target.result,
              encoding: "base64"
            }
          ],
          sizes: [
            ...this.state.sizes,
            {
              name: files.name,
              size: files.size
            }
          ]
        });
      };
      reader.readAsDataURL(files);
    } else {
      toast.error("File is too large", { autoClose: 1500 });
    }
    
  };
  fileDelete = filename => {
    this.setState({
      attaches: this.state.attaches.filter(file => file.name !== filename),
      sizes: this.state.sizes.filter(size => size.name !== filename)
    });
  };
  totalCapacity = sizes =>
    sizes.reduce((acc, value) => {
      return acc + value.size;
    }, 0);

  handleDrop = (file, e) => {
    this.fileValidation(file, e);
  };
  render() {
    return (
      <>
        {!this.props.status ? (
          <Form
            // methods
            changeInput={this.changeInput}
            validationCheck={this.validationCheck}
            send={this.send}
            fileUploadClick={this.fileUploadClick}
            fileDelete={this.fileDelete}
            handleDrop={this.handleDrop}
            // states
            valCheckMsg={this.state.valCheckMsg}
            checkAll={this.state.checkAll}
            attaches={this.state.attaches}
          />
        ) : (
          <Progress emailfor={this.props.emailfor} />
        )}
      </>
    );
  }
}

const mapStateToProps = rootState => ({
  emailfor: rootState.send.emailfor,
  status: rootState.send.sending
});

const mapDispatchToProps = dispatch => ({
  sendEmail: (letter, mca) =>
    dispatch(sendEmailAction.sendEmailRequest(letter, mca))
});

const connectModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);

export default connectModule;
