import React, { Component } from 'react';

class SchoolProfile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(

          <div className="school-content">
  	          <div className="school-profile">
                  <h1 className="school-name">{this.props.name}</h1>
                  <div className="school-description">
                    <p className="school-description"><span style={{fontWeight: 300}}>{this.props.city}, {this.props.stateabbreviation}</span> | Enrollment: {this.props.enrollmentTotal.toLocaleString()}</p>
                  </div>
              </div>
              <div className="stack-container">
                <div className="stack-circle">
                    <div className="overlay">
                    </div>
                </div>
            </div>
    	    </div>
      );
  }
}

export default SchoolProfile;