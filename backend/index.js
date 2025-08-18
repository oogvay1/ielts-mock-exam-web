import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import fs from "fs/promises"

const server = express();

server.use(cors());
server.use(bodyParser.json());

const answers = {
    1: 2,
    2: 2,
    3: 2,
    4: 3,
    5: 3,
    6: 1,
    7: 2,
    8: 1,
    9: 1,
    10: 2
};

server.get("/question", async (req, res) => {

    try {
        const file = await fs.readFile("./data/question.json", "utf-8");
        const questions = JSON.parse(file);
        res.json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not load questions" });
    }
});

server.post('/user', async (req, res) => {

    try {
        const file = JSON.parse(await fs.readFile('./data/users.json', "utf-8"));

        if (req.body.email == 'signin') {
            const user = file.filter(el => el.name == req.body.name);

            if (user[0].name == req.body.name) {
                res.send(true);
            } else if (req.body.name == 'Administrator') {
                res.send({ message: "admin" });
            } else {
                res.send(false);
            }
        } else {
            if (req.body.name.length > 0 && req.body.email.includes('@gmail.com') && req.body.password.length > 0) {
                file.push({ id: file.length + 1, ...req.body });
                await fs.writeFile('./data/users.json', JSON.stringify(file, null, "\t"));
                res.send(file);
            }
        }

    } catch (error) {
        console.error(error);
    }

});

server.post("/check", (req, res) => {

    const result = shallowEqual(answers, req.body, Object.keys(req.body).length, 0);

    res.send({
        result
    });
});

function shallowEqual(obj1, obj2, total, totalRight) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {

        if (obj1[key] == obj2[key]) {
            totalRight++;
        }
    }

    return `${100 * totalRight / total}%`;
}

server.put("/question/:id", async (req, res) => {
    try {
        const file = await fs.readFile("./data/question.json", "utf-8");
        let questions = JSON.parse(file);

        const id = parseInt(req.params.id);
        const { question } = req.body;

        let updated = false;
        const newQuestions = questions.map(q => {
            if (q.id === id) {
                updated = true;
                return { ...q, question };
            }
            return q;
        });

        if (!updated) {
            return res.status(404).json({ error: "Question not found" });
        }

        await fs.writeFile("./data/question.json", JSON.stringify(newQuestions, null, "\t"));
        res.json({ success: true, id, question });
    } catch {
        res.status(500).json({ error: "Could not update question" });
    }
});


server.delete("/question/:id", async (req, res) => {
    try {
        const file = await fs.readFile("./data/question.json", "utf-8");
        let questions = JSON.parse(file);

        const id = parseInt(req.params.id);

        const newQuestions = questions.filter(q => q.id !== id);

        if (newQuestions.length === questions.length) {
            return res.status(404).json({ error: "Question not found" });
        }

        await fs.writeFile("./data/question.json", JSON.stringify(newQuestions, null, "\t"));
        res.json({ success: true, id });
    } catch {
        res.status(500).json({ error: "Could not delete question" });
    }
});



server.listen(3000);
