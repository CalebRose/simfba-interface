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
    const MessageTwentyThree = `A high school athlete's family living in ${team.City}, ${team.State} reported to authorities of a sketchy-looking van with 'free scholarship 2 ${team.TeamName}' painted on the side.`;
    const MessageTwentyFour = `This is your friendly reminder to not tweet at croots. Looking at you, ${team.TeamName} fans.`;
    const MessageTwentyFive = `A high school athlete was berated by inebriated ${team.TeamName} fans after attending their last game on an official visit.`;
    const MessageTwentySix = `An ESPN Executive was reportedly persuading croots to attend his alma-mater after negotiating a controversial tv deal between ESPN and ${team.TeamName}`;
    const MessageTwentySeven = `Police uncovered an illegal NIL-ring consisting of ${team.TeamName} alumni attempting to take money promised from recruits attending other schools.`;
    const MessageTwentyEight = `A high school recruit reported to authorities a false NIL deal from ${team.TeamName} where recruits would be compensated in university-bucks, as opposed to USD, if they attended the university.`;
    const MessageTwentyNine = `After playing a game against ${team.TeamName} earlier in the season, a visiting collegiate athlete told local news that a well-reknowned ${team.TeamName} booster was DM-ing him monetary offers in exchange for transferring to ${team.TeamName}.`;

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
        MessageTwentyTwo,
        MessageTwentyThree,
        MessageTwentyFour,
        MessageTwentyFive,
        MessageTwentySix,
        MessageTwentySeven,
        MessageTwentyEight,
        MessageTwentyNine
    ];

    let pick = arr[Math.floor(Math.random() * arr.length)];

    return pick;
};

export const GetBBallCollusionStatements = (user, team, recruit) => {
    console.log({ recruit });
    let arr = [
        `A high school basketball star was seen carrying a bag of money after an assistant's visit from ${team.Team}`,
        `An investigation is currently underway after a group of assistants allegedly from the ${team.Team} athletic program tried to persuade a recruit to attend ${team.Team} by offering a free Fortnite battlepass.`,
        `A high school basketball athlete alleges that Basketball Coach ${user.username} was found sleeping on his family's living room floor. Coach ${user.username} has refused to make any comments on the allegations.`,
        `A high school basketball athlete was recently refused service at a Chik-Fil-A after visiting ${team.Team}, with staff saying they would refuse to serve unless he verbally committed.`,
        `A local alumni from ${team.City} was caught drunkenly tweeting at an athlete to sign with ${team.Team}.`,
        `Breaking news! A construction company allegedly funded by a group of alumni from ${team.Team} were attempting to build a giant wall across the Rocky Mountains, with the plan to prevent coaches from crossing either side to croot across the country.`,
        `Breaking news! A high school student managed to throw a crumpled up piece of paper into a trash bin and was immediately offered an athletic scholarship to play basketball at ${team.Team}!`,
        `The NCAA has announced a new investigation involving ${user.username} and other supposed coaches after an attempt was made to find the code to the Collusion button.`,
        `An assistant coach from ${team.Team} was found in the back room of a Golden Corral with a bag of money, supposedly waiting for a croot that never showed up.`,
        `A lobbyist funded by ${team.Team} had attempted to suspend renewal of visas as a means to prevent other teams from recruiting talent internationally.`,
        `${user.username} was allegedly seen trying to venmo a Toucan for money in exchange for croot points. Unfortunately they venmoed the wrong Toucan.`,
        `Can ${user.username} NOT click the Collusion button next time?`,
        `A high school athlete dropped screenshots on Twitter of what appears to be a DM conversation with an alumni from ${team.Team} harrassing him to commit to ${team.Team}`,
        `Local T-shirt fans for ${team.Team} were found protesting on twitter after a high school athlete verbally committed to their rival.`,
        `${user.username} allegedly asked the Admins not to be mentioned when clicking the Collusion button. That's not how this works, ${user.username}`,
        `Students attending ${team.Team} were caught trying to tamper with the basketball hoops before a big game the next day.`,
        `A high school basketball athlete tweeted out recently to ${team.Team} fans to leave him alone and stop telling him to sign with ${team.Team}`,
        `An athlete on the ${team.Team}'s basketball roster reported that an assistant from a team they played earlier in the season reached out for a potential transfer interest.`,
        `${user.username} would like everyone to know that they listen to Nickelback while they croot.`,
        `${user.username} was seen last week attempting to recruit a TE from the ${team.Team} football team to play basketball.`
    ];
    let recruitArr = [];
    if (recruit !== undefined && recruit.College.length > 0) {
        recruitArr = [
            `${recruit.College} signee ${recruit.FirstName} ${recruit.LastName} was reportedly found on an off-campus party after a recruiting visit this past weekend.`,
            `A rumor has floated on social media alleging taht ${recruit.College} ${recruit.Stars} signee ${recruit.FirstName} ${recruit.LastName} only committed for the NIL money.`,
            `${recruit.College} ${recruit.Stars} signee ${recruit.FirstName} ${recruit.LastName} was reportedly seen volunteering at a homeless shelter near campus and helping the community. <3`,
            `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has promised ${recruit.College} fans that they will be winning a conference championship during his tenure.`,
            `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has promised ${recruit.College} fans that they will be winning the national championship during his tenure.`,
            `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has promised ${recruit.College} fans that they will never lose a game while he plays at ${recruit.College}.`
        ];
    } else if (recruit !== undefined) {
        recruitArr = [
            `A recruiting watch dog warns against recruiting ${recruit.FirstName} ${recruit.LastName} after it was discovered he de-committed after receiving NIL money from the same institution and has re-opened his recruiting.`,
            `${recruit.FirstName} ${recruit.LastName} reported had a scholarship revoked from them due to their level of activity while playing Call of Duty.`,
            `A reporter from ${
                recruit.State.length === 0 ? recruit.Country : recruit.State
            } reported that ${recruit.FirstName} ${
                recruit.LastName
            } was found betting on hedgehog races. Their biggest bet did not win the race.`,
            `${recruit.FirstName} ${recruit.LastName} alleges that a university in ${team.State} rescinded a scholarship after a false rumor went viral on Social Media.`,
            `${recruit.Stars} Star Recruit ${recruit.FirstName} ${recruit.LastName} has allegedly stated he plans on shopping around NIL deals before he makes a commitment.`,
            `A university in ${team.State} has reportedly rescinded a scholarship offer for ${recruit.FirstName} ${recruit.LastName} after it was discovered the recruit accepted an NIL deal from a rival institution.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} has recently tweeted that he is interested in playing for ${team.Team}.`
        ];
    }
    arr = arr.concat([...recruitArr]);
    let pick = arr[Math.floor(Math.random() * arr.length)];

    return pick;
};
