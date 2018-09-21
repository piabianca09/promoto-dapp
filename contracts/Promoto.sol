pragma solidity ^0.4.17;

contract PromotoFactory {

    struct Artist {
        string name;
        string artistType;
        string description;
        bool isValidArtist;
    }

    mapping(address => Artist) private artists;
    mapping(address => string[]) private subscribers;
    
    address[] private artistsList;

    function registerArtist(string _name, string _artistType, string _description) public {
        //require that artist is not a registered artist
        artists[msg.sender] = Artist(_name, _artistType, _description, true);
        artistsList.push(msg.sender);
    }

    function getNumberOfArtists() public view returns(uint) {
        return artistsList.length;
    }
    
    function subscribeToArtist(address _artistAdd, uint _subscriptionCategory) public view returns (string) {
        //require that artist is a valid artist
        require(artists[_artistAdd].isValidArtist == true);
        if (keccak256(_subscriptionCategory) == keccak256("tier1")) {
            return "you have subscribe to tier 1";
        }
        else {
            return "no available tier";
        }
    }
}