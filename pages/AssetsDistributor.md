
Minting process: login w metamask then sign the request transaction. This request
transaction serves as proof this user owns this wallet. (we dont want to mint an
nft to the wrong person/ nor to spam people w unwanted assets)
Then our own node.js dApp (next.js endpoint mints it to the address).

Needs to consider a distributor smart contract + checks routines. 

Automation overviwe:
    Merkle tree roots creator: bytes32 hash that would map to a boolean value
    erc20 balance leafs = address + amount
    then users can claim

    non-fungible assets leafts = address + id. Can only mint 1 per hash (1 hash = 1 nft Id for 1 address). To mint more than one at a time, must not have same id nor same address. To guarantee multiple minting per address, we can consider block.timestamp as a unique identifier of merkle tree roots. 

    Then we can have a distributor smart contract that would be able to distribute the assets to the users. 
    This bytes32-accessed memory location would then be turned to true in case a merkle tree root is confirmed by an automated chainlink executor. 
    This root would be the hash of the merkle tree root. 
    Then we can have a claim function that would take the bytes32 hash as a parameter and check if the hash is valid. If it is, then we can mint the asset to the user.
    This claim function is private and would be called inside a public function that would be called by the claimer.
    This way a confirmation would be required before the claim effect is processed.
    To help process the claim effect, passing the merkle leaf components as arguments would save gas by avoiding too many storage reads if using a struct as a parameter. That way we utilize the off-chain computation power as a gas saver.

    The automated on-chain merkle root creator would receive a backend generated hash from an isolated container that every 30 minutes would process all pending requests at a queue and send the chainlink automated instance a call with that variable. The creator would then set the corresponding hash to true at the mapping hence allowing final users to claim their assets.
    From a business development perspective, this would be a good way to automate the distribution of assets to users, as well as to have a way to verify the authenticity of the assets. Considering the gas saved by batching the minting process, this process is highly scalable and can be used for any kind of asset distribution. Therefore it is the ideal solution for a hybrid web2/web3 distributive system.

    Then it would be hashed and sent to the chainlink oracle.



Hash emission model: 
It is ugly, but enums are kind of a nightmare in solidity. Suggestion is to use types as 0, 1, 2 (non-fungible, fungible, main currency (treated as ether for clarity purposes)).
keccak(abi.encodePacked(blob)) 
721/1155:
const blob = address + type + contract + id + block.timestamp
20:
const blob = address + type + contract + amount + block.timestamp

ether:
const blob = address + type + amount + block.timestamp 


Now imagine we added this merkle tree to a L2 solution (optimism, arbitrum, ZK sync) and we could mint the assets to the users in a batched way. This would save a lot of gas and would be a good way to distribute assets to users in a constant and scalable way (avg gas cost is 10x cheaper than mainnet). Suddenly becomes feasible to mint new assets every 10 minutes.