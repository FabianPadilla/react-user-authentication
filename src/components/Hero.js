import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Hero extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
  }

  render(){
    const {title, subtitle} = this.props;
    return(
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {title}
            </h1>
            {(subtitle != null)?<h2 className="subtitle">{subtitle}</h2>: ''}
          </div>
        </div>
      </section>
    )
  }
}