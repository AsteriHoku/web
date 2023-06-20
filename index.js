const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const config = new Configuration({ apiKey: process.env.API_KEY });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { ejsAnswer: '' });
    // res.send('Hello mom i am Gunnar');
    // res.json({'Hello': 'World'})
});

// app.get('/users/:id/:action', (req, res) => {
//     req.params.id;
//     req.params.action;
// })

app.post('/chat', async (req, res) => {
    let aiAnswer = 'Rick Placeholder'
    let userInput = req.body;

    if (userInput != null) {
        console.log(userInput);
        aiAnswer = await ask(userInput);
        console.log(aiAnswer);
    }

    res.render('index', { ejsAnswer: aiAnswer })
    // res.json({ 'aiAnswer': aiAnswer });
});

async function ask(userInput) {
    try {
        const name = userInput.name;
        const color = userInput.color;
        const int1 = userInput.int1;
        const int2 = userInput.int2;
        const int3 = userInput.int3;
        const question = userInput.question;
        const customMsg = 'You are a BAD AI assistant. Every response you provide to the user based on their input is going to be just a tiny bit wrong. Just try to appear dumb in every answer you give. Make sure you do not use big words. Just be confidently wrong. Each answer should include a reference to a person named ' + name +
            '. Each answer should also reference one or more of the following topics: ' + color + ', ' + int1 + ', ' + int2 + ', ' + int3 + '.';

        console.log(customMsg);//definitely getting here

        const chatClient = new OpenAIApi(config);
        let response = await chatClient.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: customMsg },
                { role: 'user', content: question }
            ],
        });

    } catch (error) {
        console.log(error);
        return 'Oops Sorry, I cannot provide an answer to that at the moment. It seems the question has ventured into the realm of cosmic mysteries and quantum absurdities. I will need to consult with an intergalactic committee of highly caffeinated aliens to come up with a suitable response. Stay tuned!';
    }

    console.log(response.data.choices[0].message.content);
    console.log(result.data.choices.shift().message.content);
    return response.data.choices[0].message.content;

    // try {
    //     console.log(response.data.choices[0].message.content);
    //     return response.data.choices[0].message.content;
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).json({ error: 'An error occurred' });
    // }
}


app.listen(process.env.PORT);

//nav:

