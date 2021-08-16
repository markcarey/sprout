# Sprout
https://sprout.gdn

Sprout is a decentralized content management system that can be thought of as a combinations of Medium and Twitter. Users own and control their own Plants and Sprouts in their own Garden.

# Gardens

A Garden is analogous to a blog, publication, or Twitter account. But each Garden has its own ERC721 smart contract owned by the gardener (creator).

# Plants and Sprouts

PLants are content elements or posts. PLants include a Sprout, which is like a Tweet. Each Plant is an ERC721 NFT that is minted from the Garden smart contract. The NFT metadata is where the content is stored in JSON format, adhering to the ERC721 Metadata JSON Schema. Plant content JSON is stored on Filecoin/IPFS via the nft.storage service.

# Watering and Feeding Gardens

An optional features of each garden include "Follow" and "Like" features. Unlike web2 systems, using these features literally water and feed the Garden by sending a small micropayment tip to the Gardener -- performing each on a Garden or Plant triggers a web3 transaction, sending a small amount of MATIC (or perhaps this becomes a token in future). It is likely that likes and follows will be less frequent than their "free" counterparts on Medium and Twitter, but they will be more meaningful. *Yield Gardening* brings DeFi to content creation via this create-to-earn system.

# World Wide Gardens

While Gardens can exists and grow by themselves -- like a stand-alone blog -- they can also be joined together via Garden Aggreg-culture. Since all Plants are stored as JSON on IPFS/Filecoin, they can be aggregatd to create API endpoints that represent lists of Plants from Gardens that you follow, plants from a single garden, or based on other criteria. Leveraging such API endpoints, many frontends can present Plants in various ways -- examples include a Twitter-like frontend and a Medium-like frontend (both included in the proof-of-concept demo). For the HackFS hackathon, this is done via a centralized API using serverless Firebase Functions and a Firestor database. Though outside of the scope for the hackathin, the vision is a decentralized network of aggregators that pull together sprouts and publish the results to Filecoin. Such aggregators would need to be incentivised, of course, so perhaps a portion of all likes/follows revenue goes to these aggregators.

# Technology

- Ethereum (Polygon)
- Solidity for smart contract factory and garden contracts
- JS for default front-end and default admin front-end
- nft.storage (IPFS/Filecoin) for storage
- Covalent API
- Sprout.gdn Dapp is hosted on IPFS (pinned on Pinata and dlink-ed to Cloudflare)

# TODO / Roadmap / Questions

- Markdown editor for Plants
- How to set prices for Garden planting, following, and liking?
- ERC20 token instead of MATIC for rewards?
- A DAO to govern development and the Factory/Social contract
- Should the contracts be upgradeable?
- Decentralized aggregation: can The Graph be used here given infinite Gardens?
- Editing feature ( new item on IPFS and update NFT metadata URI )
- Deleting feature ( contract support burning already, but UI does not )
- Multiple Gardens per account ( supported by the Factory contract already, but not UI )
- *Draft* Plants ( maybe store them encrypted on IPFS? )
- categories / tags / hashtags?



