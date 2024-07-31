const express = require('express');
const mongoose = require('mongoose');
const Comic = require('./models/comics');
const Genre = require('./models/genres');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extends: false}));

app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog')
})
//----------------------------------------------------------
//Comic
//----------------------------------------------------------
//post
app.post('/comics', async (req, res) => {
    try {
        const {
            title,
            timestamp,
            thumbnailComic,
            author,
            description,
            view,
            rating,
            genres,
            chapters
        } = req.body;

        // Kiểm tra và lấy các genreName của các genres từ genreNames
        const genreNames = [];
        for (const genreName of genres) {
            const genre = await Genre.findOne({ genreName });
            if (!genre) {
                return res.status(400).json({ message: `Genre with name ${genreName} not found` });
            }
            genreNames.push(genre.genreName);
        }

        // Tạo comic mới với genreNames
        const newComic = new Comic({
            title,
            timestamp,
            thumbnailComic,
            author,
            description,
            view,
            rating,
            genres: genreNames,
            chapters
        });

        // Lưu comic mới vào cơ sở dữ liệu
        const savedComic = await newComic.save();
        res.status(201).json(savedComic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//get
app.get('/comics', async (req, res) => {
    try {
        const comics = await Comic.find({});
        res.status(200).json(comics);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/comics/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const comic = await Comic.findById(id);
        res.status(200).json(comic);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/comics/title/:title', async (req, res) => {
    try {
        const {title} = req.params;
        const comic = await Comic.findOne({ title: title });
        if (comic) {
            res.status(200).json(comic);
        } else {
            res.status(404).json({ message: 'Comic not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//put
app.put('/comics/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const comic = await Comic.findByIdAndUpdate(id, req.body);

        if (!comic){
            res.status(404).json({message: `cannot find comic: ${id}`});
        }
        const updatedComic = await Comic.findById(id);
        res.status(200).json(updatedComic);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
//detele
app.delete('/comics/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const comic = await Comic.findByIdAndDelete(id, req.body);

        if (!comic){
            res.status(404).json({message: `cannot find comic: ${id}`});
        }
        const updatedComic = await Comic.findById(id);
        res.status(200).json(updatedComic);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
//----------------------------------------------------------
//Genre
//----------------------------------------------------------
//post
app.post('/genres', async (req, res) => {
    try {
        const genres = await Genre.create(req.body);
        res.status(200).json(genres);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
})
//get
app.get('/genres', async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.status(200).json(genres);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/genres/:genreName/', async (req, res) => {
    try {
        const { genreName } = req.params;

        // Tìm thể loại với tên tương ứng
        const genre = await Genre.findOne({ genreName });
        if (!genre) {
            return res.status(404).json({ message: `Genre with name ${genreName} not found` });
        }

        // Tìm tất cả các truyện thuộc thể loại này
        const comics = await Comic.find({ genres: genreName });

        res.status(200).json(comics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//mongoDB_connection
mongoose
.connect('mongodb+srv://cnpmnc152:FhbYJGoOIRaoh6F6@comicreaderapi.yxsotjy.mongodb.net/?retryWrites=true&w=majority&appName=ComicReaderAPI')
.then(() => {
    console.log('Connected')
    app.listen(3000, () => {
        console.log('Node API is running')
    });
}).catch((error) => {
    console.log(error)
})