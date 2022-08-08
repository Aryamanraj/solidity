const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    'vote art pony convince labor valid cargo share battle sauce device common',
    'https://rinkeby.infura.io/v3/2f75f948d2cb4e6a8ddefb00f3055004'
);
const web3 = new Web3(provider);


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop()    
};
deploy();
