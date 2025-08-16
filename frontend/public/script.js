document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const userId = document.getElementById('userId').value;
            const password = document.getElementById('password').value;

            if (userId && password) {
                console.log('Login successful! Redirecting to home.html');
                window.location.href = 'home.html'; 
            } else {
                alert('Please enter both User ID and Password.');
            }

            console.log('User ID:', userId);
            console.log('Password:', password);


      
            alert('Form submitted! (Check console for data)');
        });
    }
});