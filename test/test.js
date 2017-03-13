/**
 * Created by steve Samson <stevee.samson@gmail.com> on February 10, 2014.
 * Updated June 21, 2016.
 */

var chai = require('chai'),
    should = require('chai').should(),
//change the config appropriately for your database
    slicks_mysql = require('../dist/slicks-mysql')({
        host: 'localhost',
        user: 'tester',
        dateStrings: true,
        driver: 'mysql',
        database: 'todo_db',
        password: 'tester',
        debug_db: false
    }),
    db = null;

describe('#Slicks-MySql', function () {

    before(function (done) {
        slicks_mysql.connect(function (err, _db) {
            if (err) {
                throw err;
            }
            db = _db;
            done();
        })
    });

    after(function () {
        db.destroy();
    });

    describe('#Delete with "delete"', function () {
        it('Should delete all records in "task_owners" table without error', function (done) {
            db.delete('task_owners', function (err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
        });
    });

    describe('#Delete with "delete"', function () {
        it('Should delete all record from "todo" table without error', function (done) {
            db.delete('todo', function (err, res) {
                if (err) {
                    throw err;
                }
                done();
            });
        });
    });
    describe('#Insert with "insert" ', function () {
        it('Should insert into "task_owners" table without error and return insert id that equals 1', function (done) {
            db.insert('task_owners', {id: 1, name: 'Test owner'}, function (err, res) {
                if (err) {
                    throw err;
                }
                res.id.should.equal(1);
                done();
            });
        });
    });

    describe('#Insert with "insert" ', function () {
        it('Should insert into "todo" table without error and return insert id that equals 1', function (done) {
            db.insert('todo', {id: 1, task: 'Do dishes', task_owner: 1}, function (err, res) {
                if (err) {
                    throw err;
                }
                res.id.should.equal(1);
                done();
            });
        });
    });

    describe('#Insert multiple with "query"', function () {
        it('Should insert multiple records into "todo" table with "query" without error', function (done) {
            var q = "insert into todo (id, task, task_owner) values (2,'Vacuum the floor',1),(3, 'Iron my shirt', 1)";
            db.query(q, function (err, res) {
                if (err) {
                    throw err;
                }

                done();
            });
        });
    });

    describe('#Fetch records', function () {
        it('Should retrieve all records in "todo"  table with "fetch" without error, records length should be 3', function (done) {
            db.fetch('todo', function (err, rows) {
                if (err) {
                    throw err;
                }
                rows.should.have.length(3);
                done();
            });
        });
    });


    describe('#Query records with "query"', function () {
        it('Should retrieve all records in "todo"  table with "query" without error, records length should be 3', function (done) {
            var q = "select * from todo";
            db.query(q, function (err, rows) {
                if (err) {
                    throw err;
                }
                rows.should.have.length(3);
                done();
            });
        });
    });


    describe('#GreaterThan clause', function () {
        it('Should retrieve all records with id greater than 1 in "todo"  table with "where >" without error, records length should be 2', function (done) {
            db.where('id >', 1)
                .fetch('todo', function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(2);
                    done();
                });
        });
    });

    describe('#GreaterThanOrEquals clause', function () {
        it('Should retrieve all records with id greater than  or equals 1 in "todo"  table with "where >=" without error, records length should be 3', function (done) {
            db.where('id >=', 1)
                .fetch('todo', function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(3);
                    done();
                });
        });
    });


    describe('#LessThan clause', function () {
        it('Should retrieve all records with id less than 2 in "todo"  table with "where <" without error, records length should be 1', function (done) {
            db.where('id <', 2)
                .fetch('todo', function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(1);
                    done();
                });
        });
    });

    describe('#LessThanOrEquals clause', function () {
        it('Should retrieve all records with id less than  or equals 2 in "todo"  table with "where <=" without error, records length should be 2', function (done) {
            db.where('id <=', 2)
                .fetch('todo', function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(2);
                    done();
                });
        });
    });

    describe('#Limit clause', function () {
        it('Should retrieve ONLY 2 records in "todo"  table with "limit" of 2 without error, records length should be 2', function (done) {
            db.limit(2)
                .fetch('todo', function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(2);
                    done();
                });
        });
    });

    describe('#OrderBy DESC clause', function () {
        it('Should retrieve ALL records in "todo"  table with "orderby" of "desc" without error, records length should be 3, first record id should be 3', function (done) {
            db.orderBy('id', 'desc')
                .fetch('todo', function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(3);
                    rows[0].id.should.equal(3);
                    done();
                });
        });
    });

    describe('#OrderBy ASC clause', function () {
        it('Should retrieve ALL records in "todo"  table with "orderby" of "asc"  without error, records length should be 3, first record id should be 1', function (done) {
            db.orderBy('id', 'asc')
                .fetch('todo', function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(3);
                    rows[0].id.should.equal(1);
                    done();
                });
        });
    });

    describe('#OrderBy clause', function () {
        it('Should retrieve ALL records in "todo"  table with just "orderby"  without error, records length should be 3, first record id should be 1', function (done) {
            db.orderBy('id')
                .fetch('todo', function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(3);
                    rows[0].id.should.equal(1);
                    done();
                });
        });
    });

    describe('#Select fields', function () {
        it('Should retrieve ONLY "id" and "task" from all records in "todo"  table with "select" without error, field "task_owner" should be undefined in any records', function (done) {
            db.select('id, task')
                .from('todo')
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    var a_rec = rows[0];
                    chai.expect(a_rec.task_owner).to.be.undefined;
                    done();
                });
        });
    });

    describe('#Where clause', function () {
        it('Should retrieve ONLY ONE record, from  "todo"  table, record id should equal 2', function (done) {
            db.select('id, task')
                .from('todo')
                .where('id', 2)
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(1);
                    var rec = rows[0];
                    rec.id.should.equal(2);
                    done();
                });
        });
    });

    describe('#WhereIn clause', function () {
        it('Should retrieve all records with ids 1 and 3 from  "todo"  table, record length should equal 2', function (done) {
            db.select('todo.*')
                .from('todo')
                .whereIn('id', "1,3")
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(2);

                    done();
                });
        });
    });

    describe('#OrWhereIn clause', function () {
        it('Should retrieve all records with ids 1, 2 and 3 from  "todo"  table, record length should equal 3', function (done) {
            db.select('todo.*')
                .from('todo')
                .where('id', 2)
                .orWhereIn('id', "1,3")
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(3);

                    done();
                });
        });
    });

    describe('#WhereNotIn clause', function () {
        it('Should retrieve all records with ids not amongst 1, 2 and 3 from  "todo"  table, record length should equal 0', function (done) {
            db.select('todo.*')
                .from('todo')
                .whereNotIn('id', "1,2,3")
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(0);

                    done();
                });
        });
    });

    describe('#OrWhereNotIn clause', function () {
        it('Should retrieve all records with ids 2 or ids not amongst 1 and 3 from  "todo"  table, record length should equal 1', function (done) {
            db.select('todo.*')
                .from('todo')
                .where('id', 2)
                .orWhereNotIn('id', "1,3")
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(1);

                    done();
                });
        });
    });

    describe('#Like clause', function () {
        it('Should retrieve all records with task like "Vacuum" from  "todo"  table, record length should equal 1', function (done) {
            db.select('todo.*')
                .from('todo')
                .like('task', 'vacuum', 'b')
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(1);

                    done();
                });
        });
    });

    describe('#OrLike clause', function () {
        it('Should retrieve all records with task like "Vacuum"  or with task like "iron" from  "todo"  table, record length should equal 2', function (done) {
            db.select('todo.*')
                .from('todo')
                .like('task', 'vacuum', 'b')
                .orLike('task', 'iron', 'b')
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(2);

                    done();
                });
        });
    });

    describe('#NotLike clause', function () {
        it('Should retrieve all records with task not like "Vacuum" from  "todo"  table, record length should equal 2', function (done) {
            db.select('todo.*')
                .from('todo')
                .notLike('task', 'vacuum', 'b')
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(2);

                    done();
                });
        });
    });

    describe('#OrNotLike clause', function () {
        it('Should retrieve all records with task not like "Vacuum" or task not like "Vacuum" from  "todo"  table, record length should equal 2', function (done) {
            db.select('todo.*')
                .from('todo')
                .where('id', 2)
                .orNotLike('task', 'dishes', 'b')
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(2);

                    done();
                });
        });
    });

    describe('#Join clause', function () {

        it('Should retrieve all records(with ALL fields from todo and the "name" field from task_owners tables) by using "join", record length should equal 3 and field "name" should be defined', function (done) {

            db.select('t.*, o.name')
                .from('todo t')
                .join('task_owners o', 't.task_owner = o.id', 'left')
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(3);
                    var a_rec = rows[0];
                    chai.expect(a_rec.name).to.be.defined;

                    done();
                });

        });
    });


    describe('#GroupBy clause(Aggregate)', function () {

        it('Should retrieve a single record containing the "name" from "task_owners" table and "tasks" as "todo" counts  from "todo" table for the specific task_owner"  by using "groupby", record length should equal 1 and fields "name"  and "tasks" should be defined', function (done) {

            db.select('o.name, count(*) tasks')
                .from('task_owners o')
                .join('todo t', 't.task_owner = o.id', 'left')
                .groupBy('o.name')
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(1);
                    var a_rec = rows[0];
                    chai.expect(a_rec.tasks).to.be.defined;
                    chai.expect(a_rec.name).to.be.defined;

                    done();
                });

        });
    });

    describe('#Having clause( with Aggregate)', function () {

        it('Should retrieve a single record containing the "name" from "task_owners" table and "tasks" as "todo" counts  from "todo" table with record having "task" greater than 2, record length should equal 1 and fields "name"  and "tasks" should be defined', function (done) {

            db.select('o.name, count(*) tasks')
                .from('task_owners o')
                .join('todo t', 't.task_owner = o.id', 'left')
                .groupBy('o.name')
                .having('tasks >', 2)
                .fetch(function (err, rows) {
                    if (err) {
                        throw err;
                    }
                    rows.should.have.length(1);
                    var a_rec = rows[0];
                    chai.expect(a_rec.tasks).to.be.defined;
                    chai.expect(a_rec.name).to.be.defined;

                    done();
                });

        });
    });

    describe('#OrHaving clause( with Aggregate)', function () {

        it('Should retrieve a single record containing the "name" from "task_owners" table and "tasks" as "todo" counts  from "todo" table with record having "tasks" greater than 2 or having "tasks" equals 3, record length should equal 1 and fields "name"  and "tasks" should be defined', function (done) {

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
                    rows.should.have.length(1);
                    var a_rec = rows[0];
                    chai.expect(a_rec.tasks).to.be.defined;
                    chai.expect(a_rec.name).to.be.defined;

                    done();
                });

        });
    });


    describe('#Update ', function () {
        it('Should update "todo" table. Should return 2 as number of affectedRows', function (done) {

            db.set('task', 'Updated Todo')
                .whereIn('id', '1,3')
                .update('todo', function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.affectedRows.should.equal(2);

                    done();
                });
        });
    });


    describe('#Delete ', function () {
        it('Should delete from "todo" table and return 1 as number of affectedRows', function (done) {

            db.where('id', 2)
                .delete('todo', function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.affectedRows.should.equal(1);

                    done();
                });

        });
    });


});