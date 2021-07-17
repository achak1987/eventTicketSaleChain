// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;


contract Ticketting {
    // Owner of the event
    address owner;
    // Name of the event
    string eventName;
    // Total number of places available in event
    uint totalSlots;
    // Totoal number of places already sold for the event
    uint usedSlots;
    // A map of users and the number of tickets they purchased
    mapping (address => uint) purchasedTickets;

    event Purchase(address indexed by, uint slots);

    // This is the constructor whose code is run only when the contract is created.
    constructor(string memory _eventName, uint  _totalSlots) public {
        owner = msg.sender;
        eventName = _eventName;
        totalSlots = _totalSlots;
        usedSlots = 0;
    }    

    // Checks if there are tickets for the event available
    function isAvailable() public view returns (bool) {
        return totalSlots > usedSlots;
    }

    // Returns the number of purchased tickets for the user sending the transaction
    function retrieveTicket() public view returns (uint) {
        return purchasedTickets[msg.sender];
    }

    // Buys a ticket, if available for the user calling the function. A user can call n number of tickets.
    function buyTicket() public {
        if (isAvailable()) {
            purchasedTickets[msg.sender] += 1;
            usedSlots += 1;
            emit Purchase(msg.sender, purchasedTickets[msg.sender]);
        }
    }
}