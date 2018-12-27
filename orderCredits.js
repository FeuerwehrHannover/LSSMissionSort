(function() {
    'use strict';
    function getKey(object, value) {
        return parseInt(Object.keys(object).find(key => object[key] === value));
    }
    function sorterrorundundefined(){
        $(".mission_header_info div:eq(0)").append('<div class="sorterror"><p style="margin: 0;"><strong>Fehler!</strong> Es konnte keine gespeicherte Sortierung gefunden werden.</p></div>');
        $(".sorterror").css({
            "background-color": "#ffdddd",
            "border-left": "6px solid #f44336",
            "margin-bottom": "15px",
            "padding": "4px 12px",
            "display": "flex",
            "align-items": "center"

});
    }
    if ( $( "#mission_finish_now_btn" ).length ) {
        if (localStorage.getItem("sortcredits") !== null) {
            var id = location.href.replace("https://www.leitstellenspiel.de/missions/", "");
            var sortmission = JSON.parse(localStorage.getItem("sortcredits"));
            if(getKey(sortmission, id) !== null){
               var key = getKey(sortmission, id);
               var before = sortmission[key - 1];
               var next = sortmission[key + 1];
               $(".navbar-header").append('<div class="btn-group"><a href="/missions/'+before+'" class="btn btn-fadeout btn-sm btn-warning navbar-btn" id="mission_previous_mission_btn" title="Vorheriger Einsatz"> <span class="glyphicon glyphicon-arrow-left"></span> <span class="glyphicon glyphicon glyphicon glyphicon-euro" aria-hidden="true"></span></a><a href="/missions/'+next+'" class="btn  btn-fadeout btn-sm  btn-warning navbar-btn" id="mission_next_mission_btn" title="Nächster Einsatz"><span class="glyphicon glyphicon glyphicon glyphicon-euro" aria-hidden="true"></span> <span class="glyphicon glyphicon-arrow-right"></span> </a></div>');
            }
        }else{
            sorterrorundundefined();
        }
    }else{
        if (localStorage.getItem("sortcreditsalliance") !== null) {
            var sortmission = JSON.parse(localStorage.getItem("sortcreditsalliance"));
            $(".navbar-header").append();
        }
    }
})();
