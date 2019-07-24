import * as React from "react";
import { sendEmailAction } from "store/actions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Formik } from 'formik';
import { Progress, Form } from "components";
import { validationSchema, initialState } from "lib/validations/inputsValidation"

class FormContainer extends React.Component {
  state = {
    attaches: [],
    sizes: [],
  };
  send = values => {
    console.log('i\'am here')
    // let {
    //   attaches
    // } = this.state,
    //   letter = {
    //     subject: theme,
    //     "from.name": namefrom,
    //     "from.email": emailfrom,
    //     "to.name": namefor,
    //     message: { text: content },
    //     attaches
    //   },
    //   mca = [emailfor];
    // trigger dispatch
    // this.props.sendEmail(letter, mca);
    // this.setState({
    //   attaches: [],
    //   sizes: []
    // });
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
          <Formik
            validationSchema={validationSchema}
            initialValues={initialState}
            onSubmit={values => console.log(values)}
            render={(props) => <Form
              {...props}
              handleDrop={this.handleDrop}
              fileUploadClick={this.fileUploadClick}
              fileDelete={this.fileDelete}
              attaches={this.state.attaches}
              />}
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
