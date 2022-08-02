pragma solidity ^0.4.24;


/**
* Different type of comments
* MetaCoin contract is used to....
*/
contract MetaCoin {

    /// @notice
    mapping (address => uint) balances;

    // @notice
    // This is multiline comment
    mapping (address => uint) tokens;

    event Transfer(address _from,address _to, uint _amount);

    /// @notice
    /// @dev
    /// @return
    constructor() {
        balances[tx.origin] = 10000;
    }

    /// @param receiver
    /// Another multiline comment, this one is about param receiver
    function addToken(address receiver) public {
        tokens[receiver] = tokens[receiver] + 1;
    }

    /// @notice
    /// @dev
    /// @param receiver
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
    /// @param number
    /// @return
    function getBalance(address addr, uint number) public returns(uint) {
        return balances[addr];
    }

    /// @notice
    /// @dev
    /// @param code Token code
    /// @return
    function getToken(uint code) public returns(uint) {
        return balances[addr];
    }
}



