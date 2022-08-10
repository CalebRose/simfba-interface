export const GetCollusionStatements = (user, team) => {
    const MessageOne = `A local bagman from ${team.City} was reported to be using a local Waffle House as a laundering front for recruiting points!`;
    const MessageTwo = `Breaking News! Coach ${user.username} has actually clicked the collusion button! Yes! How dare you?`;
    const MessageThree = `Coach ${user.username} reportedly asked a booster to orchestrate a business venture to give new recruits customized Ford F-150s!`;
    const MessageFour = `A high school recruit after a recruiting visit to ${team.TeamName} was reportedly seen leaving campus in a brand new Bentley.`;
    const MessageFive = `A high school recruit was reportedly offered crab legs for life from a local grocery store in ${team.City}, should they decide to commit to ${team.TeamName}`;
    const MessageSix = `Local police in ${team.City} recently cleared out a back room where big money donors from ${team.TeamName} were conspiring on how much money they were to donate to a five star recruit.`;
    const MessageSeven = `A nationally ranked recruit has now added ${team.TeamName} to their top list of teams after a brief phone call with a well-renowned booster.`;
    const MessageEight = `One of the top quarterbacks from ${team.State} was offered free buffalo wings for life to play for the ${team.TeamName} ${team.Mascot}`;
    const MessageNine = `Breaking news! Coach ${user.username} was seen loaded dice as a means of improving their odds in the Recruit Sync.`;
    const MessageTen = `After a recent breakthrough case involving ${team.TeamName} donors, the SimFBA have decided to investigate and penalize the University of Missouri's athletic program of twenty scholarships.`;
    const MessageEleven = `A local tip from an avid college football fan claims that ${team.TeamName} donors were conspiring to use DogeCoin to pay for recruits.`;
    const MessageTwelve = `A leak from a source recently let go from ${team.TeamName} states that coach ${user.username} was attempting to convince David Ross into transferring to the university.`;
    const MessageThirteen = `A nationally ranked recruit claims that the ${team.TeamName} football program was hosting an illegal practice consisting of recruits and current players.`;
    const MessageFourteen = `Coach ${user.username} has claimed on national television that competing programs in their conference were using NIL illegally and against the benefit of student athletes.`;
    const MessageFifteen = `A booster from ${team.TeamName} has sent us a bag of money asking us not to share that-- oh... oops. Sorry, I mean, that everything is fine!`;
    const MessageSixteen = `The University of Missouri has agreed to take the fall for Coach ${user.username} of ${team.TeamName} after it was discovered that the ${team.Mascot} bought Chipotle for a visiting recruit.`;
    const MessageSeventeen = `An Olive Garden in ${team.City} is under investigation after reported offering free garlic bread after a high school recruit's visit ended.`;
    const MessageEighteen = `A booster from ${team.City}, ${team.State} was seen placing bags of money in the back of their car after it was announced a five star recruit was visiting a local university.`;
    const MessageNineteen = `We've received an anonymous tip that a boosters associated with the ${team.TeamName} ${team.Mascot} were threatening coaches from putting points on a certain recruit.`;
    const MessageTwenty = `Fans of the ${team.TeamName} ${team.Mascot} were reportedly pooling together money for a "Feed Developer" button as a means of improving their schools chances in the recruit sync. (It may work.)`;
    const MessageTwentyOne = `A recent anonymous tip suggests that high school recruits were offered emotional-support monkeys if they were to verbally commit to ${team.TeamName}.`;
    const MessageTwentyTwo = `A ${team.TeamName} booster has verbally denounced conference opponents claiming they were offering recruits more money than what they had on hand.`;

    const arr = [
        MessageOne,
        MessageTwo,
        MessageThree,
        MessageFour,
        MessageFive,
        MessageSix,
        MessageSeven,
        MessageEight,
        MessageNine,
        MessageTen,
        MessageEleven,
        MessageTwelve,
        MessageThirteen,
        MessageFourteen,
        MessageFifteen,
        MessageSixteen,
        MessageSeventeen,
        MessageEighteen,
        MessageNineteen,
        MessageTwenty,
        MessageTwentyOne,
        MessageTwentyTwo
    ];

    let pick = arr[Math.floor(Math.random() * arr.length)];

    return pick;
};
