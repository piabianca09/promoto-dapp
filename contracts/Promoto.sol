pragma solidity ^0.4.17;

contract PromotoFactory {

    struct Artist {
        string name;
        string artistType;
        string description;
        bool isValidArtist;
        address artistAdd;
    }

    mapping(address => Artist) private artists;
    mapping(address => string[]) private subscribers;
    mapping(address => uint) private balances;
    
    address[] private artistsList;

    function registerArtist(string _name, string _artistType, string _description) public {
        //require that artist is not a registered artist
        artists[msg.sender] = Artist(_name, _artistType, _description, true, msg.sender);
        artistsList.push(msg.sender);
    }

    function getNumberOfArtists() public view returns(uint) {
        return artistsList.length;
    }
    
    function pay(address _artistAdd) payable public {
        balances[_artistAdd] += msg.value;
    }

    function cashOut() public returns (uint) {
        require(balances[msg.sender] > 0);
        uint amountToWithdraw = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amountToWithdraw);
        return (balances[msg.sender]);
    }
    
    function checkBalance() public view returns (uint) {
        require(artists[msg.sender].artistAdd == msg.sender);
        return balances[msg.sender];
    }
}