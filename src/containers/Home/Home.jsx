import * as React from "react";
import { sendEmailAction } from "store/actions";
import { connect } from "react-redux";
import { Home } from "components";
import { toast } from "react-toastify";

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
      sizes: [],
      valCheckMsg: ["", "", "", "", "", ""],
      checkAll: false,
      dragging: false
    };
    // ref
    this.dropRef = React.createRef();
    // bind methods
    this.changeInput = this.changeInput.bind(this);
    this.validationCheck = this.validationCheck.bind(this);
    this.beforeSend = this.beforeSend.bind(this);
    this.send = this.send.bind(this);
    this.fileUploadClick = this.fileUploadClick.bind(this);
    this.totalCapacity = this.totalCapacity.bind(this);
    this.fileDelete = this.fileDelete.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragIn = this.handleDragIn.bind(this);
    this.handleDragOut = this.handleDragOut.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.fileValidation = this.fileValidation.bind(this);
  }
  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
    this.dragCounter = 0;
  }
  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
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
    this.fileValidation(files)
  };
  fileValidation = (files) => {
    if (files.size < 5120 && this.totalCapacity(this.state.sizes) + files.size < 20480) {
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
      reader.onerror = error => console.log("Error: ", error);
      reader.readAsDataURL(files);
    } else {
      toast.error("File is too large", { autoClose: 1500})
    }
  }
  fileDelete = filename => {
    this.setState({
      attaches: this.state.attaches.filter(file => file.name !== filename),
      sizes: this.state.sizes.filter(size => size.name !== filename)
    });
  };
  totalCapacity = (sizes) =>
    sizes.reduce((acc, value) => {
      return acc + value.size;
    }, 0);
  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };
  handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.state.dragCounter === 0) {
      this.setState({ dragging: false });
    }
  };
  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    let files = e.dataTransfer.files[0];
    this.setState({ dragging: false });
    this.fileValidation(files)
    e.dataTransfer.clearData();
    this.dragCounter = 0;
  };
  render() {
    let { emailfor, status, messages } = this.props;
    return (
      <>
        <Home
          // methods
          changeInput={this.changeInput}
          validationCheck={this.validationCheck}
          send={this.send}
          fileUploadClick={this.fileUploadClick}
          fileDelete={this.fileDelete}
          dropRef={this.dropRef}
          // states
          valCheckMsg={this.state.valCheckMsg}
          checkAll={this.state.checkAll}
          attaches={this.state.attaches}
          dragging={this.state.dragging}
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
});

const mapDispatchToProps = dispatch => ({
  sendEmail: (letter, mca) =>
    dispatch(sendEmailAction.sendEmailRequest(letter, mca))
});

const connectModule = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);

export default connectModule;
