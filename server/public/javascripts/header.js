// This js is just for header searches

var vue_header = new Vue({

    el: '#header',
    data: {
        header: ``,
        input: "",
        user: false
    },
    mounted: function () {
        // this.get_header();
        this.is_logged();
    },
    // contains function to change page with parameter
    methods: {

        // get_header: function get_header_function(){
        //     let xhttp = new XMLHttpRequest();


        //     xhttp.onreadystatechange = function() {
        //         if(this.readyState === 4 && this.status === 200){
        //             var query_response = this.responseText;
        //             document.getElementById("header").innerHTML = query_response;
        //         }
        //     };

        //     xhttp.open("GET", "/get_header");
        //     xhttp.send();
        // },

        header_search: function search_through_header() {

            window.location.href = "/search_result.html?search=" + vue_header.input;
        },
        is_logged: function user_logged_in() {
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var query_response = this.responseText;
                    if (query_response === "true") {
                        vue_header.user = true;
                    }
                    if (query_response === "false") {
                        vue_header.user = false;
                    }

                }
            };

            xhttp.open("GET", "/user_status");
            xhttp.send();
        },
        logout_function: function logout_user() {
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    window.location.href = "index.html";
                }
            };

            xhttp.open("GET", "/logout");
            xhttp.send();
        },
        logout_sysadmin_function: function logout_sysadmin() {
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    window.location.href = "index.html";
                }
            };

            xhttp.open("GET", "/logout");
            xhttp.send();

        }
    }
});
