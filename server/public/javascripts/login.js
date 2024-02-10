/* Login Page User Details */
const vueinst = new Vue({
    el: '#app',
    data: {
        loginInfo: {
            username: '',
            password: ''
        },
        message: "Tip: If you haven't logged out previously using the logout button specifically, you can simply click the login button to access your account without having to enter your login details again"
    },
    methods: {
        login_function: function login() {

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    window.location.href = '/dashboard.html';
                } else if (this.readyState === 4 && this.status === 401) {
                    vueinst.message = 'Incorrect Current Username OR Password Provided. Please Try Again';
                }
            };

            xhttp.open("POST", "/login");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(vueinst.loginInfo));
        }
    }
});
