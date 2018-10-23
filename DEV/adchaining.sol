pragma solidity ^0.4.24;

// authority
contract auth {
    address public owner;

    function auth() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        if (msg.sender != owner) revert();
        _;
    }

    function kill() onlyOwner {
        selfdestruct(owner);
    }
}

contract Advertiser is auth {

    mapping(address => Advertise[]) public advertises;
    mapping(uint => User[]) public addressRegisterMember;
    
    struct Advertise {
        uint index; // pk
        string url;
        string name;
        uint length;
        uint minViews;
        uint funds;
    }
    
    struct User {
        address userAddress;
        uint views;
    }
    
    function addAdvertise(string _url, string _name, uint _length, uint _minViews, uint _funds) onlyOwner{
        if(msg.sender != owner) revert();
        
        uint _index = advertises[msg.sender].length + 1;
        
        advertises[msg.sender].push(Advertise({
            index: _index,
            url : _url,
            name : _name,
            length : _length,
            minViews : _minViews,
            funds : _funds
        }));
    }
    
    function isMember (uint advertiseIndex) returns(bool){
        uint length = addressRegisterMember[advertiseIndex].length;
        for(uint i=0; i<length; i++) {
            if(addressRegisterMember[advertiseIndex][i].userAddress == msg.sender) {
                return true;
            }
        }
        return false;
    }
    
    function checkUserIndex(address user, uint advertiseIndex) view returns(uint) {
        uint length = addressRegisterMember[advertiseIndex].length;
        for(uint i=0; i<length; i++) {
            if(addressRegisterMember[advertiseIndex][i].userAddress == user) {
                return i;
            }
        }
        revert();
    }
    
    function checkViews(uint advertiseIndex, uint views) view returns(uint){
        require(isMember(advertiseIndex));
        uint memberIndex = checkUserIndex(msg.sender, advertiseIndex);
        uint accumulateViews = addressRegisterMember[advertiseIndex][memberIndex].views;
        return views - accumulateViews;
    }
    
    function refunds(uint advertiseIndex, uint views) {
        require(isRefundable(advertiseIndex, views));
        require(isMember(advertiseIndex));
        
    }
    
    function isRefundable (uint advertiseIndex, uint views) view returns(bool){
        if(checkViews(advertiseIndex, views) > advertises[owner][advertiseIndex].minViews) {
            return true;
        } else {
            return false;
        }
    }
    
    function addBalance() payable onlyOwner {}
    
    // register user address in advertise
    function registerMember(uint advertiseIndex) public {
        addressRegisterMember[advertiseIndex].push(User({
            userAddress: msg.sender,
            views: 0
        }));
    }
    
    function checkAdvertiseBalance() public view returns(uint){
        return address(this).balance;
    }
}