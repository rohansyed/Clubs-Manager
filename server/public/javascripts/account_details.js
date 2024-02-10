/* Account Details Page */
const vueinst = new Vue({
    el: '#app',
    data: {
        userCredentials: {
            firstName: '',
            lastName: '',
            username: '',
            newUsername: '',
            password: '',
            newPassword: ''
        },
        errorMessage: 'No Changes Have Been Made Yet'
    },
    methods: {
        accountDetails_function: function accountDetails() {

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    vueinst.errorMessage = 'Account Details Saved Successfully!';
                    window.location.href = '/dashboard.html';
                } else if (this.readyState === 4 && this.status === 400) {
                    vueinst.errorMessage = 'Please Enter Both First & Last Names';
                } else if (this.readyState === 4 && this.status === 403) {
                    vueinst.errorMessage = 'Incorrect Current Username Provided. Please Try Again';
                } else if (this.readyState === 4 && this.status === 406) {
                    vueinst.errorMessage = 'Incorrect Current Password Provided. Please Try Again';
                } else if (this.readyState === 4 && this.status === 409) {
                    vueinst.errorMessage = 'Please Enter Both Current AND New Usernames';
                } else if (this.readyState === 4 && this.status === 411) {
                    vueinst.errorMessage = 'Please Enter Both Current AND New Passwords';
                }
            };

            xhttp.open("POST", "/account_details");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(vueinst.userCredentials));
        }
    }
});