import renderQuestion from "./useRnder";

export default async function fetchData() {

    try {
        const res = await fetch('http://localhost:3000/question');
        const data = await res.json();

        renderQuestion(data);
    } catch (error) {
        console.error(error);
    }
}