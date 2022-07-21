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
        .deploy({ data: bytecode, arguements: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' });

})


describe('Inbox', ()=>{
    it('deploys a contract',()=>{
        console.log(inbox);
    });
});