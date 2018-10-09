pragma solidity ^0.4.24;


contract MetaCoin {
    mapping (address => uint) balances;

    event Transfer(address _from,address _to, uint _amount);

    constructor() {
        balances[tx.origin] = 10000;
    }

    function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        address myAddress = this;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Transfer(myAddress,receiver,amount);
        return true;
    }

    function getBalance(address addr) public returns(uint) {
        return balances[addr];
    }
}



