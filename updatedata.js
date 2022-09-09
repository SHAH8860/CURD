const {v4}=require('uuid')
const AWS=require('aws-sdk')
const bodyparser=require('body-parser')
exports.updateUser= async(event)=>{
    const dynamo=new AWS.DynamoDB.DocumentClient()
    const {completed}=JSON.parse(event.body);
    const id=event.pathParameters
    console.log(id)
    
    await dynamo.update({ 
        TableName:"UserTable",
        Key:id,
        UpdateExpression:'set completed = :completed',
        ExpressionAttributeValues: {":complete":completed},
        ReturnValue:"ALL_NEW"
    }).promise()
    return {
        statusCode:200,
        body:JSON.stringify({
            message:"Update successful"
        })
    }
    
}
