import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import jsonFile from './../assets/data.json';

var currentSchool = ''; // school currently selected
var fullList = []; // container for the raw json data from API (all schools)
let schoolNames = []; // used for the autocomplete (check getSchoolNames)

for(var i = 0; i < jsonFile.length; i++) {
    var school = jsonFile[i];

    fullList.push(school)
}
// The list of schools that you'd like to autosuggest.

var FontAwesome = require('react-fontawesome');

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength < 3 ? [] : fullList.filter(school =>
    school.schoolname.includes(inputValue)
  ).slice(0, 9);;
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.schoolname;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div className="rendered-suggestion">
    {suggestion.schoolname} {suggestion.type == "School" ? <FontAwesome name="graduation-cap" className="fa fa-graduation-cap"/>
                      : suggestion.type == "State" ? <FontAwesome name="map-o" className="fa fa-map-o"/>
                      : <FontAwesome name="graduation-cap" className="fa fa-graduation-cap"/>
      }
  </div>
);

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      chosenschool: ''

    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };



  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    var { value, suggestions, chosenschool } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'School name...',
      value,
      chosenschool:this.state.chosenschool,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <div className="search-bar-wrapper">

        <div className="search-bar-container">
          <p className="search-bar-content">Look up another school:</p>
          <div className="autosuggest-container">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </div>
            <div className="footer-container">
                    {this.state.chosenschool}
                    <div className="footer-content">How is the gap score calculated?</div>
            </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;