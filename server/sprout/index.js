var functions = require('firebase-functions');
var firebase = require('firebase-admin');
var db = firebase.firestore();

function cors(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    //res.status(204).send('');
  } else {
    // Set CORS headers for the main request
    res.set('Access-Control-Allow-Origin', '*');
  }
  return res;
}

module.exports = {

  "api": async function(req, res) {
    res = cors(req, res);
    if (req.method === 'OPTIONS') {
      return res.status(204).send('');
    } else if (req.method == 'POST') {
      // new NFT being added
      var contract = req.body.address;
      var tokenId = req.body.tokenId;
      var id = contract + ':' + tokenId;
      const resp = await db.collection('plants').doc(id).set(req.body);
      return res.json({ "status": "ok"});
    } else {
      // get/query NFTs
      if (req.query.plant) {
        const plantRef = db.collection('plants').doc(req.query.plant);
        const doc = await plantRef.get();
        if (!doc.exists) {
          console.log('No such document!');
          return res.json({"error": "not found"});
        } else {
          console.log('Document data:', doc.data());
          return res.json({"status": "ok", "plant": doc.data()});
        }
      } else if (req.query.following) {
        const gardens = req.query.following.split(':');
        const plantsRef = db.collection('plants');
        const snapshot = await plantsRef.where('address', 'in', gardens).orderBy('date', 'desc').get();
        var docs = [];
        snapshot.forEach(doc => {
          docs.push( doc.data() );
        });
        return res.json({"status": "ok", "items": docs});
      } else {
        const plantsRef = db.collection('plants');
        const snapshot = await plantsRef.orderBy('date', 'desc').get();
        var docs = [];
        snapshot.forEach(doc => {
          docs.push( doc.data() );
        });
        return res.json({"status": "ok", "items": docs});
      }
    }
  } //api 

}; // module.exports