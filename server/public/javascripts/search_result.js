const vueinst = new Vue({

    el: '#display_events',
    data: {
        param: new URLSearchParams(window.location.search).get('search'),
        event_list: [],
        club_list: []
    },
    mounted:function(){
        this.get_events();
        this.get_clubs();
    },
    methods: {
        get_events: function(){
            var search_val = new URLSearchParams(window.location.search).get('search');
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vueinst.event_list = JSON.parse(query_response);
                }
            };

            xhttp.open("POST", "/get_search_events");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ param: search_val }));



        },

        get_clubs: function(){

            var search_val = new URLSearchParams(window.location.search).get('search');
            // console.log(typeof(search_val));
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vueinst.club_list = JSON.parse(query_response);
                }
            };

            xhttp.open("POST", "/get_club_list");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ param: search_val }));
        }
    }
});
