import React, { Component } from 'react';

export default class ImageInput extends Component {
  constructor(props) {

    super(props);
    this.state = { preview: null, file: null };
    
  }

  handleChange( files ){


    var reader = new FileReader();

    reader.readAsDataURL(files);

    reader.onload = () => {
      console.log(files)
      this.setState({
        preview: reader.result,
        file: files
      })
      
      this.props.onChange(files);
    };
    
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render() {
    const {
      title,
    } = this.props;

    return (
      <div className="ImageInput file-field input-field">
          <input onChange={ (e) => this.handleChange(e.target.files[0])} type="file"/>
          {
            this.state.preview? 
            <div className='imageContainer' style={ { backgroundImage: 'url(' + this.state.preview + ')'} }>
                
            </div>
            :
            <div>
                <i className='small material-icons'>
                    image
                </i>
                <p className='col s12  grey-text text-darken-3 center-align'>
                    { title }
                </p>
            </div>
          }
      </div>
    );
  }
}
