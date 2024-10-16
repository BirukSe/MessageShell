import pg from 'pg';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const db = new pg.Client({
    user: 'birukee',
    host: 'localhost',
    database: 'Blog',
    password: 'new_password',
    port: 5432,
});

db.connect();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', async (req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM message');
//         console.log('Messages fetched:', result.rows); // Log the fetched messages
//         const message = result.rows[0]; 
//         res.render('index.ejs', { message });
//     } catch (err) {
//         console.error('Error fetching messages:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });
app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM message');
        console.log('Messages fetched:', result.rows); // Check what is fetched
        const message = result.rows[0]; 
        console.log('First message:', message); // Log the first message
        res.render('index.ejs', { message });
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).send('Internal Server Error');
    }
});




app.post('/send', async (req, res) => {
    const textCon = req.body.textCon;

    try {
        await db.query("TRUNCATE TABLE message");
        const result=await db.query('insert into message (textCon) values($1)', [textCon]); 
        // res.redirect('/');
      
      
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).send('Internal Server Error');
    }
});
// app.post('/send', async (req, res) => {
//     const textCon = req.body.textCon;
//     console.log('Message to insert:', textCon); // Log the incoming message

//     try {
//         // Only insert the new message
//         await db.query('INSERT INTO message (textCon) VALUES ($1)', [textCon]);
//         console.log('Message inserted successfully');
//         res.redirect('/'); // Redirect to the GET route
//     } catch (err) {
//         console.error('Error saving message:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });


// app.post('/send', async (req, res) => {
//     const textCon = req.body.textCon;
//     console.log('Message to insert:', textCon); // Log the incoming message

//     try {
//         await db.query("TRUNCATE TABLE message");
//         await db.query('INSERT INTO message (textCon) VALUES ($1)', [textCon]);
//         console.log('Message inserted successfully');
//         res.redirect('/');
//     } catch (err) {
//         console.error('Error saving message:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });



app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
