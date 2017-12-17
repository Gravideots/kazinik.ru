import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

@connect(state => ({
  content: state
    .admin
    .get('asyncData')
}))
export default class Users extends Component {
  static propTypes = {
      content: PropTypes.object,
      dispatch: PropTypes.func
  }

  constructor(props) {
      super(props)
  }

  render() {
    let {list} = this.props

    return(
        <div className="UsersList">
            <table className='highlight'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Дата создания</th>
                        <th>Дата редактирования</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((e, key) => {
                        return(
                            <tr key={key}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.create}</td>
                                <td>{e.updated}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
  }
}