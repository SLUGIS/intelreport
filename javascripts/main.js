/* Initializes Tabletop, asking for the rows in the "Results" sheet */
function init() {
	/* Link to the public Google Sheet */
    //var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/14oY5jJboGdnBFSWEjKF7R_85afMFjzdyJKJIH9SPmeo/pubhtml?gid=1010805911&single=true';
    var formatted_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1wz-6cFvzf8n_n49ht0-uyuPGa9P_yq9A-HY425Nv74g/pubhtml';

    Tabletop.init( { key: formatted_spreadsheet_url,
                     callback: getData,
                     debug: true,
                     wanted: ["Sheet1"],
                     parseNumbers: true,
                     simpleSheet: true } );

    getWeatherState();
}

function getData(data) {
	/* DUTY */
	console.log("We have data!");
	console.log(data);
	
	document.getElementById("dutychief").innerHTML = data[0].DUTY_CHIEF;
	document.getElementById("investigator").innerHTML = data[0].DUTY_INVESTIGATOR;
	document.getElementById("eccofficer").innerHTML = data[0].ECC_DUTY_OFFICER;
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
          max: 3,
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

        var gauge_watertenders = new JustGage({
          id: "watertenders",
          value: 0,
          min: 0,
          max: 3,
          levelColors: resourceLevelColors,
          title: "Water Tenders"
        });

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
          max: 6,
          valueFontColor: "black",
          levelColors: resourceLevelColors,
          title: "Cuesta Camp"
        });

        var gauge_venturacamp = new JustGage({
          id: "venturacamp",
          value: 0,
          min: 0,
          max: 3,
          levelColors: resourceLevelColors,
          title: "Ventura Camp"
        });

        var gauge_overhead = new JustGage({
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
        });

        var gauge_mechanics = new JustGage({
          id: "mechanics",
          value: 0,
          min: 0,
          max: 4,
          levelColors: resourceLevelColors,
          title: "Mechanics"
        });

        var gauge_dozerOperators = new JustGage({
          id: "dozeroperators",
          value: 0,
          min: 0,
          max: 5,
          levelColors: resourceLevelColors,
          title: "Dozer Operators"
        });

  gauge_airattack.refresh(data[0].AIR_ATTACK);
  gauge_airtankers.refresh(data[0].AIR_TANKERS);
  gauge_battalionchiefs.refresh(data[0].BATTALION_CHIEFS);
  gauge_copters.refresh(data[0].COPTERS);
  gauge_type3engines.refresh(data[0].TYPE_3_ENGINES_SLU);
  gauge_type2engines.refresh(data[0].TYPE_2_ENGINES_SLC);
  //gauge_watertenders.refresh(data[0].WATER_TENDERS);
  gauge_dozers.refresh(data[0].DOZERS);
  gauge_cuestacamp.refresh(data[0].CUESTA_CAMP);
  gauge_venturacamp.refresh(data[0].VENTURA_CAMP);
  //gauge_overhead.refresh(data[0].OVERHEAD);
  //gauge_medics.refresh(data[0].MEDICS);
  gauge_mechanics.refresh(data[0].MECHANICS);
  //gauge_dozerOperators.refresh(data[0].DOZER_OPERATORS);

}        

// Access pre tag of document
function getWeatherState() {
	// document.getElementsByTagName ('PRE')[0].firstChild.data = document.getElementsByTagName ('PRE')[0].firstChild.data.replace (/\t+$/, '');
  console.log("get weather state");

  $.ajax({
    url: 'http://www.wrh.noaa.gov/eccda/eccda.php?ecczone=24',
    type: 'GET',
    success: function(res) {
        console.log(res);
        $("#weatherState").html("weather state");
    }
  });
}


