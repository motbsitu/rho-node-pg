//making connections to database
var router = require('express').Router();
var pg = require('pg');

var config = {
    database: 'rho' //provide name of database
};

//initialize the database connection pool
var pool = new pg.Pool(config);


router.get('/:id', function(req, res) {
    pool.connect(function(err, client, done) {
        if (err) {
            //printout err
            console.log('Error connecting to the DB', err);
            res.sendStatus(500); //send something to client
            done(); //releases connection
            return;
        }

        client.query('SELECT * FROM books WHERE id =$1;', [req.params.id], function(err, result) {
            done();
            if (err) {
                console.log('Error querying to the DB', err);
                res.sendStatus(500);
                return;
            }
            console.log('Got rows from the DB:', result.rows);
            res.send(result.rows);
        });
    });

});
//read existing books
router.get('/', function(req, res) {
    //err-an error object, will be not-null if there was an error connecting
    //          possible error - db not running, config is wrong
    //client is object used to make queries against db
    //done function to call when done
    pool.connect(function(err, client, done) {
        if (err) {
            //printout err
            console.log('Error connecting to the DB', err);
            res.sendStatus(500); //send something to client
            done(); //releases connection
            return;
        }
        //use client object.  takes 1 SQL string, 2 (optional) input params 3 callback
        //function to execute once query is finished
        //  callback takes an error object and a result object as arguments
        client.query('SELECT * FROM books', function(err, result) {
            done();
            if (err) {
                console.log('Error querying to the DB', err);
                res.sendStatus(500);
                return;
            }

            //result object has a bunch of other things, only want rows
            console.log('Got rows from the DB:', result.rows);
            res.send(result.rows);
        });
    });
});

//create new book
router.post('/', function(req, res) {
    pool.connect(function(err, client, done) {
        if (err) {
            //printout err
            console.log('Error connecting to the DB', err);
            res.sendStatus(500); //send something to client
            done(); //releases connection
            return;
        }

        client.query('INSERT INTO books (author, title, published, edition, publisher) VALUES ($1, $2, $3, $4, $5) returning *;', //$1, etc placeholder
            [req.body.author, req.body.title, req.body.published, req.body.edition, req.body.publisher], //what replaced with
            function(err, result) {
                done();
                if (err) {
                    console.log("error querying database", err);
                    res.sendStatus(500);
                    return;
                }
                res.send(result.rows);

            });
    });
});



module.exports = router;
