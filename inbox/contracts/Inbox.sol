pragma solidity ^0.4.25;
contract Inbox{
    string public message;

    function inbox(string iniMsg) public {
        message = iniMsg;
    }
    function setMsg(string newMsg) public {
        message = newMsg;
    }

    // function getMsg() public view returns (string){
    //     return message;
    // }
}