$( document ).ready(function() {
  function sortmission(id){
    // Abfarge ob ID existiert
    var missionthis = $("#mission_" + id);
    var href = missionthis.find("a:contains(' Alarm')").attr('href');
    if (localStorage.getItem(id) === null) {
      $.ajax({
        async: false,
        url: href,
        type:'GET',
        beforeSend: function() {
          progress();
        },
        success: function(data){
          var date = $(data).find('#missionH1').attr('title').replace("Einsatz eingegangen: ", "").replace(" Uhr", "").replace("Januar", "January").replace("Februar", "February").replace("März", "March").replace("April", "april").replace("Mai", "May").replace("Juni", "June").replace("Juli", "July").replace("August", "August").replace("September", "September").replace("Oktober", "October").replace("November", "November").replace("Dezember", "December");
          var pos = date.indexOf(",").toString();
          date = date.slice(0, pos) + " " + new Date().getFullYear() + date.slice(pos);
          var dateint = Date.parse(date);
          $(missionthis).attr("data-sort-date", dateint);
          localStorage.setItem(id.toString(), dateint);
          time += 500;
        }
    });
    }else {
      progress();
    }
  }
  function progress(){
    count++;
    percent = count/sortmissionalliance*100;
    console.log("Sort |" + Math.round(percent * 100) / 100 +"% | " + count + "/" + sortmissionalliance);
    $("#sort-bar").css("width", percent + "%");
    if (percent >= 100) {
      $("#sort-progress").fadeOut(1000);
    }
  }
  function sortssort() {
    var missionalliance = $('#mission_list_alliance div.missionSideBarEntry');
    missionalliance.sort(function(a, b){
      return +$(a).attr('data-sort-date') - +$(b).attr('data-sort-date');
    });
    missionalliance.appendTo('div#mission_list_alliance');
  }
  var percent = 0;
  var time = 500;
  var count = 0;
  var sortmissionalliance = $("#mission_list_alliance").find(".missionSideBarEntry").length;
  $("#btn-group-mission-select").append('<button id="sortdate" class="btn btn-xs btn-success mission_selection"><span class="glyphicon glyphicon-time" aria-hidden="true"></span></button>');
  $( "#sortdate" ).click(function() {
    count = 0;
    var sortmissionalliance = $("#mission_list_alliance").find(".missionSideBarEntry").length;
    $("#btn-group-mission-select").append('<div id="sort-progress"><div id="sort-bar"></div></div>');
    $("#sort-progress").css({
      "width": "100%",
      "background-color": "#ddd",
      "margin-top": "20px",
      "margin-bottom": "20px",
      "height": "30px",
      "display": "none"
    });
    $("#sort-bar").css({
      "width": "1%",
      "height": "30px",
      "background-color": "green"
    });
    $("#sort-progress").fadeIn(1000);
    $("#mission_list_alliance .missionSideBarEntry").each(function() {
      var missionid = $(this).attr("mission_id");
      setTimeout(function(){
        sortmission(missionid);
      }, time);
    });
    sortssort();
    faye.subscribe('/private-alliance140de', function(message) {
      if(message.search("missionDelete()") > -1) {
        if (localStorage.getItem($(this).attr("mission_id")) !== null) {
          localStorage.removeItem(message.replace("missionDelete(", "").replace(");", ""));
          //console.warn(message + " " + message.replace("missionDelete(", "").replace(");", ""));
      }
      }
    });
  });
});
