pragma solidity ^0.4.17;

contract PromotoFactory {

    struct Artist {
        string name;
        string artistType;
        string description;
        bool isValidArtist;
        address artistAdd;
        mapping(address => bool) subscribers;
    }

    mapping(address => Artist) private artists;
    mapping(address => uint) private balances;
    mapping(address => Artist[]) private subscribers;

    
    
    address[] private artistsList;
    uint private subscribersCount;

    function registerArtist(string _name, string _artistType, string _description) public {
        //require that artist is not a registered artist
        artists[msg.sender] = Artist(_name, _artistType, _description, true, msg.sender);
        artistsList.push(msg.sender);
    }

    function getNumberOfArtists() public view returns(uint) {
        return artistsList.length;
    }
    
    function pay(address _artistAdd) payable public {
        subscribeToArtist(_artistAdd);
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
                                //address of the artist
    function subscribeToArtist(address _artistAdd) private {
        //check if msg.sender is already a subscriber
        require(artists[_artistAdd].isValidArtist == true);
        require(!artists[_artistAdd].subscribers[msg.sender]);  
        artists[_artistAdd].subscribers[msg.sender] = true;
        subscribersCount++;
    }
    
    function getSubscribersCount() public view returns (uint) {
        return subscribersCount;
    }
}