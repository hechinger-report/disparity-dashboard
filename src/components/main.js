import './jquery-ui.min';

var currentSchool = ''; // school currently selected
var fullList = []; // container for the raw json data from API (all schools)
let schoolNames = []; // used for the autocomplete (check getSchoolNames)
const schoolUrl = `/school.html?unitid=`; //template for endpoint for individual school detail info

// caching HTML elements so we don't have to traverse the dom every time
const errorMessage = $('#progress-box .error, #progress-box-mobile .error'); //error message modal
const schoolListUl = $('#schools-list'); // where the filtered schools will be rendered

//object that will keep the current state of the filters any time filters change
//starts with every filter as null
const filters = {
  stateabbr: null,
  schoolcontrol: null,
  // tuition: null,
  enrollment1617: null,
  degreetype: null
};

// start of the script on page load
$(function(){
  //request the API for raw SCHOOLS data
  fetchInitialData();
  registerAllEvents();
  //hides the school list results UL before any search is made
  $('#search-results').hide();
});

const fetchInitialData = function(){
  $.getJSON("./data/form-data.json", (data) => {
    //assign the response object to var rawData
    rawData = data;
    // map all schools for the autocomplete
    getSchoolNames(data);
    /*
      - assigns a COPY of the rawData to the filteredItems
      - at begining, as there are no filters selected, filteredItems are all the Items
    */
    filteredItems = [...rawData];
    // initializes empty filter values on the infobox (popup with filter information)
    printInfoBox(filters);
  });
}

const registerAllEvents = function(){
  //assign eventHandlers to filter inpunts
  setEventForSchoolType();
  // behavior for seatch input
  setSearchBehavior();


  //using event delegation, so we don't have to register multiple events
  //and reregister every time filter changes
  schoolListUl.click(function(ev){
    ev.preventDefault()
    const target = ev.target
    if(!target.href){
      return
    }
    const unitid = $(target).data('unitid')
    showSearchResult({unitid});
  });

  // Tabs toggle
  $('.btn').click(function(){
    const tabId = $(this).attr('data-tab');

    $('.btn').removeClass('selected-btn');
    $('.tab-content').css('display','none');

    $(this).addClass('selected-btn');
    $("#"+tabId).addClass('selected-btn').css('display','block');
  });

  //behavior for the search button
  $('#filter-search').click(function(e){
    if($(this).attr('data-function') === 'find'){
      e.preventDefault();
      //user needs to pick a state before trying to filter
      if ( filters.stateabbr !== null){
        errorMessage.addClass('hide');
        $('#search-results').slideDown('slow');
        $(this).attr('data-function','again');
        $(this).text('SEARCH AGAIN');

        // otherwise, error msg is showing
      } else {
        $('#search-results').hide();
        errorMessage.removeClass('hide');
        $(this).attr('data-function','find');
        $(this).text('FIND SCHOOLS');
      }
    } else {
      //reloads the page if the user wants to clear the form and start over
      location.reload();
    }
  });

}

// opens the resulting url for the selected school in a new window
function showSearchResult(school) {
  // if there is a school result from the search bar or form ...
  if (school) {
    // grab the base href of the current window
    let baseHref = window.location.href;
    // check if there's a file name in that href. if so, remove it
    if (baseHref.includes('.html') === true) {
      baseHref = baseHref.substring(0, baseHref.lastIndexOf('/'));
    }
    // open a new window to the page resulting from the base href, school url and
    // school unit id number.
    window.open(`${baseHref}${schoolUrl}${school.unitid}`, '_self');
  }
}

// allows users to search without clicking the autocomplete
function determineSchool(school) {
  console.log(school);
  // first determines if a school object if provided through the autocomplete
  if (school) {
    // if so, show that school's page
    showSearchResult(school)
  } else if ($('.search-group').find('input').val().length >= 0) {
    // else, check if there is input in the #tags input element
    // if so, grab that value
    const enteredSchool = $('.search-group').find('input').val();
    // see if it matches a school in the raw data
    const returnedSchool = rawData.find(school => school.schoolname === enteredSchool);
    // if it does, show that school page
    if (returnedSchool) {
      showSearchResult(returnedSchool);
    } else {
      // if not, let the user know
      alert('Please enter a valid school name.');
    }
  } else {
    // if there is no input in the search bar, and the user searches anyway,
    // instruct them to enter a valid school name
    alert ('Please enter a valid school name.');
  }
}

const setSearchBehavior = function(){
  // Top of page search button click
  let resultingSchool;
  // one click event listener for both search buttons
  $('#search, #results-search').click(function(evt) {
    evt.preventDefault();
    console.log(resultingSchool);
    determineSchool(resultingSchool);
  });

  // adds support for clicking the enter key on the input field
  $('#tags, #schools-searchbar').keyup(function(e) {
    if ($(this).is(':focus') && (e.keyCode === 13)) {
      determineSchool(resultingSchool);
    }
  });

  //setting up the autocomplete
  $("#tags, #schools-searchbar").autocomplete({
    source: function(request, response){
      const term = request.term.toLowerCase();
      const matchingSchools = rawData.filter(school => {
        const schoolName = school.schoolname.toLowerCase();
        const aliasName = school.aliasname.toLowerCase();
        const toMatch = schoolName + aliasName;
        return toMatch.includes(term)
      }).map(school => school.schoolname)
      response(matchingSchools)
    },
    delay: 1000,
    minLength: 3,
      select: function(event, ui) {
        const schoolSelected = ui.item.value;
        resultingSchool = rawData.find(school => school.schoolname === schoolSelected);
      }
  });
}

//fires whenever a filter checkbox is changed
function handleCheckBoxChange(ev){
  //registers the actual checkbox that was clicked

  const cb = $(this);
  // traverses up the DOM to find which filter this cb belongs to
  var parent = cb.parent();
  var cbGroup = parent.find('.chk')
  var filterType = parent.attr('id').substr(7);

  //depending on the filterType, changes the filters object to reflect the current state
  switch(filterType){
    case 'type':
      filters.schoolcontrol = cbGroup.filter(':checked')
        .toArray()
        .map((cb) => $(cb).val())
      break;
    case 'degree':
      filters.degreetype = cbGroup.filter(':checked')
        .toArray()
        .map((cb) => $(cb).val())
      break;

    case 'price':
      cbGroup.not(this).prop('checked', false)
      filters.tuition = cb.is(':checked') ? cb.val() : null;
      break;
    case 'size':
      cbGroup.not(this).prop('checked', false)
      filters.enrollment1617 = cb.is(':checked') ? cb.val() : null;
      break;
  }

  //reconstruct filteredItems to reflect the current filter selections
  runFilters();
  //re-render the school list UL with the new filteredItems collection
  printSchoolList()
}

//renders the school list UL with the new filteredItems collection
function printSchoolList(){
  const html = filteredItems
    .map(school => `<li><a href="#" data-unitid="${school.unitid}">${school.schoolname}</a></li>`)
    .join('')
  document.getElementById('schools-list').innerHTML = html
}

function runFilters(){
  filteredItems = [...rawData]
  if(!filters.stateabbr){
      printInfoBox(filters);
      return errorMessage.removeClass('hide')
  }
  errorMessage.addClass('hide')
  Object.keys(filters).forEach(key => {
    const filterValue = filters[key]
    if(!filterValue || filterValue.length === 0){
      return
    }

    switch(key){
      case 'stateabbr':
        filteredItems = filteredItems
          .filter(school => school.stateabbr === filterValue)
        break;
      case 'degreetype':
      case 'schoolcontrol':
        filteredItems = filteredItems
          .filter(school => filterValue.includes(school[key]))
        break;
      case 'enrollment1617':
      case 'tuition':
        const className = key === 'tuition' ? 'price' : 'size';
        var topBracket = $('.chk.' + className).toArray().pop().value
        if(filterValue === topBracket){
          filteredItems = filteredItems
            .filter(school => filterValue <= school[key])
        } else {
          filteredItems = filteredItems
            .filter(school => filterValue > school[key])
        }
        break;
    }
  })
  printInfoBox(filters);
}

function setEventForSchoolType(){
  $('.chk').on('change', handleCheckBoxChange);
  $('#states').on('change', onSelectChange);
  $("path").click(mapClick);
}

function getSchoolNames(data){
  $.each(data, (k, v) =>  {
    if (schoolNames.indexOf(v.schoolname) === -1 || schoolNames.indexOf(v.aliasname) === -1){
      schoolNames.push(v.schoolname);
    }
  });
}

function mapClick() {
  // Get the id of the state we clicked on
  const stateId = $(this).attr('id');

  // Update the dropdown
  $("#states").val(stateId);
  $('#states').trigger('change')
  const mapStateName = $("#states option:selected").text();

  // Highlight the relevant state
  setState(stateId);

  // Print state selection
  $('.chosen-state span').html(mapStateName);
}


// Map and states handling

function onSelectChange(ev){
  const selectedState = $("#states").val();
  filters.stateabbr = selectedState;
  // Highlight the relevant state on the map
  setState(selectedState);
  runFilters();
  printSchoolList()
}

function printInfoBox(filters){
  const emptyFilterText = 'NO SELECTION(S) MADE'
  // Find index value of selected state
  const stateIndex = $('#states').find(":selected").index();
  const stateName = $('#states option').eq(stateIndex).text();
  const priceSpan = $('.price:checked').attr('data-label');
  const sizeSpan = $('.size:checked').attr('data-label');
  const selectedType = $("#choose-type input:checkbox:checked").map(function(){
        return this.value;
    }).get().join(', ');
  const selectedDegree = $("#choose-degree input:checkbox:checked").map(function(){
          return this.value;
      }).get().join(', ');

  $('.chosen-state span').html(stateName || emptyFilterText);
  $('.chosen-price span').html(priceSpan || emptyFilterText);
  $('.chosen-degree span').html(selectedDegree || emptyFilterText);
  $('.chosen-type span').html(selectedType || emptyFilterText);
  $('.chosen-size span').html(sizeSpan || emptyFilterText);
  $('.your-schools span').html(filteredItems.length);
}

function setState(stateId){
  // Remove "selected" class from current state
  $(".state-selected").removeClass("state-selected");
  // Add "selected" class to new state
  $('#'+stateId).addClass("state-selected");
}
