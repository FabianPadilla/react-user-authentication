import React, { Component } from 'react';
import { FormRegister } from '../components/FormRegister';

export class RegisterPage extends Component {
  render(){
    return(
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <FormRegister />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}