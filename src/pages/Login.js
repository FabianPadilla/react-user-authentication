import React, { Component } from 'react';
import { FormLogin } from '../components/FormLogin';

export class LoginPage extends Component {
  render(){
    return(
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <FormLogin />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}