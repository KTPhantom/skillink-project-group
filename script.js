$(document).ready(function() {
    // Login modal functionality
    $('#login-btn').click(function() {
        $('#login-modal').show();
    });

    $('.close').click(function() {
        $('#login-modal').hide();
    });

    $(window).click(function(e) {
        if ($(e.target).hasClass('modal')) {
            $('.modal').hide();
        }
    });

    // Profile section toggle
    $('#profile-link').click(function(e) {
        e.preventDefault();
        $('.hero, .features, .projects').hide();
        $('#profile-section').show();
    });

    $('#home-link').click(function(e) {
        e.preventDefault();
        $('.hero, .features, .projects').show();
        $('#profile-section').hide();
    });

    // Form submission
    $('#login-form').submit(function(e) {
        e.preventDefault();
        // Add authentication logic here
        alert('Login functionality to be implemented');
    });

    // Project card interactions
    $('.project-card').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
            $(this).css('transition', 'transform 0.3s');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
});
//Google Authentication Handler
function handleCredentialResponse(response) {
    // Decode the JWT token
    const responsePayload = decodeJwtResponse(response.credential);
    
    // Send the token to your backend
    fetch(`${config.apiBaseUrl}/auth/google`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: response.credential
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store the session token
            localStorage.setItem('sessionToken', data.sessionToken);
            
            // Update UI for logged-in state
            handleSuccessfulLogin(responsePayload);
            
            // Close the login modal
            $('#login-modal').hide();
        }
    })
    .catch(error => {
        console.error('Authentication Error:', error);
        alert('Authentication failed. Please try again.');
    });
}
function decodeJwtResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
// Handle successful login
function handleSuccessfulLogin(userData) {
    // Update UI elements
    $('.nav-links').html(`
        <a href="#" id="home-link">Home</a>
        <a href="#" id="projects-link">Projects</a>
        <a href="#" id="profile-link">Profile</a>
        <span class="user-info">
            <img src="${userData.picture}" alt="Profile" class="profile-pic">
            <span>${userData.name}</span>
        </span>
        <a href="#" id="logout-btn">Logout</a>
    `);

    // Add logout handler
    $('#logout-btn').click(function(e) {
        e.preventDefault();
        google.accounts.id.revoke(userData.sub, function() {
            localStorage.removeItem('sessionToken');
            window.location.reload();
        });
    });
}