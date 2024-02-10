/* Signup Page User Details */
const vueinst = new Vue({
    el: '#app',
    data: {
        userCredentials: {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signup_function: function signup() {

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    window.location.href = '/login.html';
                }
            };

            xhttp.open("POST", "/signup");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(vueinst.userCredentials));
        }
    }
});
