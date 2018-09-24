pragma solidity ^0.4.17;

contract PromotoFactory {

    struct Artist {
        string name;
        string artistType;
        string description;
        bool isValidArtist;
        address artistAdd;
        mapping(address => bool) subscribers;
        uint subscribersCount;
    }

    mapping(address => Artist) private artists;
    mapping(address => uint) private balances;
    mapping(address => address[]) private subscribedArtists; //list of artists that the user subscribed

    
    address[] private artistsList;

    modifier hasValue {
        require(msg.value > 0);
        _;
    }
    
    modifier hasBalance {
        require(balances[msg.sender] > 0);
        _;
    }
    
    modifier isOwner {
        require(artists[msg.sender].artistAdd == msg.sender);
        _;
    }
    
    modifier notAnArtist {
        require(artists[msg.sender].isValidArtist == false);
        _;
    }
    
    function registerArtist(string _name, string _artistType, string _description) notAnArtist public {
        artists[msg.sender] = Artist(_name, _artistType, _description, true, msg.sender, 0);
        artistsList.push(msg.sender);
    }

    function getNumberOfArtists() public view returns(uint) {
        return artistsList.length;
    } 
    

    function pay(address _artistAdd) payable hasValue public returns (string) {
        balances[_artistAdd] += msg.value; 
        subscribeToArtist(_artistAdd);
        if (msg.value == 0.1 ether) {
            return "tier 1";
        } else if (msg.value == 0.3 ether) {
            return "tier 2";
        } else if (msg.value == 0.5 ether) {
            return "tier 3";
        } 
    }

    function cashOut() public hasBalance isOwner returns (uint) {
        uint amountToWithdraw = balances[msg.sender];
        msg.sender.transfer(amountToWithdraw);
        balances[msg.sender] = 0;
        return (balances[msg.sender]);
    }
    
    function checkBalance() public isOwner view returns (uint) {
        return balances[msg.sender];
    }

    function subscribeToArtist(address _artistAdd) private {
        require(artists[_artistAdd].isValidArtist == true);
        require(!artists[_artistAdd].subscribers[msg.sender]);  
        require(artists[_artistAdd].artistAdd != msg.sender);
        artists[_artistAdd].subscribers[msg.sender] = true;
        artists[_artistAdd].subscribersCount++;
        subscribedArtists[msg.sender].push(_artistAdd);
    }
    
    function getSubscribersCount() public view returns (uint) {
        return artists[msg.sender].subscribersCount;
    }
}