import * as React from "react";
import { connect } from "react-redux";
import { Sending } from "components";

class SendingContainer extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <>
        <Sending messages={messages} />
      </>
    );
  }
}

const mapStateToProps = rootState => ({
  messages: rootState.send.messages
});

const connectModule = connect(mapStateToProps)(SendingContainer);

export default connectModule;
