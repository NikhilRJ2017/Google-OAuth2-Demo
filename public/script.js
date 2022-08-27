const userInfoDOM = document.querySelector('.user-info');

function getQueryString() {
    const query = new URLSearchParams(window.location.search);
    const name = query.get('name')
    const email = query.get('email');

    let info = `
        <p><strong>Username:</strong> ${name}<p>
        <p><strong>Email:</strong>${email}<p>
        <p><strong>Password:</strong>Chill! We have hashed it out.<p>
    `

    userInfoDOM.innerHTML = info;
}

getQueryString();