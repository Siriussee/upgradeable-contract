pragma solidity 0.8.20;

contract SecureEtherVault{
    mapping (address => uint256) private userBalances;

    function deposit() external payable {
        userBalances[msg.sender] += msg.value;
    }
    
    function withdraw() external {
        uint256 balance = getUserBalance(msg.sender);
        userBalances[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Failed to send Ether");
    }

    function getEtherBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getUserBalance(address _user) public view returns (uint256) {
        return userBalances[_user];
    }
}