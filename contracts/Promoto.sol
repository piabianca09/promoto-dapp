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
    
    function registerArtist(string _name, string _artistType, string _description) public {
        require(artists[msg.sender].isValidArtist == false);
        artists[msg.sender] = Artist(_name, _artistType, _description, true, msg.sender, 0);
        artistsList.push(msg.sender);
    }

    function getNumberOfArtists() public view returns(uint) {
        return artistsList.length;
    }
    

    function pay(address _artistAdd) payable hasValue public {
        require(!artists[_artistAdd].subscribers[msg.sender]);
        subscribeToArtist(_artistAdd);
        balances[_artistAdd] += msg.value;
    }

    function cashOut() public hasBalance returns (uint) {
        uint amountToWithdraw = balances[msg.sender];
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
        //add user to list of artist subscribers
        artists[_artistAdd].subscribers[msg.sender] = true ;
        artists[_artistAdd].subscribersCount++;
        //add artist to the list of subscribedArtists of the user
        subscribedArtists[msg.sender].push(_artistAdd);
    }
    
    function getSubscribersCount() public view returns (uint) {
        return artists[msg.sender].subscribersCount;
    }
}