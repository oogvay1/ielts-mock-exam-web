export default async function sendData(data, id) {
    const inputs = document.querySelectorAll('input:checked');

    if (inputs.length === data.length) {
        const modal = document.createElement('div');

        modal.classList = 'modal';

        modal.innerHTML = `
                <h1>Do You really want to complete the test</h1>

                <div>
                    <button id="yes-button">Yes</button>
                    <button class="calcel-button">Cancel</button>
                </div>
            `

        const userData = {};
        let counter = 1;

        for (const input of inputs) {
            if (counter > input.length) break;

            const oId = Number(input.id.slice(2)) + 1

            userData[counter] = oId;
            counter++;
        }

        const res = await fetch('http://localhost:3000/check', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await res.json();

        console.log(result);
    }
}