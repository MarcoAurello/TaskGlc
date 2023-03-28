import React from 'react';

class UploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  handleFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  handleUpload = () => {
    const formData = new FormData();
    formData.append('file', this.state.file);

    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
        
      console.error(error);
    });
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileChange} />
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    );
  }
}

export default UploadButton;