import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { AutoComplete } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactTooltip from 'react-tooltip'
import jsonFile from './../assets/data.json';

const fullList = [];

for(var i = 0; i < jsonFile.length; i++) {
    var school = jsonFile[i];

    fullList.push(school)
}

var FontAwesome = require('react-fontawesome');

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  var inputVal = value.toLowerCase();
  var inputLength = inputVal.length;

  return inputLength == 0 ? [] : fullList.filter(school =>
    school.schoolname.includes(inputVal)
  ).slice(0, 9);
};

class MaterialUIAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.state = {
      dataSource : [],
      inputValue : ''
    }
  }

  onUpdateInput(inputValue) {
    const self = this;
    const iV = inputValue.toLowerCase();
        this.setState({
          inputValue: inputValue
        }, function() {
          self.performSearch();
        });
  }

  performSearch() {
    const
      self = this;

    if(this.state.inputValue !== '') {
        let searchResults, retrievedSearchTerms;
        searchResults = getSuggestions(this.state.inputValue.toLowerCase())
        retrievedSearchTerms = searchResults.map(function(result) {
          return result['display'];
        });
        self.setState({
          dataSource: retrievedSearchTerms
        });
    }
  }
  render() {
    return (
      <div className="search-bar-wrapper">
        <div className="search-bar-container">
          <p className="search-bar-content">Look up another school:</p>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        dataSource    = {this.state.dataSource}
        onUpdateInput = {this.onUpdateInput} 
        onNewRequest  = {this.props.onNewRequest}
        filter={(searchText, key) => true} />
      </MuiThemeProvider>
          <div data-tip="hello world" className="footer-content">How is the gap score calculated?</div>
          <ReactTooltip />
        </div>
      </div>
      )
  }
}

export default MaterialUIAutocomplete;