$(document).ready(function() {
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

    $('#login-form').submit(function(e) {
        e.preventDefault();
        alert('Login functionality to be implemented');
    });

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

function handleCredentialResponse(response) {
    const id_token = response.credential;
    fetch('/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: id_token }),
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                handleSuccessfulLogin(data.user);
            } else {
                console.error(data.message);
                alert('Authentication failed');
            }
        })
        .catch(err => {
            console.error('Error:', err);
            alert('An error occurred. Please try again.');
        });
}


function handleSuccessfulLogin(user) {
    document.querySelector('.nav-links').innerHTML = `
        <a href="#" id="home-link">Home</a>
        <a href="#" id="projects-link">Projects</a>
        <a href="#" id="profile-link">Profile</a>
        <span class="user-info">
            <img src="${user.picture}" alt="Profile" class="profile-pic">
            <span>${user.name}</span>
        </span>
        <a href="#" id="logout-btn">Logout</a>
    `;

    document.querySelector('#logout-btn').addEventListener('click', () => {
        google.accounts.id.disableAutoSelect();
        location.reload();
    });
}
