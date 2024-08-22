let endpoint_login = '/api/login';
let endpoint_signup = '/api/signup';

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission
        submitLogin();
    });

    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission
        submitSignup();
    });
});


function switchToSignUp() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function switchToSignIn() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}


function submitLogin() {
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    console.log(username, password);

    // Securely send the plain text password over an HTTPS connection
    $.ajax({
        url: endpoint_login,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password
        }),
        success: function(response) {
            // If login is successful, redirect the user to the next page
            window.location.href = '/chat';
        },
        error: function(xhr) {
            // In case of an error, inform the user
            alert('Login failed: ' + xhr.responseText);
        }
    });

    return false;
}


function submitSignup() {
    var username = document.getElementById('signup-username').value;
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;
    console.log(username, password, email);

    // Securely send the plain text password over an HTTPS connection
    $.ajax({
        url: endpoint_signup,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            email: email,
            password: password
        }),
        success: function(response) {
            // if signup is successful, redirect the user to the next page
            window.location.href = '/chat';
        },
        error: function(xhr) {
            // In case of an error, inform the user
            alert('Signup failed: ' + xhr.responseText);
        }
    });

    return false;
}
