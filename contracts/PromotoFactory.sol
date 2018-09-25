pragma solidity ^0.4.17;

contract PromotoFactory {

    struct Artist {
        string name;
        string artistType;
        string description;
        bool isValidArtist;
        address artistAdd;
        mapping(address => Subscriber) subscribers;
        address[] subscribersAddress;
    }

    struct Subscriber {
        address subscriberAdd;
        uint subscribedTime;
        bool hasSubcribed;
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
    
    modifier isArtist {
        require(artists[msg.sender].isValidArtist == true);
        _;
    }
    
    modifier hasAvailableArtists {
        require(artistsList.length > 0);
        _;
    }

    function registerArtist(string _name, string _artistType, string _description) public {
        require(artists[msg.sender].isValidArtist == false);
        artists[msg.sender] = Artist(_name, _artistType, _description, true, msg.sender, new address[](0));
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

    function subscribeToArtist(address _artistAdd) hasAvailableArtists public {
        require(artists[_artistAdd].isValidArtist == true);
        require(now > artists[_artistAdd].subscribers[msg.sender].subscribedTime + 6 days);  
        require(artists[_artistAdd].artistAdd != msg.sender);
        if(!artists[_artistAdd].subscribers[msg.sender].hasSubcribed) {
            artists[_artistAdd].subscribers[msg.sender] = Subscriber(msg.sender, now + 6 days, true);
            subscribedArtists[msg.sender].push(_artistAdd);
            artists[_artistAdd].subscribersAddress.push(msg.sender);
        }
        artists[_artistAdd].subscribers[msg.sender].subscribedTime = now + 6 days;
    }
    
    function getSubscribersCount() view public isArtist isOwner returns (uint) {
        uint count = 0;
        for (uint index = 0; index < artists[msg.sender].subscribersAddress.length; index++) {
            address subs = artists[msg.sender].subscribersAddress[index];
            if (artists[msg.sender].subscribers[subs].subscribedTime > now) {
                count++;
            }
        }
        return count;
    }
    
    function getSubcriberTime(address _subsAdd) public view isArtist returns (uint) {
        return (artists[msg.sender].subscribers[_subsAdd].subscribedTime);
    }
}