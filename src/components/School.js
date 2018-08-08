import React, { Component } from 'react';
import SchoolProfile from './SchoolProfile';
import Scores from './Scores';



class School extends Component {
  constructor(props, defaultProps) {
    super(props);
    this.state = {
      school: props.school
    };
  }
  render() {
    return (
      <div className="school-container">
  	     <SchoolProfile 
              name={this.props.schoolData.display} 
              city={this.props.schoolData.city}
              stateabbreviation={this.props.schoolData.stateabbr}
              enrollmentTotal={this.props.schoolData.enrollment1617}
              />
         <Scores 
              coefficient={this.props.schoolData.coefficient}
              enrollment={this.props.schoolData.enrollment}
              faculty={this.props.schoolData.faculty}
              white={this.props.schoolData.white}
              name={this.props.schoolData.name} 
              />
      </div>
    );
  }
}

export default School;