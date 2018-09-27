pragma solidity ^0.4.24;
import "./SafeMath.sol";

contract SafeMathContract {
    using SafeMath for uint;

    function getProduct(uint _a, uint _b) public pure returns (uint) {
        return _a.mul(_b);
    }

    function getSum(uint _a, uint _b) public pure returns (uint) {
        return _a.add(_b);
    }

    function getDifference(uint _a, uint _b) public pure returns (uint) {
        return _a.sub(_b);
    }

    function getQuotient(uint _a, uint _b) public pure returns (uint) {
        return _a.div(_b);
    }

    function getModulo(uint _a, uint _b) public pure returns (uint) {
        return _a.mod(_b);
    }
}