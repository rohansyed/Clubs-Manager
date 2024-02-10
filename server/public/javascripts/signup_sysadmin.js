/* Signup System Administration Page Javascript */
const vueinst = new Vue({
    el: '#app',
    data: {
        userCredentials: {
            username: '',
            password: '',
            date: new Date().toISOString().slice(0, 10)
        },
        message: 'This Signup Page Is Only For Signing Up New System Administrators'
    },
    methods: {
        signupSysAdmin_function: function signupSysAdmin() {

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    vueinst.message = 'New System Administrator Account Created Successfully!';
                } else if (this.readyState === 4 && this.status === 409) {
                    vueinst.message = 'Username Taken, Please Enter Another Username';
                } else if (this.readyState === 4 && this.status === 500) {
                    // remove this when sysadm foreign key restraint is removed
                    vueinst.message = 'Only Existing Users Can Be Signed Up As System Admins, Please Try Again';
                }
            };

            xhttp.open("POST", "/signup_sysadmin");
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(vueinst.userCredentials));
        }
    }
});
