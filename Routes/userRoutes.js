const express = require('express');
const { verifytoken } = require('../src/AuthMiddleware/auth');
const router = express.Router();
const axios=require('axios')
const postmarkApiToken=process.env.POSTMARK_API_TOKEN
const postmarkAccountToken=process.env.ACCOUNT_API_TOKEN
const TemplatedID="36341745"
router.post('/send-email',verifytoken,async (req,res)=>{
    
    const data = {
        From: req.user.email,
        To: req.body.recipient,
        Subject: req.body.subject,
        TextBody: req.body.message,
    };
    try{
    const response =await axios.post('https://api.postmarkapp.com/email',data,{
       headers: {
                'Content-Type': 'application/json',
                'X-Postmark-Server-Token': postmarkApiToken,
            },
    })
    console.log(response.data)
    }
    catch(error){
        console.log(error)
    }

})

router.get('/sent-emails',verifytoken,async (req,res)=>{
    try {
        const response = await axios.get('https://api.postmarkapp.com/messages/outbound?count=50&offset=0', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': postmarkApiToken
          }
        });
        
        res.status(200).json(response.data.Messages);
      } catch (error) {
        console.error('Error fetching sent emails:', error);
        res.status(500).json({ error: 'Failed to fetch sent emails' });
      }
    
})

router.get('/received-emails',verifytoken,async (req,res)=>{
    try {
        const response = await axios.get(`https://api.postmarkapp.com/messages/inbound?count=50&offset=0`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': postmarkApiToken
          }
        });
        console.log('receiving emails')
        console.log(response.data)
    
        res.status(200).json(response.data.InboundMessages);
      } catch (error) {
        console.error('Error fetching sent emails:', error);
        res.status(500).json({ error: 'Failed to fetch sent emails' });
      }
    
})


module.exports=router;