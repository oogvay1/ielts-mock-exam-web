import sendData from "./useSend";

export default async function renderQuestion(data) {

    const root = document.getElementById('root');
    let id = 0;

    for (const question of data) {
        const questionContainer = document.createElement('li');
        questionContainer.classList = 'li';

        const questionTitle = document.createElement('h1');
        questionTitle.textContent = question.question;
        questionContainer.appendChild(questionTitle);

        const optionsContainer = document.createElement('div');
        question.options.forEach((optionText, index) => {

            id = `${question.id}_${index}`;
            const option = document.createElement('label');
            const input = document.createElement('input');

            input.name = question.id;
            input.value = optionText;
            input.type = "radio";
            input.id = id
            input.classList = 'input';

            option.htmlFor = id;
            option.textContent = optionText;

            const optionContainer = document.createElement('div');

            optionContainer.appendChild(input)
            optionContainer.appendChild(option);

            optionsContainer.appendChild(optionContainer);
        });

        questionContainer.appendChild(optionsContainer);
        root.appendChild(questionContainer);
    }
    const button = document.createElement('button');

    button.textContent = 'Click';

    button.onclick = () => {
        sendData(data, id);
    };

    root.appendChild(button);
}

function calculate(question, option) {

    for (const q of question) {
        if (q.id === Number(option) + 1) {
            return q
        }
    }

}