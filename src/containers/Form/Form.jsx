import * as React from "react";
import { sendEmailAction } from "store/actions";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Progress, Form } from "components";
import { validationSchema } from "lib/validations/inputsValidation";
import { fileValidation } from "lib/validations/fileValidation";

class FormContainer extends React.Component {
  state = {
    attaches: [],
    sizes: []
  };
  sendEmail = (values, { setSubmitting }) => {
    let letter = {
      subject: values.theme,
      "from.name": values.namefrom,
      "from.email": values.emailfrom,
      "to.name": values.namefor,
      message: { text: values.content },
      attaches: this.state.attaches
    };
    let mca = [values.emailfor];
    this.props.sendEmail(letter, mca);
    this.setState({
      attaches: [],
      sizes: []
    });
    setSubmitting(false);
  };
  fileUploadClick = e => {
    fileValidation(e.target.files, this.state.sizes).then(res =>
      res !== null
        ? this.setState({
            attaches: [...this.state.attaches, res.attaches],
            sizes: [...this.state.sizes, res.sizes]
          })
        : ""
    );
  };

  fileDelete = filename => {
    this.setState({
      attaches: this.state.attaches.filter(file => file.name !== filename),
      sizes: this.state.sizes.filter(size => size.name !== filename)
    });
  };

  handleDrop = files => {
    fileValidation(files, this.state.sizes).then(res =>
      res !== null
        ? this.setState({
            attaches: [...this.state.attaches, res.attaches],
            sizes: [...this.state.sizes, res.sizes]
          })
        : ""
    );
  };
  render() {
    return (
      <>
        {!this.props.status ? (
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              namefrom: "",
              emailfrom: "",
              namefor: "",
              emailfor: "",
              theme: "",
              content: ""
            }}
            onSubmit={this.sendEmail}
            render={props => (
              <Form
                {...props}
                handleDrop={this.handleDrop}
                fileUploadClick={this.fileUploadClick}
                fileDelete={this.fileDelete}
                attaches={this.state.attaches}
              />
            )}
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
