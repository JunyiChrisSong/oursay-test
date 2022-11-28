// Import Client
const { MongoClient } = require("mongodb");

// Add cluster URI
const uri = "mongodb+srv://oursay-team-2105:team-oursay@oursay-voting-applicati.pur0fdy.mongodb.net/?retryWrites=true&w=majority";

// Create new client
const client = new MongoClient(uri);

// Connect to the mongodb cluster
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const database = client.db('event-data');
        const teams = database.collection('teams');
        await teams.insertOne({
            team_name: "Team 1",
            team_members: ["John", "Jane", "Joe"],
            team_votes: 0
        });
        const teams_query = {team_name: "Team 1"};
        const teams_result = await teams.findOne(teams_query);
        console.log(teams_result);        
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

export default run;
