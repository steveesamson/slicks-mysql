# slicks-mysql

slicks-mysql allows the expressive writing of database queries and routines. slicks-mysql permit chaining, which is intuitive as you can nearly guess what should come next even if you are just getting started with slicks-mysql. slicks-mysql is not an ORM. It was developed to allow folks coming from relational databases background write expressive queries with object interactions in mind.
Inspired by **`Codeigniter Active Record`**.

## slicks-mysql options
slicks-mysql takes all the options/config allowed by `node-mysql`. Please see https://www.npmjs.org/package/mysql for details. It also has, in addition, `debug_db` option which could be `true/false`. `debug_db` enables the logging of the raw queries to the console when it is set to *true*, useful while developing.


## Installation

```cli
  npm install slicks-mysql --save
```

## Usage

Using slicks-mysql is pure joy:

```javascript

       var options = {
                host: 'localhost',
                user: 'steve',
                dateStrings: true,
                database: 'todo',
                password: 'steve-secret',
                //If the following was enabled, your queries will be logged to console
                //debug_db: true
            },
           slicks_mysql = require('slicks-mysql')(options);
           //Let us now connect and get a db object
           slicks_mysql.connect(function(err, db){
                if(err){
                    throw err;
                }
                console.log('Connected!');

                //Do db stuffs here

           });
```

## slicks-mysql management

Now that we have a valid `db` object, how do we manage it? Well, all connections on `db` are automatically pooled, thus, to release a `db` object, it is done with `db.release()`; this returns the current connection on the `db` to the pool, however, to actually close the connection, use `db.destroy()`; this does the cleanup and closes the underlying connection to database.


## `fetch`ing records

```javascript

     db.fetch('todo', function (err, rows) {
        if (err) {
            throw err;
        }
        console.log(rows);

    });
```

The above is used when all record fields are needed. However, if a subset of the fields are of interest, **`select`** with **`from`** and **`fetch`** is the way to go.

## `select`ing records

```javascript

      db.select('task, task_owner')
         .from('todo')
         .fetch(function (err, rows) {
             if (err) {
                 throw err;
             }
             console.log(rows);
         });
```

## `query`ing records with `query`

```javascript

    var q = "select * from todo";
        db.query(q, function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
        });
```

**Note:** The use of ONLY **`fetch`** or in conjunction with **`select`** and **`from`** does not change the outcome. I think it just depends on what flavour you like or the need at hand. That being said, all the examples are written in one or other flavour but what was done in one flavour can equally be done in the other flavour.

### `where`
```javascript

     db.where('id', 1)
       .fetch('todo', function (err, rows) {
             if (err) {
                 throw err;
             }
              console.log(rows);
         });
```

```javascript

     db.where('id >', 1)
       .fetch('todo', function (err, rows) {
             if (err) {
                 throw err;
             }
              console.log(rows);
         });
```

```javascript

     db.where('id <', 10)
       .fetch('todo', function (err, rows) {
             if (err) {
                 throw err;
             }
              console.log(rows);
         });
```

```javascript

     db.where('id >=', 1)
       .fetch('todo', function (err, rows) {
             if (err) {
                 throw err;
             }
              console.log(rows);
         });
```

```javascript

     db.where('id <=', 10)
       .fetch('todo', function (err, rows) {
             if (err) {
                 throw err;
             }
              console.log(rows);
         });
```

### `where`, `orWhere`, `whereIn`, `orWhereIn`, `whereNotIn`, `orWhereNotIn` conditions
Please, note that all the variations that apply to **`where`** also apply to the following: `orWhere`, `whereIn`, `orWhereIn`, `whereNotIn`, `orWhereNotIn`.

### `orWhere`
```javascript

     db.where('id', 10)
       .orWhere('task_owner', 1)
       .fetch('todo', function (err, rows) {
             if (err) {
                 throw err;
             }
              console.log(rows);
         });
```

### `whereIn`

```javascript

    db.select('todo.*') //I could have used fetch directly here too
      .from('todo')
      .whereIn('id', "1,3")
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `orWhereIn`

```javascript

    db.select('todo.*') //I could have used fetch directly here too
      .from('todo')
      .where('id', 2)
      .orWhereIn('id', "1,3")
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `whereNotIn`

```javascript

    db.select('todo.*') //I could have used fetch directly here too
      .from('todo')
      .whereNotIn('id', "1,2,3")
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `orWhereNotIn`

```javascript

    db.select('todo.*') //I could have used fetch directly here too
      .from('todo')
      .where('id', 2)
      .orWhereNotIn('id', "1,3")
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `like`

Generates `task like %vacuum%` , **`b`** or **`both`**  for both ends are allowed.

```javascript

    db.select('todo.*') //I could have used fetch directly here too
      .from('todo')
      .like('task', 'vacuum', 'b')
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `orLike`

Generates `task like '%vacuum' or task like 'iron%'` , **`l`** or **`left`**  for left end are allowed, while **`r`** or **`right`**  for right end are allowed.

```javascript

    db.select('todo.*') //I could have used fetch directly here too
      .from('todo')
      .like('task', 'vacuum', 'l')
      .orLike('task', 'iron', 'r')
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `notLike`

Generates `task NOT like '%vacuum%'` , **`b`** or **`both`**  for both ends are allowed.

```javascript

    db.select('todo.*') //I could have used fetch directly here too
      .from('todo')
      .notLike('task', 'vacuum', 'b')
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `orNotLike`

Generates `OR task NOT like '%dishes'` , **`l`** or **`left`**  for left end are allowed.

```javascript

    db.select('todo.*') //I could have used fetch directly here too
      .from('todo')
      .where('id', 2)
      .orNotLike('task', 'dishes', 'l')
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `limit`

```javascript

    db.limit(2) //I could have used select, from + fetch here too
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `limit` with `offset`

```javascript

    db.limit(2, 0) //I could have used select, from + fetch here too
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `orderBy (desc)`

```javascript

    db.orderBy('id', 'desc') //I could have used select, from + fetch here too
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `orderBy ([asc])` the direction is optional if ascending order is desired

```javascript

    db.orderBy('id', 'asc') //I could have used select, from + fetch here too
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

Same as below:

```javascript

    db.orderBy('id') //I could have used select, from + fetch here too
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `join`ing tables

```javascript

    db.select('t.*, o.name')
      .from('todo t')
      //'left', for left join, also 'right', 'outer' etc are allowed
      .join('task_owners o', 't.task_owner = o.id', 'left')
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `groupBy` for aggregates

```javascript

    db.select('o.name, count(*) tasks')
      .from('task_owners o')
      .join('todo t', 't.task_owner = o.id', 'left')
      .groupBy('o.name')
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `having` for aggregates

```javascript

    db.select('o.name, count(*) tasks')
      .from('task_owners o')
      .join('todo t', 't.task_owner = o.id', 'left')
      .groupBy('o.name')
      .having('tasks >', 2)
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

### `orHaving` for aggregates

```javascript

    db.select('o.name, count(*) tasks')
      .from('task_owners o')
      .join('todo t', 't.task_owner = o.id', 'left')
      .groupBy('o.name')
      .having('tasks >', 2)
      .orHaving('tasks', 3)
      .fetch(function (err, rows) {
            if (err) {
                throw err;
            }
            console.log(rows);
    });
```

## `insert`ing records

### `insert` - single record per insert

```javascript

    db.insert('task_owners', {id: 1, name: 'Test owner'}, function (err, res) {
        if (err) {
            throw err;
        }
        console.log(res.id);
    });
```

### inserting multiple records with `query`

```javascript

    var q = "insert into todo (id, task, task_owner)
            values
            (2,'Vacuum the floor',1),
            (3, 'Iron my shirt', 1)";//could be more

        db.query(q, function (err, res) {
            if (err) {
                throw err;
            }
            console.log('records inserted!');
        });
```



### `update`ing records

```javascript

       db.set('task', 'Updated Todo')
          .whereIn('id', '1,3')
          .update(function (err, res) {
            if (err) {
                throw err;
            }
            console.log(res.affectedRows);
        });
```

### `delete`ing records

```javascript

       db.where('id', 2)
         .delete(function (err, res) {
            if (err) {
                throw err;
            }
            console.log(res.affectedRows);
        });
```


## Test
Before running the tests, load the included script **test_scripts.sql** onto your mysql database. Ensure to load the script as 'root' for you need to grant privileges. Thereafter, run;

```cli
    npm test
```
