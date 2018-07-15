pragma solidity ^0.4.24;


/// @title MetaCoin
/// @notice
/// @dev
contract MetaCoin {
/// @notice
    mapping (address => uint) balances;

    event Transfer(address _from,address _to, uint _amount);

/// @notice
/// @dev
/// @return
    constructor() {
        balances[tx.origin] = 10000;
    }

/// @notice
/// @dev
/// @param receiver
/// @param amount
/// @return
    function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        address myAddress = this;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Transfer(myAddress,receiver,amount);
        return true;
    }

/// @notice
/// @dev
/// @param addr
/// @return
    function getBalance(address addr) public returns(uint) {
        return balances[addr];
    }
}



