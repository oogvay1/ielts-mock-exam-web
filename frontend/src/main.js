import fetchData from "./hooks/useFetch";

const login_btn = document.getElementById('login-btn');

login_btn.onclick = () => {

    const email = document.getElementById('email')
    email.classList.toggle('active');

    document.getElementById('login-inputs').classList.toggle('active');
    document.getElementById('sign-up-btn').textContent = email.classList == 'active' ? 'Sign In' : 'Sign Up';
}

const sign = document.getElementById('sign-up-btn');

sign.onclick = () => {
    document.querySelectorAll('.input').forEach((el, index) => {
        const { name, value } = el;
        
        
    });
}