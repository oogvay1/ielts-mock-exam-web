import fetchData from "./hooks/useFetch";

const login_btn = document.getElementById('login-btn');

login_btn.onclick = () => {

    const email = document.getElementById('email');
    email.classList.toggle('active');

    document.getElementById('login-inputs').classList.toggle('active');
    document.getElementById('sign-up-btn').textContent = email.classList == 'active' ? 'Sign In' : 'Sign Up';
}

const sign = document.getElementById('sign-up-btn');
const inputs = document.querySelectorAll('.input');

sign.onclick = async () => {
    try {
        const user = {
            name: "",
            email: "",
            password: ""
        }

        inputs.forEach(el => {
            if (el.name === "name") user.name = el.value;
            if (el.name === "password") user.password = el.value;
            if (el.name === "email") user.email = el.value;
        });

        let res;

        if (document.getElementById('sign-up-btn').textContent === 'Sign In') {
            res = await fetch("http://localhost:3000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ ...user, email: "signin" })
            });

            clearInput()
        } else {
            res = await fetch("http://localhost:3000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(user)
            });

            clearInput()
        }

        const data = await res.json();

        if (data == true) {
            console.log('yes')
            fetchData();
            document.getElementById('modal-container').innerHTML = ''
        } else {
            console.log('user not found');
        }
        console.log(data);

    } catch (error) {
        console.error(error);
    }
};

function clearInput() {

    document.querySelectorAll('.input').forEach(el => el.value = '');
}