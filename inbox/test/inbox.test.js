const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


// class Car {
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }



// let car;
// beforeEach(()=>{
//     car = new Car();
// });

// describe('Car class', () => {
//     it('can park', ()=>{
//         //const car = new Car();
//         assert.equal(car.park(), 'stopped');
//     });
//     it('can drive', ()=> {
//         //const car = new Car();
//         assert.equal(car.drive(),'vroom');
//     });
// });



// beforeEach(()=> {
//     //get list of accounts
//     web3.eth.getAccounts().then(fethchedAccounts=>{
//         console.log(fethchedAccounts);
//     });
// });

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    //using accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
        arguments: ['Hi there!']
      })
        .send({ from: accounts[0], gas: '1000000' });
});


describe('Inbox', ()=>{
    it('deploys a contract',()=>{
        assert.ok(inbox.options.address);
    });

    it('Has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMsg('bye!').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye!')
    })
});