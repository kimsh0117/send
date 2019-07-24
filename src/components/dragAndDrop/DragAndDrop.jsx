import * as React from "react";
import dragAndDropStyle from "./DragAndDrop.module.scss"

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
      this.props.handleDrop(e.dataTransfer.files, e);
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
        ref={this.dropRef}
        className={dragAndDropStyle['drag']}
      >
        {this.state.dragging && (
          <div className={dragAndDropStyle['drag__inner']}>
            <div className={dragAndDropStyle['drag__inner__content']}>
              <p className={dragAndDropStyle['drag__inner__content__title']}>
                Бросайте файлы сюда, я ловлю
              </p>
              <span className={dragAndDropStyle['drag__inner__content__description']}>
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
