// This js is just for loading and updating the sidebar

var vue_sidebar = new Vue({

    el: '#sidebar',
    data: {
        joined_clubs: [],
        managed_clubs: [],
        user: false
    },

    // as soon as the page loads, run required functions
    mounted:function(){
        this.is_logged();
        this.find_joined_clubs();
        this.find_managed_clubs();
    },

    // contains function to get joined clubs and managed clubs
    methods: {
        find_joined_clubs: function(){

            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;

                    vue_sidebar.joined_clubs = JSON.parse(query_response);
                }
            };

            xhttp.open("POST", "/get_joined_clubs");
            xhttp.send();

        },
        find_managed_clubs: function(){
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vue_sidebar.managed_clubs = JSON.parse(query_response);
                }
            };

            xhttp.open("POST", "/get_managed_clubs");
            xhttp.send();

        },
        // join_button: function join_button_function(){
        //     if(vue_header.user === false){
        //         window.location.href = "login.html";
        //     }
        //     else{
        //         window.location.href = "search_club.html";
        //     }
        // }

        is_logged: function user_logged_in(){
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    if(query_response === "true"){
                        vue_sidebar.user = true;
                    }
                    if(query_response === "false"){
                        vue_sidebar.user = false;
                    }

                }
            };

            xhttp.open("GET", "/user_status");
            xhttp.send();
        }
    }


});
