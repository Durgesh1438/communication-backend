const express = require('express');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const jwt=require('jsonwebtoken')
const app = express();
const userRoutes=require('./Routes/userRoutes')
const port = 5000;
const axios=require('axios')
require('dotenv').config()
app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);
const CLIENT_ID = process.env.GOOGLE_CLIENTID
const client = new OAuth2Client(CLIENT_ID);
const TemplatedID="36341745"

app.post('/api/google-login', async (req, res,) => {
  const {tokenId}=req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload)
    const token=jwt.sign({userId:payload.sub,email:payload.email,username:payload.name},process.env.MY_SECRET_KEY,{expiresIn:'2h'})
  
    const response = await axios.post('https://api.postmarkapp.com/email/withTemplate', {
      From: 'kovvuri61.ugec20@iiitranchi.ac.in', // Replace with your sender email
      To: payload.email,
      TemplateId: TemplatedID,
      TemplateModel: {
        name: payload.name,
        email: payload.email
      }
    }, {
      headers: {
        'Accept': 'application/json',
        'X-Postmark-Server-Token': process.env.POSTMARK_API_TOKEN
      }
    });
    console.log(response.data)
    res.status(200).json({
        token,
        username:payload.name,
        Email:payload.email
    });
    
  } catch (error) {
    console.error('Token verification failed', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.post('/api/send-email',async(req,res)=>{
  
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});