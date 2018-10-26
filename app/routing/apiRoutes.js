var friends = require("../data/friends")

module.exports = function(app) {
  // returning a json of all the friends
  app.get("/api/friends", function(req,res) {
    res.json(friends);
  });

  // handling the post request
  app.post("/api/friends", function(req,res) {
    // capturing the data from the front-end request
    const newPerson = req.body;
    // pushing the newPerson into the friends array
    friends.push(newPerson)
    // saving the scores to an array variable
    const scores = req.body.scores;
    // creating a variable to hold all the differences between people's scores
    var allFriendsDifferences = [];

    // comparing the scores to the scores of friends
    for (var i = 0; i < friends.length; i++) {
      console.log(i);
      // scores of one friend
      var scoreToCompare = friends[i].scores
      // make an array to hold the differences between the scores in the same places in the arrays
      var totalDifferenceArray = [];

      // go through an array of the length of scores
      for (var j = 0; j < scores.length; j++) {
        // take the difference between the current user and the friend's score
        var difference = scores[j] - scoreToCompare[j];
        // make a case for when the difference is negative
        if (difference < 0) {
          difference = -1 * difference;
        }
        // put the score difference into the totalDifferenceArray
        totalDifferenceArray.push(difference)
      }

      // add all the values in the totalDifference array
      for (var i = 0; i < totalDifferenceArray.length; i++) {
        var totalDifference = totalDifference + totalDifferenceArray[i];
      }

      // add the difference to an array
      allFriendsDifferences.push(totalDifference);
    }

    // compare all the cumulative differences between the people's scores to figure out which one is the smallest
    // capture the first value in the allFriendsDifferences array
    var lowestNumber = allFriendsDifferences[0];
    // saving the place of the number to be able to return what friend has the lowest difference
    var lowestNumberIndex = 0;
    // start the for-loop from the second number in the allFriendsDifferences array
    for (var i = 1; i < allFriendsDifferences.length; i++) {
      // compare all the cumulative differences between the people's scores to figure out which one is the smallest
      if (lowestNumber > allFriendsDifferences[i]) {
        lowestNumber = allFriendsDifferences[i];
        lowestNumberIndex = i;
        // console.log(lowestNumber);
      } // else if lowestNumber < allFriendsDifferences[i], do nothing.
    }

    // SEND BACK friends[lowestNumberIndex]. HOW DO I DO THIS?

    // send back the res.json of the newPerson
    res.json(newPerson)
  });

}