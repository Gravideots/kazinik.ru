import React, {Component} from 'react'

import Input from '../input'
import Button from '../button'

export default class FeedbackForm extends Component {
    render() {
        return (
            <div>
                <div className={'left-align'}>
                    <Button onClick={this.props.close}>
                        <i className='close small material-icons col s12 l12 m12'>
                            close
                        </i>
                    </Button>
                </div>
                <p className="col s12 l12 m12 center-align contactForm__title">
                    {this.props.title || 'Форма обратной связи'}
                </p>
                <Input placeholder='Введите ваше имя *' type='text' name='contactName' />
                <Input placeholder='E-mail *' type='text' name='contactEmail' />
                <Input placeholder='Телефон' type='text' name='contactPhone' />
                <div className="Input">
                <textarea className="materialize-textarea contactForm__textarea" rows='4' cols='50' placeholder='Введите ваше сообщение'></textarea>
                </div>
                <Button text='Отправить' className='contactForm__button'/>
                <p className="contactForm__desc col s12 l12 m12 center-align">Поля отмеченные «*» обязательны для заполнения</p>
            </div>
        )
    }
}