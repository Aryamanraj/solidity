pragma solidity ^0.4.17;
contract Inbox{
    string public message;

    function Inbox(string iniMsg) public {
        message = iniMsg;
    }
    function setMsg(string newMsg) public {
        message = newMsg;
    }

    // function getMsg() public view returns (string){
    //     return message;
    // }
}