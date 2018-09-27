pragma solidity ^0.4.17;
import "./SafeMath.sol";

contract PromotoFactory {
    using SafeMath for uint;
    /**
    * This is the struct where we store our Artist information.
    **/
    struct Artist {
        string name;
        string artistType;
        string description;
        string ipfsHash;
        bool isValidArtist;
        address artistAdd;
        mapping(address => Subscriber) subscribers;
        address[] subscribersAddress;
    }
    /**
    * This is the struct where we store our Subscriber information.
    **/
    struct Subscriber {
        address subscriberAdd;
        uint subscribedTime;
        bool hasSubcribed;
    }
    /**
    * We store all available artists for subscription as address => Artist
    **/
    mapping(address => Artist) private artists;
    /**
    * We store all balances of the artists as address => balance
    **/
    mapping(address => uint) private balances;
    /**
    * We store all artists that a user have subscribed as sender address => array of artists address
    **/
    mapping(address => address[]) private subscribedArtists; //list of artists that the user subscribed
    /**
    * We store here the all registered artists
    **/
    address[] private artistsList;
    /**
    * Modifier used to check if the Subscriber has a value to pass so we don't
    * execute useless logic that has a 0 value to pass.
    **/
    modifier hasValue {
        require(msg.value > 0);
        _;
    }
    /**
    * Modifier used to check if the Artist has a balance in their account before cash out 
    * so we don't execute useless logic that has a 0 balance to cash out.
    **/    
    modifier hasBalance {
        require(balances[msg.sender] > 0);
        _;
    }
    /**
    * Modifier used to determinate if the Artist is the sender of the action.
    **/
    modifier isArtist {
        require(artists[msg.sender].artistAdd == msg.sender);
        require(artists[msg.sender].isValidArtist == true);
        _;
    }
    /**
    * Modifier used to determinate if there are available artists to subscribe
    **/
    modifier hasAvailableArtists {
        require(artistsList.length > 0);
        _;
    }
    /**
    * Modifier used to determine if the user is not a registered artist
    **/
    modifier isNotAnArtist {
        require(artists[msg.sender].isValidArtist == false);
        _;
    }
    /**
    * Used to check if the user is valid to register as an artist
    * Returns bool - Returns if it is true or false 
    **/
    function validToRegister() public isNotAnArtist view returns (bool) {
        return true;
    }
    /**
    * This is a function and its used to register as an artist.
    * @param _name string - The name of the artist.
    * @param _artistType string - The type of the artist.
    * @param _description string - The description of the artist.
    **/
    function registerArtist(string _name, string _artistType, string _description, string _ipfsHash) isNotAnArtist public {
        artists[msg.sender] = Artist(_name, _artistType, _description, _ipfsHash, true, msg.sender, new address[](0));
        artistsList.push(msg.sender);
    }
    /**
    * Used to get the number of total artist     
    **/
    function getNumberOfArtists() public view returns(uint artistsCount) {
        artistsCount = artistsList.length;
        return artistsCount;
    } 
    /**
    * Used to get the details of artist
    * @param _index uint - index of the artist in the array
    * Returns string - Returns the string name
    * Returns string - Returns the type of the artistType
    * Returns string - Returns the description of the artist
    * Returns string - Returns the ipfs ipfsHash
    * Returns uint - Returns the number of subscribers
    **/
    function getArtist(uint _index) public view returns (string name, string artistType, string description, string ipfs, uint subscribersCount) {
        address artistAddress = artistsList[_index];
        Artist memory artist = artists[artistAddress];
        return (
            artist.name,
            artist.artistType,
            artist.description,
            artist.ipfsHash,
            artist.subscribersAddress.length
        );
    }
    /**
    * Used to pay for subscription of the artist
    * @param _artistAdd address - Address of the artist that the user will subscribe
    * Modifier hasValue - We determine if the subscriber is passing a value that is greater than zero
    * Returns string - Returns the string that is equal to the value that the user has pay
    **/
    function pay(address _artistAdd) payable hasValue public returns (string tier) {
        balances[_artistAdd] = balances[_artistAdd].add(msg.value); 
        subscribeToArtist(_artistAdd);
        if (msg.value == 0.1 ether) {
            tier = "tier 1";
        } else if (msg.value == 0.3 ether) {
            tier = "tier 2";
        } else if (msg.value == 0.5 ether) {
            tier = "tier 3";
        }
        return tier;
    }
    /** 
    * Used to cash out the balance of the artist
    * Modifier hasBalance - We determine if the susbcriber has balance in their accounts before they can cash out
    * Modifier isArtist - We check if the User is a valid Artist
    * Returns uint - Returns the remaining balance after cash out
    **/
    function cashOut() public hasBalance isArtist returns (uint remainingBalance) {
        uint amountToWithdraw = balances[msg.sender];
        msg.sender.transfer(amountToWithdraw);
        remainingBalance = balances[msg.sender] = 0;
        return remainingBalance;
    }
    /**
    * Used to check the balance of the artist
    * Modifier isArtist - We check if the user is a valid Artist 
    * Returns uint - Returns the balance of the artist
    **/
    function checkBalance() public isArtist view returns (uint artistBalance) {
        artistBalance = balances[msg.sender];
        return artistBalance;
    }
    /**
    * Used to subscribe to the artist 
    * @param _artistAdd address - Address of the artist that the user will subscribe
    * Modifier hasAvailableArtists - We check if there are available artists that the users can subscribe
    **/
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
    /**
    * Used to get the subscribers count of each artist
    * Modifier isArtist - We check if the user is a valid Artist
    * Returns uint - Returns the count of the subscribers
    **/
    function getSubscribersCount() view public isArtist returns (uint count) {
        count = 0;
        for (uint index = 0; index < artists[msg.sender].subscribersAddress.length; index++) {
            address subs = artists[msg.sender].subscribersAddress[index];
            if (artists[msg.sender].subscribers[subs].subscribedTime > now) {
                count++;
            }
        }
        return count;
    }
}