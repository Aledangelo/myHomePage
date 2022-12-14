const MongoClient = require("mongodb").MongoClient;
const jwt = require('jsonwebtoken');
const uri = "mongodb://uy9kb4hsg3wx0czdnwz3:QJMj0BOxJjK85uC1rJDp@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/b0y0gxwulbrgt0g?replicaSet=rs0";

MongoClient.connect(uri, { useUnifiedTopology: true }).then(
    (client) => {
      console.log("[MONGODB] Connected to Database");
  
      db = client.db("b0y0gxwulbrgt0g");
      collection = db.collection("Keys");
      visit = db.collection("Visits");
      // scheduleCollection = db.collection("schedule");
      clientMongo = client;
    });

module.exports = {
    vrfyToken: function(token, callback) {
        var query = {Token_HRK: token.magic};
        collection.find(query).toArray((err, res) => {
            if (err) throw err;
            if (res.length == 0) {
                callback(null, null, 404);
            } else {
                const token = jwt.sign({_id: res[0]._id}, 'asdfghjk', {expiresIn: "10min"});
                callback(token, res[0], 200);
            }
        });
    },

    get_data: function(callback) {
        visit.find().toArray((err, res) => {
            if (err) {
                console.error(err);
                callback(null, 400);
            } else {
                var cv_p = res[0].Print_CV;
                var cv_d = res[0].Download_CV;
                var ie = res[0].Download_IE;
                var ssd = res[0].Download_SSD;
                var csd = res[0].Download_CSD;

                var body_str = "cv_p=" + cv_p + "&cv_d=" + cv_d + "&ie=" + ie + "&ssd=" + ssd + "&csd=" + csd;
                callback(body_str, res[0], 200);
            }
        });
    },

    increment: function(argument) {
        visit.find().toArray((err, res) => {
            if (err) {
                console.error(err);
            }

            switch (argument) {
                case "print":
                    var query = {"Print_CV": res[0].Print_CV};
                    visit.updateOne(query, {
                        $set: {
                            "Print_CV": res[0].Print_CV + 1
                        }
                    }, (err, res) => {
                        if (err) {
                            console.error(err);
                        } 
                    });
                    break;
                case "download":
                    var query = {"Download_CV": res[0].Download_CV};
                    visit.updateOne(query, {
                        $set: {
                            "Download_CV": res[0].Download_CV + 1
                        }
                    }, (err, res) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                    break;
                case "ie":
                    var query = {"Download_IE": res[0].Download_IE};
                    visit.updateOne(query, {
                        $set: {
                            "Download_IE": res[0].Download_IE + 1
                        }
                    }, (err, res) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                    break;
                case "ssd":
                    var query = {"Download_SSD": res[0].Download_SSD};
                    visit.updateOne(query, {
                        $set: {
                            "Download_SSD": res[0].Download_SSD + 1
                        }
                    }, (err, res) => {
                        if (err) {
                            console.error(err);
                        } 
                    });
                    break;
                case "csd":
                    var query = {"Download_CSD": res[0].Download_CSD};
                    visit.updateOne(query, {
                        $set: {
                            "Download_CSD": res[0].Download_CSD + 1
                        }
                    }, (err, res) => {
                        if (err) {
                            console.error(err);
                        } 
                    });
                    break;
                default:
                    console.err("invalid argument");
                    break;
            }            
        });
    }
}
