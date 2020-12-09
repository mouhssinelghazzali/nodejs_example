let connection =  require("../config/db")
let moment =  require("../config/moment")


class Message {

    constructor (row)
    {
        this.row = row
    }

    static create (content,callback) {
        connection.query("INSERT INTO messages SET content = ?, created_at = ? ",[content,new Date()], (err,result) => {
            if (err) throw err
            callback(result)
        })
    }

    get id() {
        return this.row.id
    }

    get content() {
        return this.row.content
    }

    get created_at()
    {
        return moment(this.row.created_at)
    }
    static all(callback) {
        connection.query("SELECT * FROM messages",(err,row) => {
            if(err) throw err
            callback(row.map((row) => new Message(row)))
           // console.log(result)
        })
    }
    static find(id,callback) {
        connection.query("SELECT * FROM messages WHERE id = ?  LIMIT 1 ",[id],(err,row) => {
            if(err) throw err
            callback(new Message(row[0]))
           // console.log(result)
        })
    }
}

module.exports = Message