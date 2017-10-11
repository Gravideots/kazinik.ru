import React, {Component} from 'react'
export default class FeedbackForm extends Component {
    render() {
        return (
            <div>
                <div className={'left-align'}>
                    <i className={'close small material-icons col s12 l12 m12'}>
                        close
                    </i>
                </div>
                <p className="col s12 l12 m12 center-align">
                    {this.props.title || 'Форма обратной связи'}
                </p>
            </div >
        )
    }
}