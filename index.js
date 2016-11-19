var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    if (event.teamID == null) {
        callback(new Error('No Team ID'));
    }
    if (event.players == null) {
        callback(new Error('No Players'));
    }
    var params = {
        TableName : "Team",
        Key : { 
          "TeamID" : event.teamID,
        },
        UpdateExpression: "set players = :a",
        ExpressionAttributeValues:{
            ":a" : event.players
        }
    };
    docClient.update(params, function(err, data) {
        if (err) {
            callback(new Error('DynamoDB Error'));
        }
        else {
            callback(null, 'Success');
        }
    });
};