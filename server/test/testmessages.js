const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API messages", () => {
    mocha.it("messages", (done) => {
        const request = chai.request.agent(app.default);
        

        const login ={"login":"assirem200@live.fr","password":"1234"}
        const msg = {"text":"hello","file":""}

        request
            //login
            .post('/api/user/login')
            .send(login)

            .then((res) => {
                res.should.have.status(200);
                console.log(`Retrieving message ${res.body}`)

                return Promise.all([
                    
                    request
                        //post message 
                        .post(`/api/messages`)
                        .send(msg)
                        .then((res) => {
                            res.should.have.status(201)
                            //chai.assert.deepEqual(res.body.userid, userid)
                        }),

                ])
            }).then(() => done(), (err) => done(err))
            .finally(() => {
                request.close()
            })
            //like message
        request
            .put("api/messages/like/WsSiLcRwYzauha8F")
            .then((res) =>{
                res.should.have.status(200)
            })
            //delete message
        request
            .delete("api/messages/delete/3uJ2h29GosimWKIG")
            .then((res) =>{
                res.should.have.status(200)
            })
    })
})

