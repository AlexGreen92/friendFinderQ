var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3308,
	user: "root",
	password: "root",
});

connection.connect(function(err) {
	if (err) {
	  console.error("error connecting: " + err.stack);
	  return;
	}
	console.log("connected as id " + connection.threadId);
});

connection.query("CREATE DATABASE IF NOT EXISTS friends;");
connection.query("USE friends");
connection.query(`CREATE TABLE IF NOT EXISTS profiles (
	name VARCHAR(255),
	photo VARCHAR(255),
	scores VARCHAR(255));`
);
//stole some data from your example api
connection.query('INSERT INTO profiles (name, photo, scores) VALUES ("Ahmed","https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg","5,1,4,4,5,1,2,5,4,1")');
connection.query('INSERT INTO profiles (name, photo, scores) VALUES ("Jacob Deming","https://pbs.twimg.com/profile_images/691785039043022849/oWsy8LNR.jpg","4,2,5,1,3,2,2,1,3,2")')
connection.query('INSERT INTO profiles (name, photo, scores) VALUES ("Jeremiah Scanlon","https://avatars2.githubusercontent.com/u/8504998?v=3&s=460","5,2,2,2,4,1,3,2,5,5")')
connection.query('INSERT INTO profiles (name, photo, scores) VALUES ("Louis T. Delia","https://pbs.twimg.com/profile_images/639214960049000449/lNCRC-ub.jpg","3,3,4,2,2,1,3,2,2,3")')
connection.query('INSERT INTO profiles (name, photo, scores) VALUES ("Lou Ritter","https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAkDAAAAJDhhZTI5NTk2LWQzZjUtNDJjZi1hMTM2LTQ3ZjNmYjE0YmY2NA.jpg","4,3,4,1,5,2,5,3,1,4")')
connection.query('INSERT INTO profiles (name, photo, scores) VALUES ("Jordan Biason","https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAisAAAAJGUxYzc4YzA0LWQxMzUtNGI4NS04YTFiLTkwYzM0YTZkNzA2NA.jpg","4,4,2,3,2,2,3,2,4,5"')
module.exports = function(app) {
	 app.get('/api/friends', function(req, res) {
		 connection.query('SELECT*FROM profiles',function(err,result){
			 res.send(result);
		 })
	 });

	app.post('/api/friends', function(req, res) {
		var query = 'INSERT INTO profiles (name, photo, scores) VALUES ('+JSON.stringify(req.body.name)+','+JSON.stringify(req.body.photo)+','+JSON.stringify(req.body.scores)+')';
		   connection.query(query)
	});
};
