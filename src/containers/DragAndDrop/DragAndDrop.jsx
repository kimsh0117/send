import * as React from "react";

class DragAndDrop extends React.Component {
  state = {
    dragging: false
  };
  dropRef = React.createRef();
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
    if (this.dragCounter === 0) {
      this.setState({ dragging: false });
    }
  };
  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files[0], e);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };
  componentDidMount() {
    let div = this.dropRef.current;
    this.dragCounter = 0
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  }
  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }
  render() {
    return (
      <div
        style={{ display: "inline-block", position: "relative" }}
        ref={this.dropRef}
      >
        {this.state.dragging && (
          <div
            style={{
              border: "1px dashed rgb(219, 219, 219)",
              borderRadius: "5px",
              backgroundColor: "rgba(255, 255, 255, 0.726)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
              transition: "all .5s"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                left: 0,
                textAlign: "center",
                color: "grey",
                fontSize: 36
              }}
            >
              <p
                style={{
                  fontSize: "30px",
                  lineHeight: "40px",
                  width: "693px",
                  height: "40px",
                  textAlign: "center"
                }}
              >
                Бросайте файлы сюда, я ловлю
              </p>
              <span
                style={{
                  width: "600px",
                  textAlign: "center",
                  fontSize: "16px",
                  lineHeight: "25px"
                }}
              >
                Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls,
                pdf) и zip-архивы. Размеры файла до 5 МБ
              </span>
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}
export default DragAndDrop;
