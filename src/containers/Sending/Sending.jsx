import * as React from "react";
import { connect } from "react-redux";
import { Status } from "components";

class SendingContainer extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <>
        <Status messages={messages} />
      </>
    );
  }
}

const mapStateToProps = rootState => ({
  messages: rootState.send.messages
});

const connectModule = connect(mapStateToProps)(SendingContainer);

export default connectModule;
