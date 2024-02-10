/* eslint-disable linebreak-style */
// you need to redo your vue, follow the same style as signup.js, dashboard.js etc

var vueinst = new Vue({
    el: '#main',
    data: {
        current_tab: 1,
        username: null,
        is_member: false,
        param: new URLSearchParams(window.location.search).get('club_id'),
        current_club: [],
        new_post: [{
            title: '',
            description: '',
            visibility: 'public'
        }],
        post_list: [],
        members: [],
        event_list: [],
        rsvp_list: [],
        create_event: true,
        new_event: {
            name: '',
            description: '',
            start_date: '',
            end_date: '',
            location: '',
            club_id: new URLSearchParams(window.location.search).get('club_id')
        },
        show_event: false,
        event_index: null,
        is_rsvp: false,
        email_notif: null,
        show_rsvp: false,
        rsvp_index: null,
        curr_rsvp_list: []




        // big_comment_box: [
        //     {
        //         post_owner: '01/01/01',
        //         club_RSVP: 'tony tone',
        //         post_body: 'okay this is epic',
        //         post_reply: 'truly epic'
        //     },
        //     {
        //         post_owner: '02/02/02',
        //         club_RSVP: 'toni tone',
        //         post_body: 'okay this is epicuy',
        //         post_reply: 'truly epiasdasc'
        //     }
        // ],
    },
    mounted: function(){
        this.no_id();
        this.get_user();
        this.validate_member();
        this.get_club();
        this.get_posts();
        this.get_club_members();

        this.get_event_list();
        this.get_rsvp_list();
    },
    methods: {

        fill_rsvp: function(evnt_id){

            vueinst.curr_rsvp_list=[];
            console.log(evnt_id);
            for(let i = 0; i<vueinst.rsvp_list.length; i++){
                console.log(vueinst.rsvp_list[i].event_id);
                if(vueinst.rsvp_list[i].event_id===evnt_id){
                    console.log("test");
                    vueinst.curr_rsvp_list.push(vueinst.rsvp_list[i].username);
                }
            }

        },

        email_post: function(){
            var member_email = [];

            for(var i=0; i<vueinst.members.length; i++){
                member_email.push(vueinst.members[i].email);
            }

            console.log(member_email);

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = JSON.parse(this.responseText);
                    // if(query_response.)
                }
            };

            xhttp.open("POST", "/email");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({
                recipient: member_email,
                subject: "Post",
                text: 'Your club, "'+vueinst.current_club[0].club_name+'", has a new post: "'+ vueinst.new_post[0].title +'". It states: "'+vueinst.new_post[0].description+'"',
                club_name: vueinst.current_club[0].club_name
            }));
        },
        email_event: function(){
            var member_email = [];

            for(var i=0; i<vueinst.members.length; i++){
                member_email.push(vueinst.members[i].email);
            }

            console.log(member_email);

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = JSON.parse(this.responseText);
                    // if(query_response.)
                }
            };

            xhttp.open("POST", "/email");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({
                recipient: member_email,
                subject: "Event",
                text: 'Your club, "'+vueinst.current_club[0].club_name+'", has a new event: "'+ vueinst.new_event.name +'". It starts at: "'+vueinst.new_event.start_date+'", ends at: "'+vueinst.new_event.end_date+'", and is taking place at: "'+ vueinst.new_event.location+'".',
                club_name: vueinst.current_club[0].club_name
            }));
        },
        change_notif: function(){

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = JSON.parse(this.responseText);
                    // if(query_response.)

                    window.location.reload();
                }
            };

            xhttp.open("POST", "/change_notif");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({
                club_id: new URLSearchParams(window.location.search).get('club_id'),
                notif: vueinst.email_notif
            }));

        },
        check_email: function(){

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = JSON.parse(this.responseText);
                    // if(query_response.)
                    if(query_response[0].notification === 1){
                        vueinst.email_notif = 1;
                    }
                    else{
                        vueinst.email_notif = 0;
                    }
                }
            };

            xhttp.open("POST", "/check_notif");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ club_id: new URLSearchParams(window.location.search).get('club_id') }));

        },
        join_club: function(){

            if(vueinst.username===null){
                window.location.href = "login.html";
                return;
            }

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    console.log(query_response);
                    window.location.reload();
                }
            };

            xhttp.open("POST", "/join_club");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ club_id: new URLSearchParams(window.location.search).get('club_id') }));
        },
        leave_club: function(){


            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    // console.log(query_response);
                    // vueinst.is_member=false;
                    window.location.reload();
                }
            };

            xhttp.open("POST", "/leave_club");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ club_id: new URLSearchParams(window.location.search).get('club_id') }));
        },
        no_id: function(){
            if(new URLSearchParams(window.location.search).get('club_id') === null){
                window.location.href = "index.html";
            }
        },
        get_user: function(){
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vueinst.username = query_response;
                }
            };

            xhttp.open("GET", "/get_username");
            xhttp.send();
        },
        validate_member: function(){
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = JSON.parse(this.responseText);
                    // console.log(query_response.length);
                    if(query_response.length === 0){
                        vueinst.is_member = false;
                    }
                    else{
                        vueinst.is_member = true;
                    }
                }
            };

            xhttp.open("POST", "/is_member");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ club_id: new URLSearchParams(window.location.search).get('club_id') }));
        },
        get_club: function(){
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vueinst.current_club = JSON.parse(query_response);
                }
            };

            xhttp.open("POST", "/get_club");
            // console.log(new URLSearchParams(window.location.search).get('club_id'));
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ club_id: new URLSearchParams(window.location.search).get('club_id') }));
        },
        /* for the post tab start */
        submit_posts: function(){

            // console.log(post_data);


            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    // console.log('added');
                    window.location.reload();
                }
            };

            xhttp.open("POST", "/submit_post");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({
                post_details: vueinst.new_post,
                username: vueinst.username,
                club_id: vueinst.current_club[0].club_id
            }));

        },
        get_posts: function(){
            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if (this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vueinst.post_list = JSON.parse(query_response);
                }
            };

            xhttp.open("POST", "/getting_post");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ club_id: new URLSearchParams(window.location.search).get('club_id') }));
        },

        /* for the post tab end */

        /* for the members tab start */
        get_club_members: function(){
            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if (this.status === 200 && this.readyState === 4){
                    var query_response = this.responseText;
                    vueinst.members = JSON.parse(query_response);
                }
            };
            xhttp.open("POST", "/get_members");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ club_id: new URLSearchParams(window.location.search).get('club_id') }));
        },

        submit_event: function(){
            let xhttp = new XMLHttpRequest();


            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    // console.log('added');
                    // console.log(new URLSearchParams(window.location.search).get('club_id'));

                    window.location.reload();
                }
            };

            xhttp.open("POST", "/submit_event");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(vueinst.new_event));
        },
        /* for the members tab end */

        /* for club header date start */
        // get_club_header_date: function(){
        //     let xhttp = new XMLHttpRequest();

        //     xhttp.onreadystatechange = function(){
        //         if (this.status === 200 && this.readyState === 4){
        //             var query_response = this.responseText;
        //             vueinst.date = JSON.parse(query_response);
        //         }
        //     };
        //     xhttp.open("POST", "/get_event_date");
        //     xhttp.send(JSON.stringify({ club_id: new URLSearchParams(window.location.search).get('club_id') }));
        // },
        /* for club header date end */

        /* for club header pic start
        get_club_header_pic: function(){
            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if (this.status === 200 && this.readyState === 4){
                    var query_response = this.responseText;
                    vueinst.club_pic = JSON.parse(query_response);
                }
            };
            xhttp.open("POST", "/get_event_pic");
            xhttp.send();
        }
         for club header pic end */

         /* for club general information start */
        get_club_information: function(){
            console.log('wewoooo');
            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if (this.status === 200 && this.readyState === 4){
                    var query_response = this.responseText;
                    vueinst.general_info = JSON.parse(query_response);
                }
            };
            xhttp.open("POST", "/get_event_information");
            xhttp.send();
        },
        /* for club general information end */
        /* get event infomations */
        get_event_list: function(){
            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if (this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vueinst.event_list = JSON.parse(query_response);
                }
            };

            xhttp.open("POST", "/getting_events");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ club_id: new URLSearchParams(window.location.search).get('club_id') }));
        },
        /* get rsvp infomation */
        /* get_rsvp_list: function(){
            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if (this.readyState === 4 && this.status === 200){
                    var query_response = this.responseText;
                    vueinst.rsvp_list = JSON.parse(query_response);
                }
            };

            xhttp.open("POST", "/getting_rsvp");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ event_id:
                new URLSearchParams(window.location.search).get('event_id') }));
        }, */
        /* submit new event */
        submit_new_event: function(){

            // console.log(post_data);
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    // console.log('added');
                    window.location.reload();
                }
            };

            xhttp.open("POST", "/submit_event");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(vueinst.new_event));
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
        },
        get_rsvp_list: function(){
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    // console.log('added');
                    // window.location.reload();
                    var query_response = this.responseText;

                    vueinst.rsvp_list = JSON.parse(query_response);
                    // console.log("vueinst.rsvp_list: " + vueinst.rsvp_list);
                    // console.log(query_response)
                    // if(vueinst.rsvp_list.length === 0){
                    //     vueinst.is_rsvp = false;
                    // }
                    // else{
                    //     vueinst.is_rsvp = true;
                    // }

                }
            };

            xhttp.open("POST", "/getting_rsvp_list");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({club_id: new URLSearchParams(window.location.search).get('club_id')}));
        }
    }
});

/* to show to popup in the current events tab */
// function show_extra_info(id) {
//     var popup = document.getElementById(id);
//     popup.classList.toggle("show_text");
// }

/* wip start */

/* showing the gen info, event info or member tabs */
// function openTab(tabName) {
//     var tabContent;
//     tabContent = document.getElementsByClassName("tab_content");
//     let i;

//     // hide all tabs
//     for (i = 0; i < tabContent.length; i++) {
//         tabContent[i].style.display = "none";
//     }

//     document.getElementById(tabName).style.display = "block";
// }




/* wip end */


