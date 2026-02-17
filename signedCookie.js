// signedCookie.js file code 

import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser('secret123'));

app.get("/", (req, res) => {
   const username = req.signedCookies.username;

   if(!username){
    return res.send(`Home page : No cookie found !`)
   }
  res.send(`Home page : Cookie Found : ${username}`);
});

app.get("/set-cookie", (req, res) => {
    res.cookie('username', 'vivek kumar', {
        maxAge: 900000,
        httpOnly: true,
       signed: true
    })

    res.send('cookie has been sent.')
});


app.get("/get-cookie", (req, res) => {

  const username = req.signedCookies.username;
     if(!username) {
      return res.send("No cookies found!")
     }
     res.send(`cookie found : ${username}`)
});

app.get("/delete-cookie", (req, res) => {
  res.clearCookie('username');
  res.send('cookies has been deleted.')
});

app.listen(3000, () => {
  console.log("server started.");
});
