const vueinst = new Vue({

    el: '#display_events',
    data: {
        event_list: [],
        show_event: false,
        event_index: null,
        is_rsvp: false
    },
    mounted:function(){
        this.get_events();
    },
    methods: {
        get_events: function(){
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vueinst.event_list = JSON.parse(query_response);
                }
            };

            xhttp.open("GET", "/get_dashboard_events");
            xhttp.send();



        },
        make_rsvp: function(){
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    // console.log('added');
                    window.location.reload();
                }
            };

            xhttp.open("POST", "/submit_rsvp");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(vueinst.event_list[vueinst.event_index]));
        },
        remove_rsvp: function(){
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    // console.log('added');
                    window.location.reload();

                }
            };

            xhttp.open("POST", "/remove_rsvp");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(vueinst.event_list[vueinst.event_index]));
        },

        check_rsvp: function(){
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    // console.log('added');
                    // window.location.reload();
                    var query_response = JSON.parse(this.responseText);
                    // console.log(query_response)
                    if(query_response.length === 0){
                        vueinst.is_rsvp = false;
                    }
                    else{
                        vueinst.is_rsvp = true;
                    }

                }
            };

            xhttp.open("POST", "/check_rsvp");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(vueinst.event_list[vueinst.event_index]));
        }
    }
});
