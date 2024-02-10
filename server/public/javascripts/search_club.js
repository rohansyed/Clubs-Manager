const vueinst = new Vue({

    el: '#search_clubs',
    data: {
        query: '',
        club_list: []
    },
    methods: {
        search_clubs: function(){
            // console.log(this.query);

            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vueinst.club_list = JSON.parse(query_response);
                }
            };

            xhttp.open("POST", "/get_club_list");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({param: vueinst.query}));



        }
    }
});
