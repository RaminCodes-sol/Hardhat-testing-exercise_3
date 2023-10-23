// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Message {
    address public owner;
    string public message;

    // Events
    event NewMessageSet(string _message);


    constructor (string memory _message) {
        owner = msg.sender;
        message = _message;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }


    // Set Message
    function setMessage(string memory _newMessage) public onlyOwner {
        require(bytes(_newMessage).length > 0, "Empty message not allowed");

        message = _newMessage;
        emit NewMessageSet(_newMessage);
    }

    // Get Message
    function getMessage () public view returns (string memory) {
        return message;
    }

}