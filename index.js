import express from "express";
import bodyParser from "body-parser";
import fs from "fs"; // Node.js file system module

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Configure static file serving
app.use(express.static('public'));

// Use body-parser for form data handling
app.use(bodyParser.urlencoded({ extended: true }));

const posts = []; // Array to store posts

function generateUniqueId() {
    return Math.random().toString(36).substring(2, 9);
}

app.get('/', (req, res) => {
    res.render('index', { posts });
});

app.get('/create-post', (req, res) => {
    res.render('create-post');
});

app.post('/create-post', (req, res) => {
    const { title, content } = req.body;

    // Validation (optional)

    const newPost = {
        id: generateUniqueId(),
        title,
        content,
    };

    posts.push(newPost);

    // Save posts to a file (optional)
    savePostsToFile(posts);

    res.redirect('/');
});

// Function to save posts to a file (optional)
function savePostsToFile(posts) {
    const data = JSON.stringify(posts, null, 2);
    fs.writeFileSync('posts.json', data, 'utf8');
}

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});