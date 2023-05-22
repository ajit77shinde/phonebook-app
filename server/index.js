const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const DB = 'mongodb+srv://ajit77shinde:OfLaUiwBr5jDRdOc@cluster0.h4tmkdb.mongodb.net/';
const PhoneBook = require('./Model/PhoneBook');
require("dotenv").config();
// middleware
const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}

app.use(express.json());
app.use(cors(corsOptions));
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
}).catch(err => {
    console.log(err);
});
app.use(cors());
//add phone number
app.post('/add-phone', async (req, res) => {
    console.log('req = ', req.body)
    const phoneNumber = new PhoneBook(req.body)
    try {
        await phoneNumber.save()
        res.status(201).json({
            status: 'Success',
            data: {
                phoneNumber
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'Failed',
            message: err
        });
    }
});

//Get phone number
app.get('/get-phone', async (req, res) => {
    const phoneNumbers = await PhoneBook.find({});
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                phoneNumbers
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err
        });
    }
});
//Update Phone number
app.patch('/update-phone/:id', async (req, res) => {
    console.log("req.params.id.body = ", req.params.id.body);
    const updatedPhone = await PhoneBook.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    console.log('updatedPhone = ', updatedPhone);
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                updatedPhone
            }
        })
    } catch (err) {
        console.log(err);
    }
});
//Delete Phone
app.delete('/delete-phone/:id', async (req, res) => {
    await PhoneBook.findByIdAndDelete(req.params.id);
    try {
        res.status(200).json({
            status: 'Success',
            data: {}
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'Failed',
            data: err
        })
    }
});
//End Routing code 
// const PORT = 8080;
// app.listen(PORT, () => {
//     console.log(`app is running on port ${PORT}...`);
// })