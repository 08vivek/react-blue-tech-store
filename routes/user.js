const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users/signup' , async (req,res) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({user,token});
    } catch(e){
        res.status(400).send(e);
    }
})

router.post('/users/login' ,async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token});
    }catch(e){
        res.status(400).send({});
    }
})

router.post('/users/logout', auth , async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !==req.token;
        })
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
})

router.post('/users/logoutAll', auth, async (req,res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send(e);
    }
})

// router.get('/users/me', auth, async (req,res) => {
//     res.send(req.user);
// })

router.patch('/users/me', auth , async (req,res) => { 
    try{
            if(req.body._id){
            delete req.body._id;
        }
        for( let b in req.body ){
            req.user[b] = req.body[b];
        }
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(400).send();
    }
})

router.delete('/users/me' , auth , async (req,res) => {
    try{
        await req.user.remove();
        res.send(req.user);
    }catch(e){
        res.status(500).send();
    }
})

// router.get('/users', async (req,res) => {
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }catch(e){
//         res.status(500).send(e);
//     }
// })


module.exports = router;