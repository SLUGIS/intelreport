/* Initializes Tabletop, asking for the rows in the "Results" sheet */
function init() {
  /* Link to the public Google Sheet */
    //var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/14oY5jJboGdnBFSWEjKF7R_85afMFjzdyJKJIH9SPmeo/pubhtml?gid=1010805911&single=true';
    var formatted_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1wz-6cFvzf8n_n49ht0-uyuPGa9P_yq9A-HY425Nv74g/pubhtml';
    var staffingPatter_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1f9sS_5cnEDcOq_oXw2eqjCgCdDUPYK7vE3NQeMZD0CM/pubhtml';
    Tabletop.init( { key: formatted_spreadsheet_url,
                     callback: getData,
                     debug: true,
                     wanted: ["Sheet1"],
                     parseNumbers: true,
                     simpleSheet: true } );

    Tabletop.init( { key: staffingPatter_spreadsheet_url,
                     callback: getStaffingData,
                     wanted: ["Sheet2"],
                     debug: true,
                     parseNumbers: true,
                     simpleSheet: true });

    Tabletop.init( { key: staffingPatter_spreadsheet_url,
                     callback: getStaffingData,
                     wanted: ["Sheet3"],
                     debug: true,
                     parseNumbers: true,
                     simpleSheet: true });

    console.log("about to get weather state!");
    getWeatherState();
}

function getData(data) {
  /* DUTY */
  console.log("We have data!");
  console.log(data);
  
  document.getElementById("dutychief").innerHTML = data[0].DUTY_CHIEF;
  document.getElementById("investigator").innerHTML = data[0].DUTY_INVESTIGATOR;
  document.getElementById("eccofficer").innerHTML = data[0].ECC_DUTY_OFFICER;
  document.getElementById("eccstaff").innerHTML = data[0].ECC_STAFF;
  document.getElementById("incidentmgmt").innerHTML = data[0].INCIDENT_MGMT_TEAM;
  document.getElementById("timestamp").innerHTML = data[0].TIMESTAMP;

    showInfo(data);
}

/* Populate gauge values */
function showInfo(data) {
    var resourceLevelColors = ["#FF0000", "#FF4500", "#FFFF00", "#008000"];

        var gauge_airattack = new JustGage({
          id: "airattack",
          value: 0,
          min: 0,
          max: 3,
          levelColors: resourceLevelColors,
          title: "Air Attack"
        });

        var gauge_airtankers = new JustGage({
          id: "airtankers",
          value: 0,
          min: 0,
          max: 3,
          levelColors: resourceLevelColors,
          title: "Air Tankers"
        });

        var gauge_copters = new JustGage({
          id: "copters",
          value: 0,
          min: 0,
          max: 1,
          levelColors: resourceLevelColors,
          title: "Copters"
        });

        var gauge_battalionchiefs = new JustGage({
          id: "battalionchiefs",
          value: 0,
          min: 0,
          max: 11,
          levelColors: resourceLevelColors,
          title: "Battalion Chiefs"
        });

        var gauge_type3engines = new JustGage({
          id: "type3enginesslu",
          value: 0,
          min: 0,
          max: 12,
          levelColors: resourceLevelColors,
          title: "Type III Engines SLU"
        });

        var gauge_type2engines = new JustGage({
          id: "type2enginesslc",
          value: 0,
          min: 0,
          max: 14,
          levelColors: resourceLevelColors,
          title: "Type II Engines SLC"
        });

        /*var gauge_watertenders = new JustGage({
          id: "watertenders",
          value: 0,
          min: 0,
          max: 3,
          levelColors: resourceLevelColors,
          title: "Water Tenders"
        });*/

        var gauge_dozers = new JustGage({
          id: "dozers",
          value: 0,
          min: 0,
          max: 3,
          levelColors: resourceLevelColors,
          title: "Dozers"
        });

        var gauge_cuestacamp = new JustGage({
          id: "cuestacamp",
          value: 0,
          min: 0,
          max: 5,
          valueFontColor: "black",
          levelColors: resourceLevelColors,
          title: "Cuesta Crew"
        });

        var gauge_venturacamp = new JustGage({
          id: "venturacamp",
          value: 0,
          min: 0,
          max: 7,
          levelColors: resourceLevelColors,
          title: "Ventura & Camarillo Crews"
        });

        /*var gauge_overhead = new JustGage({
          id: "overhead",
          value: 0,
          min: 0,
          max: 200,
          valueFontColor: "black",
          levelColors: resourceLevelColors,
          title: "Overhead"
        });

        var gauge_medics = new JustGage({
          id: "medics",
          value: 0,
          min: 0,
          max: 18,
          valueFontColor: "black",
          levelColors: resourceLevelColors,
          title: "Medics"
        });*/

        var gauge_mechanics = new JustGage({
          id: "mechanics",
          value: 0,
          min: 0,
          max: 4,
          levelColors: resourceLevelColors,
          title: "Mechanics"
        });

        /*var gauge_dozerOperators = new JustGage({
          id: "dozeroperators",
          value: 0,
          min: 0,
          max: 5,
          levelColors: resourceLevelColors,
          title: "Dozer Operators"
        });*/

  gauge_airattack.refresh(data[0].AIR_ATTACK);
  gauge_airtankers.refresh(data[0].AIR_TANKERS);
  gauge_battalionchiefs.refresh(data[0].BATTALION_CHIEFS);
  gauge_copters.refresh(data[0].COPTERS);
  gauge_type3engines.refresh(data[0].TYPE_3_ENGINES_SLU);
  gauge_type2engines.refresh(data[0].TYPE_2_ENGINES_SLC);
  gauge_dozers.refresh(data[0].DOZERS);
  gauge_cuestacamp.refresh(data[0].CUESTA_CAMP);
  gauge_venturacamp.refresh(data[0].VENTURA_CAMP);
  gauge_mechanics.refresh(data[0].MECHANICS);
  //gauge_dozerOperators.refresh(data[0].DOZER_OPERATORS);

  /* to be added to the Google Sheet later, from other reports */
  //gauge_watertenders.refresh(data[0].WATER_TENDERS);
  //gauge_overhead.refresh(data[0].OVERHEAD);
  //gauge_medics.refresh(data[0].MEDICS);
}        

// Access pre tag of document
function getWeatherState() {
  console.log("got weather state");

  $.ajax({
    url: 'http://www.crh.noaa.gov/data/LOX/AFDLOX',
    type: 'GET',
    success: function(res) {
        console.log(res.responseText);
        var weatherState = res.responseText;

        var title = weatherState.slice(
          weatherState.indexOf("SOUTHWEST"),
          weatherState.indexOf(".SYNOPSIS"));

        var shortTerm = weatherState.slice(
          weatherState.indexOf(".SHORT TERM"),
          weatherState.indexOf(".LONG TERM"));

        weatherState = title + "<br>" + shortTerm;

        var titleP = $("<p>").attr('id', 'weatherTitle').html(title);
        var shortTermP = $("<p>").attr('id', 'weatherInfo').html(shortTerm);
        $("#weatherState").append(titleP);
        $("#weatherState").append(shortTermP);


    }
  });
}

function getStaffingData(data, tabletop) {
  // Name of columns in record spreasheet
  var columns = [
    "Req Number", 
    "Effective Date/Time", 
    "For",
    "Staffing Pattern Item",
    "Rescinded Date/Time",
    "Strikethrough"];

  var sheets = tabletop.sheets();             // Grab sheet information
  var tableNumber;                            // Used to know which table to change
  var sheetName = Object.keys(sheets)[0];     // Sheet name is always first key
  if (sheetName == "Sheet2") {
    tableNumber = "#staffingpatterntable";
  }
  else {
    tableNumber = "#staffingpatterntable2";
  }

  var curEntry = data[data.length - 1];        // Grab last record

  // Size calculation: # of columns - 1 for timestamp / 6 different columns
  var size = (sheets[sheetName].column_names.length - 1) / columns.length;

  for (var i = 0; i < size; i++) {

    // Create new row
    var row = $("<tr>");

    // If there's nothing there, skip it
    if (curEntry[columns[0] + " " + (i+1)] == "") 
      continue;

    console.log("curentry "+ i + " is" + curEntry + " and size is " + size);
    // Loop through columns and insert corresponding value
    for (var j = 0; j < columns.length; j++) {

      var td = $("<td>" + curEntry[columns[j] + " " + (i+1)] + "</td>");

      if (j == columns.length - 2) // If it's in Rescinded col, add color
        td.css("color", "red");

      if (j == columns.length - 1) {// If its strikethrough, check
        if (curEntry[columns[j] + (i+1)] == "line-through") {
          row.addClass("strikeout");
        }
      }
      else
        row.append(td);
    }

    $(tableNumber).append(row);
  }

  if (sheetName == "Sheet2") {
    $("#staffPatternLastUpdated").html("Last Updated: " + curEntry["Last Updated"]);
  }
  
}



