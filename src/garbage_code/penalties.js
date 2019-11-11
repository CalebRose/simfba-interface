// This is a quick mockup for Rocket on a related project
// It is written in JS but will be conscribed as pseudocode as much as possible

function ai_penalties(yards, down) {
  // Assumptions:
  // yards gained and current down is being passed as a variable
  //
  // Roll for penalty, should provide a random number between 1-6
  var mishap = Math.floor(Math.random() * 6 + 1);
  // Boolean variable set to false
  // bool penalty = false;
  let penalty = false;
  // If the dice roll is 1
  if (mishap == 1) {
    //Penalty Occurs, set penalty variable to true
    penalty = true;
  }
  if (penalty) {
    // Roll for the type of penalty
    var penaltyRoll = Math.floor(Math.random() * 20 + 1);
    var yardsLost = 0; // int
    var replayDown = false; // bool
    var lossOfDown = false; // bool
    var automaticDown = false; // bool
    var preSnapFoul = false; // bool
    var offendingTeam = ""; // String variable to determine the offending team
    var foul = ""; // String variable for the name of the foul, for logging purposes
    // How do we calculate defensive pass interference?
    // 1 through 10 are the offensive penalties
    // 2 through 20 are the defensive penalties
    if (penaltyRoll < 11) {
      // Set offending team to offense if the roll is less than 11
      offendingTeam = "Offense";
    } else {
      // Otherwise set it to defense
      offendingTeam = "Defense";
    }
    // Switch case for the penalty roll.
    // Each case is to specify what happens when the roll is a specific number
    switch (penaltyRoll) {
      case 1:
        // Set name of foul in the foul variable
        foul = "Offense: Delay of Game";
        // Yards lost is 5
        yardsLost = 5;
        // Set replayDown to true. The down should be replayed with this being true
        replayDown = true;
        // Due to it being a presnap foul, the play won't count towards the quarter
        preSnapFoul = true;
        break;
      case (2, 3):
        foul = "Offense: False Start";
        yardsLost = 5;
        replayDown = true;
        preSnapFoul = true;
        break;
      case 4:
        foul = "Offense: Illegal Formation";
        yardsLost = 5;
        replayDown = true;
        break;
      case (5, 6, 7, 8):
        foul = "Offense: Holding";
        yardsLost = 10;
        replayDown = true;
        break;
      case 9:
        foul = "Offense: Unnecessary Roughness";
        yardsLost = 15;
        lossOfDown = true;
        break;
      case 10:
        foul = "Offense: Pass Interference";
        yardsLost = 10;
        lossOfDown = true;
        break;
      case (11, 12):
        foul = "Defense: Pass Interference";
        // Roll dice again to determine if play was successful?
        // Place ball down field
        automaticDown = true;
        break;
      case 13:
        foul = "Defense: Roughing the Passer";
        // Yards lost being a negative number signifies that this is yards GAINED from the penalty
        yardsLost = -15;
        // Automatically set the down to 1st down
        automaticDown = true;
        break;
      case 14:
        foul = "Defense: Unnecessary Roughness";
        yardsLost = -15;
        automaticDown = true;
        break;
      case 15:
        foul = "Defense: Face Mask";
        yardsLost = -15;
        automaticDown = true;
        break;
      case 16:
        foul = "Defense: Illegal Use of Hands";
        yardsLost = -5;
        automaticDown = true;
        break;
      case (17, 18):
        foul = "Defense: Holding";
        yardsLost = -5;
        automaticDown = true;
        break;
      case 19:
        // This case does not signify an automatic down
        foul = "Defense: Offsides";
        yardsLost = -5;
        break;
      case 20:
        foul = "Defense: Encroachment";
        yardsLost = -5;
        preSnapFoul = true;
        break;
    }
    // If offending team was offense
    if (offendingTeam === "Offense") {
      // Do all checks to determine if the penalty should be DECLINED
      // If the yards lost is less than the yards lost from the play (a sack, fumble, tackle for loss)
      // Penalty should not be accepted, down is not replayed.
      if (yardsLost <= yards) {
        yardsLost = 0;
        replayDown = false;
        preSnapFoul = false;
      } else {
        // Else statement is when the yards lost is greater than yards gained
        // If it is 3rd or 4th down and replayDown === true, decline penalty
        // That or I suppose randomize for 50-50 chance on replaying the down or not
        if ((down === "Third" || down === "Fourth") && replayDown) {
          yardsLost = 0;
          replayDown = false;
          preSnapFoul = false;
        } else {
          // Penalty Accepted
        }
      }
    } else if (offendingTeam === "Defense") {
      // If the offending team is Defense
      // Honestly in most defensive penalties an automatic down is given
    }

    // In this case it would make sense to bundle the results into an object of some kind.
  }
}
