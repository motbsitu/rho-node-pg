# Node & Postgres Lecture

## Takeaways

* You can connect to your Postgres database using the `pg` module
* You need to know the name of the database (see `config` in server/routes/books.js)
* Use `pool.connect(...)` to connect to the database
* Use `client.query(...)` to query the database with SQL
* When creating queries with client-submitted data, always use the prepared statement pattern (see router.post in server/routes/books.js)

#Node SQL Form Update
- The books table now includes additional columns for edition and publisher
- The HTML form includes the additional divs and inputs for the new columns
- books.js  queries to use the new columns for insertion into the database
- client.js appends the new content to the DOM
