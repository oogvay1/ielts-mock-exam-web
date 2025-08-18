import fetchData from "./hooks/useFetch";
import dashboardC from "./components/dashboard";

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

            fetchData();
            document.getElementById('modal-container').innerHTML = ''
        } else if (data.message == 'admin') {
            getUsers();
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


async function getUsers() {

    try {
        const res = await fetch('http://localhost:3000/question');

        if (!res) throw new Error(error);

        const data = await res.json();
        displayQuest(data);

    } catch (error) {
        console.error(error);
    }
}

function displayQuest(data) {
    const modal_container = document.getElementById('modal-container');
    modal_container.innerHTML = ``


    const dash = document.getElementById('dash');
    dash.innerHTML = dashboardC;


    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = "";

    for (const question of data) {
        const questionContainer = document.createElement('div');
        questionContainer.classList = 'questionContainer';

        questionContainer.innerHTML = `
                <h1 class="question-text">${question.question}</h1>
                <div>
                    <input type="text" class="edit-input" value="${question.question}" style="display:none;" />
                    <button class="edit-btn" data-id="${question.id}">
                        <i class="ri-edit-line"></i>
                    </button>
                    <button class="save-btn" data-id="${question.id}" style="display:none;">Save</button>
                    <button class="delete-btn" data-id="${question.id}">Delete</button>
                </div>
        `;

        dashboard.appendChild(questionContainer);
    }

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = async () => {
            const id = btn.dataset.id;
            await fetch(`http://localhost:3000/question/${id}`, {
                method: "DELETE"
            });
            getUsers();
        };
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.onclick = () => {
            const container = btn.closest(".questionContainer");
            container.querySelector(".question-text").style.display = "none";
            container.querySelector(".edit-input").style.display = "inline-block";
            container.querySelector(".save-btn").style.display = "inline-block";
            btn.style.display = "none";
        };
    });

    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.onclick = async () => {
            const id = btn.dataset.id;
            const container = btn.closest(".questionContainer");
            const newValue = container.querySelector(".edit-input").value;

            await fetch(`http://localhost:3000/question/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: newValue })
            });

            getUsers();
        };
    });

}
