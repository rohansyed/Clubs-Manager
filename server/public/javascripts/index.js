const vueinst = new Vue({

    el: '#banner',
    data: {
        user: false
    },
    mounted:function(){
        this.is_logged();
    },
    methods: {
        is_logged: function user_logged_in(){
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    if(query_response === "true"){
                        vueinst.user = true;
                    }
                    if(query_response === "false"){
                        vueinst.user = false;
                    }

                }
            };

            xhttp.open("GET", "/user_status");
            xhttp.send();
        }
    }
});
