import express from "express";
import Database from "better-sqlite3";
const db = new Database('wadsongs.db');
const app = express();
app.use(express.json());

app.get('/artist/:artist' ,(req, res)=> {
	try{
		const stmt = db.prepare(" SELECT * FROM wadsongs WHERE artist=?");
		const results = stmt.all(req.params.artist);
		res.json(results);
	} catch(error){
		res.status(500).json({error: error});
	}
});

app.get('/title/:title' ,(req, res)=> {
	try{
		const stmt = db.prepare(" SELECT * FROM wadsongs WHERE title=?");
		const results = stmt.all(req.params.title);
		res.json(results);
	} catch(error){
		res.status(500).json({error: error});
	}
});

app.get('/song/:artist/:title' ,(req, res)=> {
	try{
		const stmt = db.prepare(" SELECT * FROM wadsongs WHERE artist=? AND title=?");
		const results = stmt.all(req.params.artist, req.params.title);
		res.json(results);
	} catch(error){
		res.status(500).json({error: error});
	}
});

app.get('/id/:id' ,(req, res)=> {
	try{
		const stmt = db.prepare(" SELECT * FROM wadsongs WHERE id=?");
		const results = stmt.get(req.params.id);
		res.json(results);
	} catch(error){
		res.status(500).json({error: error});
	}
});

app.post('/song/create', (req, res) => {
	try {
		const stmt = db.prepare("INSERT INTO wadsongs(title,artist,year,downloads,price,quantity) VALUES(?,?,?,?,?,?)");
		const info = stmt.run(req.body.titel, req.body.artist, req.body.year, req.body.downloads, req.body.price, req.body.quantity);
		res.json({id: info.lastInsertRowid});
	} catch(error) {
		console.log(error);
		res.status(500).json({error: error });
	}
)};

app.put('/song/:id', (req, res) =>{
	try {
		const stmt = db.prepare('UPDATE wadsongs SET price=?,quantity=? WHERE id=?');
		const info = stmt.run (req.body.price, req.body.quantity, req.params.id);
		if (info.changes == 1) {
			res,status(200).json({success: true});
		}else{
			res.status(404).json({error: "could not find song with that ID"});
		}
	}catch(error) {
		res.status(500).json({error: error});
	}
});

app.delete('/song/:id', (req, res) =>{
	try {
		const stmt = db.prepare('DELETE FROM wadsongs WHERE id=?');
		const info = stmt.run (req.params.id);
		if (info.changes == 1) {
			res,status(200).json({success: true});
		}else{
			res.status(404).json({error: "could not find song with that ID"});
		}
	}catch(error) {
		res.status(500).json({error: error});
	}
});

app.put('/purchase/:id', (req, res) =>{
	try {
		const stmt = db.prepare('UPDATE orders SET songID=?, quantity=?, userID=?, artistID=? WHERE id=?');
		const info = stmt.run (req.body.songID, req.body.quantity, req.body.userID, req.body.artistID, req.params.id);
		if (info.changes == 1) {
			res,status(200).json({success: true});
		}else{
			res.status(404).json({error: "could not find song with that ID"});
		}
	}catch(error) {
		res.status(500).json({error: error});
	}
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});