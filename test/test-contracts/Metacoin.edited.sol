pragma solidity ^0.4.24;


/// @title MetaCoin v.2
contract MetaCoin {

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
    function sendCoin(address receiver) public returns(bool sufficient) {
        if (balances[msg.sender] < amount) return false;
        address myAddress = this;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Transfer(myAddress,receiver,amount);
        return true;
    }

    /// @notice
    /// @dev
    /// @param addr Custom comment on parameter
    /// @return
    function getBalance(address addr, uint number) public returns(uint) {
        return balances[addr];
    }

    /// @notice
    /// @dev
    /// @param code Token code
    /// @param timestamp Token access timestamp
    /// @return
    function getToken(uint code) public returns(uint) {
        return balances[addr];
    }
}



