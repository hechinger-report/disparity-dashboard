import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import School from './components/School';
import SearchBar from './components/SearchBar';
import Search from './components/Search';
import './App.css';

import jsonFile from './assets/data.json';

const fullList = [];

for(var i = 0; i < jsonFile.length; i++) {
    var school = jsonFile[i];

    fullList.push(school)
}
const getSchool = value => {
  for(var j = 0; j < fullList.length; j++) {
      if (value === fullList[j]['display']) {
        return fullList[j];
      };
  }
};
const defaultState = {
  data: {
    display:'University of California-Riverside', 
    city:'Riverside',
    state: 'California',
    stateabbr:'CA',
    enrollment1617: 19799,
    coefficient: [-.8, 1.1, .4, 0],
    faculty: [.28, .03, .32, .36,.003, .002,.016,.024],
    enrollment: [.11, .11, .41, .36,.004,.003, .023,.015]
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school : '',
      schoolData : defaultState.data
    }
  }

  onNewRequest = (searchTerm) => {
    this.setState({school:searchTerm})
    this.setState({schoolData:getSchool(searchTerm)});
  }
  render() {
    return (
      <div>
        <Header />
        <School schoolData={this.state.schoolData}/>
        <Search onNewRequest={this.onNewRequest} school={this.state.school} />
        <Footer />
        
      </div>    
    );
  }
}

export default App;