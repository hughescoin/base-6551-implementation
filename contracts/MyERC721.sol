// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract FocusFoxes is ERC721 {
    using Counters for Counters.Counter; //explain this
    Counters.Counter private _tokenIds;

    constructor() ERC721("FocusedFoxes","BFF") {}


    function createSupply(address friend)public returns(uint256){
        uint256 newTokenId = _tokenIds.current();
        _safeMint(friend, newTokenId);
        _tokenIds.increment();
        
        return newTokenId;
    }
}