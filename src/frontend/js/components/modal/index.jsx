import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class Modal extends Component {

    constructor(props) {
        super(props);

        this.close = this
            .close
            .bind(this);
        this.open = this
            .open
            .bind(this);
    }
    componentDidMount() {
        $('.modal').modal();
    }
    open() {
        $('#Modal').modal('open');
    }
    close(){
        $('#Modal').modal('close');
    }
    render() {
        const {header, children} = this.props;
        if(children)
          return (
            <div id="Modal" className="modal bottom-sheet">
                <div className="modal-header">
                  {header}
                </div>
                <div className="modal-content">
                  {children}
                </div>
            </div>
          );
        else return null;
    }
}