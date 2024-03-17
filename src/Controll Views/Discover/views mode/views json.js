const DataDiscover = require("../../../Schema/SchemaDiscover/Schema");

class JsonDiscover {
  async json(req, res) {
    try {
      // Find all Discover data
      const resultData = await DataDiscover.find({});
      
      // Convert resultData to plain objects
      const plainData = resultData.map((data) => data.toObject());

      // Send JSON response
      res.json(plainData);
    } catch (error) {
      // If an error occurs during the database operation, return a 500 Internal Server Error response
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new JsonDiscover();
