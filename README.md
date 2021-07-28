# Sprout

Sprout is a decentralized content management system that can be though of as a combinations of Medium and Twitter. User own and control their own Sprouts in their own Garden.

# Gardens

A Garden is analogous to a blog, publication, or Twitter account. But each Garden has its own smart contract.

# Sprouts

Sprouts are content elements, like Tweets or Blog posts. Each Sprout is an ERC721 NFT that is minted from the Garden smart contract. The NFT metadata is where the content is stored is JSON format, adhering to the ERC721 Metadata JSON Schema, with additional elements added. Sprout content JSON will be stored on Filecoin/IPFS (most likely using web3.storage).

# Watering and Feeding Gardens

An optional feature of each garden would be a "Follow" and "Like" features. Would be nice to follow the garden/plant analogies here, but not sure about Watering and Feeding as action words. (ideas appreciated!). Unlike web2 systems, using these features would literally water and feed the Garden by sending a small tip to the Garden owner -- performing each on a Garden or Sprout that you like would trigger a web3 transaction, sending either a small amount of ETH or perhaps a token. It us likely that likes and follows will be less frequent than their "free" counterparts on Medium and Twitter, but they will be more meaningful.

# World Wide Gardens

While Gardens can exists and grow by themselves, they can also be joined together via Garden Aggreg-culture. Since all Sprouts are stored as JSON on IPFS/Filecoin, it will be possible to aggregate these sprouts to create API endpoints that represent lists of Sprout from Gardens that you follow, sprouts from a single garden, or based on other criteria. Leveraging such API endpoints, many frontends can present Sprouts in various ways -- examples include a Twitter-like frontend and a Medium-like frontend. How the aggregation happens is TBD, but could involved a decentralized network of aggregators that pull together sprouts and publish the results to Filecoin. Such aggrators would need to be incentivised, of course, so perhaps a portion of all likes/follows revenue goes to these aggregators.

# Technology
- Ethereum (likely Polygon)
- Solidity for smart contract factory and garden contracts
- JS for default front-end and default admin front-end
- web3.storage (IPFS/Filecoin) for storage
- OrbitDB?
- The Graph? ( maybe can be used for aggregated API, not sure )


