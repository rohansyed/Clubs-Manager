const vueinst = new Vue({

    el: '#create_club',
    data: {
        club_name: '',
        club_description: '',
        club_banner: null,
        username: null
    },
    mounted:function(){
        this.is_logged();
    },
    methods: {

        // handleFileChange(event) {
        //     vueinst.club_banner = event.target.files[0];
        //   },
        handle_submit(event){

            event.preventDefault();

            const form = event.target;
            const formData1 = new FormData(form);
            formData1.append("username", vueinst.username);


            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = JSON.parse(this.responseText);
                    window.location.href = "/club_home.html?club_id="+query_response[0].club_id;

                    // window.location.href="/club_home.html?club_id=test";
                }
            };

            xhttp.open("POST", "/create_new_club");
            // xhttp.setRequestHeader("Content-type", "multipart/form-data");


            xhttp.open(form.method, form.action);
            xhttp.send(formData1);


        },

        is_logged: function user_logged_in(){
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vueinst.username = query_response;
                    if(vueinst.username === null){
                        window.location.href("login.html");
                    }
                }
            };

            xhttp.open("GET", "/get_username");
            xhttp.send();
        }


    }
});
