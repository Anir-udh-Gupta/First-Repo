//06956e738cd61bde1e86fa58055beb02-us17
//c45e113136

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const { request } = require("http");
const { response } = require("express");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req, res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req, res){
    const firstName = req.body.First_Name;
    const lastName = req.body.Last_Name;
    const email = req.body.Email;
    client.setConfig({
        apiKey: "06956e738cd61bde1e86fa58055beb02-us17",
        server: "us17",
      });
      

      const run = async () => {
        const response = await client.lists.setListMember("c45e113136",email, {
          email_address: email,
          status_if_new: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        });
        console.log(response);
      };
      run()
      if(response.statusCode ===200){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
    });

app.listen(3000,function(){
    console.log("server is running on port 3000");
})
