export const GetCollusionStatements = (user, team, recruit) => {
    let arr = [
        `A local bagman from ${team.City} was reported to be using a local Waffle House as a laundering front for recruiting points!`,
        `I'm sorry ${user.username}, but I'm afraid I can't collude for you.`,
        `Breaking News! Coach ${user.username} has actually clicked the collusion button! Yes! How dare you?`,
        `Breaking News! Coach ${user.username} alleges that they saw a different coach click the collusion button!`,
        `Rumor has it that Coach ${user.username} is allegedly creating web-crawlers to comb the news logs to see who everyone else is recruiting.`,
        `Coach ${user.username} reportedly asked a booster to orchestrate a business venture to give new recruits customized Ford F-150s!`,
        `Coach ${user.username} reportedly asked a booster to orchestrate a business venture to give new recruits customized Rolls-Royces!`,
        `A high school recruit after a recruiting visit to ${team.TeamName} was reportedly seen leaving campus in a brand new Bentley.`,
        `A high school recruit was reportedly offered crab legs for life from a local grocery store in ${team.City}, should they decide to commit to ${team.TeamName}`,
        `Local police in ${team.City} recently cleared out a back room where big money donors from ${team.TeamName} were conspiring on how much money they were to donate to a five star recruit.`,
        `A nationally ranked recruit has now added ${team.TeamName} to their top list of teams after a brief phone call with a well-renowned booster.`,
        `One of the top quarterbacks from ${team.State} was offered free buffalo wings for life to play for the ${team.TeamName} ${team.Mascot}`,
        `Breaking news! Coach ${user.username} reportedly attempted to DDOS the server as a means of preventing others from recruiting! Jokes on them, we're fool-proof.`,
        `Breaking news! Coach ${user.username} was seen using loaded dice as a means of improving their odds in the Recruit Sync.`,
        `After a recent breakthrough case involving ${team.TeamName} donors, the SimFBA have decided to investigate and penalize the University of Missouri's athletic program of twenty scholarships.`,
        `A local tip from an avid college football fan claims that ${team.TeamName} donors were conspiring to use DogeCoin to pay for recruits.`,
        `A local tip from an avid college football fan claims that the ${team.TeamName} Athletic Department is hiring software engineers to hack into the AI and convince AI teams to look elsewhere.`,
        `A leak from a source recently let go from ${team.TeamName} states that coach ${user.username} was attempting to convince David Ross into transferring to the university.`,
        `A nationally ranked recruit claims that the ${team.TeamName} football program was hosting an illegal practice consisting of recruits and current players.`,
        `Coach ${user.username} has claimed on national television that competing programs in their conference were using NIL illegally and against the benefit of student athletes.`,
        `A booster from ${team.TeamName} has sent us a bag of money asking us not to share that-- oh... oops. Sorry, I mean, that everything is fine!`,
        `The University of Missouri has agreed to take the fall for Coach ${user.username} of ${team.TeamName} after it was discovered that the ${team.Mascot} bought Chipotle for a visiting recruit.`,
        `An Olive Garden in ${team.City} is under investigation after reported offering free garlic bread after a high school recruit's visit ended.`,
        `A booster from ${team.City}, ${team.State} was seen placing bags of money in the back of their car after it was announced a five star recruit was visiting a local university.`,
        `A university in ${team.State} is now under investigation for sending illegal NIL deals to recruits by means of carrier pigeons.`,
        `A university in ${team.State} is now under investigation for sending illegal NIL deals to recruits by means of an army of trash pandas under the university president's porch.`,
        `We've received an anonymous tip that a boosters associated with the ${team.TeamName} ${team.Mascot} were threatening coaches from putting points on a certain recruit.`,
        `Fans of the ${team.TeamName} ${team.Mascot} were reportedly pooling together money for a "Feed Developer" button as a means of improving their schools chances in the recruit sync. (It may work.)`,
        `A recent anonymous tip suggests that high school recruits were offered emotional-support monkeys if they were to verbally commit to ${team.TeamName}.`,
        `A ${team.TeamName} booster has verbally denounced conference opponents claiming they were offering recruits more money than what they had on hand.`,
        `A high school athlete's family living in ${team.City}, ${team.State} reported to authorities of a sketchy-looking van with 'free scholarship 2 ${team.TeamName}' painted on the side.`,
        `This is your friendly reminder to not tweet at croots. Looking at you, ${team.TeamName} fans.`,
        `A high school athlete was berated by inebriated ${team.TeamName} fans after attending their last game on an official visit.`,
        `A high school athlete reportedly removed ${team.TeamName} from their list of schools to sign to, quoting: "Their tailgates are trash".`,
        `An ESPN Executive was reportedly persuading croots to attend his alma-mater after negotiating a controversial tv deal between ESPN and ${team.TeamName}`,
        `Police uncovered an illegal NIL-ring consisting of ${team.TeamName} alumni attempting to take money promised from recruits attending other schools.`,
        `A high school recruit reported to authorities a false NIL deal from ${team.TeamName} where recruits would be compensated in university-bucks, as opposed to USD, if they attended the university.`,
        `After playing a game against ${team.TeamName} earlier in the season, a visiting collegiate athlete told local news that a well-reknowned ${team.TeamName} booster was DM-ing him monetary offers in exchange for transferring to ${team.TeamName}.`
    ];

    let recruitArr = [];
    if (recruit !== undefined) {
        let positionArr = [];
        if (recruit.College.length > 0) {
            recruitArr = [
                `${recruit.College} signee ${recruit.FirstName} ${recruit.LastName} was reportedly found on an off-campus party after a recruiting visit this past weekend.`,
                `A rumor has floated on social media alleging that ${recruit.College} ${recruit.Stars} signee ${recruit.FirstName} ${recruit.LastName} only committed for the NIL money.`,
                `${recruit.College} ${recruit.Stars} signee ${recruit.FirstName} ${recruit.LastName} was reportedly seen volunteering at a homeless shelter near campus and helping the community. <3`,
                `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has promised ${recruit.College} fans that they will be winning a conference championship during his tenure.`,
                `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has promised ${recruit.College} fans that they will be making the playoffs during his tenure.`,
                `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has announced that they do not think Detroit is a real city.`,
                `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has announced that they would love to go to a winning team like the Washington Commanders.`,
                `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} announced his commitment via a pretty straightforward livestream instagram video.`,
                `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} announced his commitment via a twitch stream, with all of his fans spamming the team's logo and the POG emoji.`,
                `${recruit.Stars} star ${recruit.College} commit ${recruit.FirstName} ${recruit.LastName} threaded that another institution has been DMing him to reconsider his decision.`,
                `${recruit.Stars} star ${recruit.College} commit ${recruit.FirstName} ${recruit.LastName} threaded that he does not believe in recruiting rankings and that they are a human made construct.`,
                `${recruit.Stars} star ${recruit.FirstName} ${recruit.LastName} announced his commitment to ${recruit.College} via a Tiktok dance video.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded last night that he's not doing it for the NIL money, he's doing it for the chance to make history.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded last night that he wants ${user.username} to stop sliding into his DMs.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he prefers Wendy's over McDonald's.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he prefers Whataburger over Five Guys.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he prefers Five Guys over Whataburger.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he prefers McDonald's over Whataburger.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he prefers Shake Shack over In-N-Out.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he believes McDonald's McFlurries are a myth.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he believes Burger King doesn't serve real burgers.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} is rumored to be working on an NIL shoe deal with Big Baller Brand.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName}'s dad announced that he's proud of his son's commitment and that he wants to be involved in his son's collegiate development during his tenure.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} rethreaded a viral fan request that SimFBA needs a college hockey sim.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} rethreaded a viral fan request that SimFBA needs an Aussie Football sim.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} rethreaded a viral fan request that SimFBA needs an pickleball sim.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} rethreaded a viral fan request that SimFBA needs a Bison sim.`,
                `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} told news outlets last night that rival insitutions were attempting to sway him away from his commitment.`,
                `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has promised ${recruit.College} fans that they will never lose a game while he plays at ${recruit.College}.`
            ];
            if (recruit.College === 'MICH') {
                recruitArr.push(
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} announced his commitment by posting a loaf of bread with the Michigan logo branded on it, and the caption being 'Let's get this bread'.`
                );
                recruitArr.push(
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he intends to get the bread and win the Big Ten Conference.`
                );
            } else if (recruit.College === 'TENN') {
                recruitArr.push(
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he almost considered going to Bowling Green over Tennessee.`
                );
                recruitArr.push(
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he mistook the Tennessee Orange for Burnt Orange, and meant to sign with Texas.`
                );
                recruitArr.push(
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he is excited to be at Rocky Top and play for TSweezy!`
                );
                recruitArr.push(
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he would rather be partying in Nashville than to be participating in class.`
                );
                recruitArr.push(
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he's pretty sure Vanderbilt isn't a real state.`
                );
            } else if (recruit.College === 'TLNE') {
                recruitArr.push(
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he uncertain of his commitment to Tulane, due to the waves of controversy from the 2022 SimCFB Season.`
                );
                recruitArr.push(
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he would rather be partying on Bourbon Street than to be participating in class.`
                );
                recruitArr.push(
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he's pretty sure Tulane isn't a real state.`
                );
            }
            if (recruit.Position == 'QB') {
                positionArr = [
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he is better than Matt Howard at throwing the ball.`,
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks Matt Howard was only successful because of his teammates.`,
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he will have a better collegiate career than Matt Howard.`,
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he is excited about his collegiate career at ${recruit.College}.`,
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} announced his commitment to ${recruit.College} with a video of him flipping a quarter, with the quarter landing on the face with the team's logo.`,
                    `${recruit.College} ${recruit.Stars} star ${recruit.Position} commit ${recruit.FirstName} ${recruit.LastName} threaded that he wishes he was invited to Matt Howard's Quarterback Camp for Quarterbacks who can throw pretty good.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Matt Howard.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Dean Hammonds.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Steven Connolly.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Peter London.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Philip Avila.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Patrick Johnson.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Jose Padilla.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Jessie Noel.`
                ];
            } else if (recruit.Position == 'RB') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} announced his commitment to ${recruit.College} via a home-made rap video.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} announced his commitment to ${recruit.College} via a zoom call with all of his family, who are happy and excited for him.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Stanley Piper.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Dario Tamayo.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Juan Mora.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Max Smith.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Stephen Tabbert.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is James Carter.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is David Taylor.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Ryan Johnson.`
                ];
            } else if (
                recruit.Position === 'OG' ||
                recruit.Position === 'OT' ||
                recruit.Position === 'C'
            ) {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} he hops there is an IHOP close to ${recruit.College}.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite plate of pancakes is Chocolate Chip, and wants OL coaches to take note.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite plate of pancakes is Blueberry Wheat, and wants OL coaches to take note.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he prefers waffles and would rather play at a school that's close to a Waffle House.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} prefers a school where the QB will reward his linemen for excellent play in New York Prime Steaks.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is Haim Costa.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is Jason Naylor.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is Sung Liu.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is David Mcneal.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is William Chittum.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is Walter Arrasmith.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is Nelson Garcia.`
                ];
            } else if (recruit.Position === 'WR') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} hopes that he gets plenty of playing time at ${recruit.College}.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} announced his commitment to ${recruit.College} with a montage video of him catching a football with the ${recruit.College} logo across the field.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he hopes cornerbacks in the ${team.Conference} are familiar with the ground, because they're going to eat dirt once he hits the field.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Mathew Madden.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Alexander Williams III.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Hector Covarrubias, even though his last name can be difficult to spell.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Daniel Elswick.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Kevin Lund.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Scott Baldwin.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is James Blanck.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Tracey Borders.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Fernando Ownes.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Richard Maguire.`
                ];
            } else if (recruit.Position === 'TE') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} prefers running routes over blocking on the line of scrimmage`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} is confident that he's a Tight End, with the speed of a wide receiver.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he considers himself a dual-threat Tight End.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he intends to be an All American Tight End in the ${team.Conference}.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Sebastian Moore.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Carmine Rhodes.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Jose Sobrevilla.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Jin Zhong.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Kevin Black.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is George Devoe.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Michael Vega.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Jan Summers.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Charles Tice.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Jaime Perez.`
                ];
            } else if (recruit.Position === 'FB') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} prefers running the ball over blocking the quarterback.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} is confident that he's a fullback, with the speed of a runningback.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that ${recruit.College} has found their Ryan Johnson.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he intends to be an All American Fullback in the ${team.Conference}.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite FB in the NFL is Ryan Johnson.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he will be a better fullback than Ryan Johnson.`
                ];
            } else if (recruit.Position === 'DE') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} announced his commitment by breaking through at brick wall with the ${recruit.College} logo painted on it.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} announced his commitment to ${recruit.College} and uploaded a video of him sacking a quarterback wearing a helmit with the logo of ${recruit.College}'s rival.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that teams in the ${team.Conference} won't be ready for him.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Andrew Rahi.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is David Cunningham.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Jeremy Pruitt.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Ryan Ludi.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Ray Jackson.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Jeffrey Amend.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Stephen Dinardo.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is James Wood.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Gerald Javed.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Vaughn Johnson.`
                ];
            } else if (recruit.Position === 'DT') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} announced his commitment by breaking through at brick wall with the ${recruit.College} logo painted on it.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} announced his commitment to ${recruit.College} and uploaded a video of him sacking a quarterback wearing a helmit with the logo of ${recruit.College}'s rival.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that teams in the ${team.Conference} won't be ready for him.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that IHOP is a mid diner.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that IHOP was a mistake for humanity.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded 'Disregard pancakes, embrace waffles'.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Gary Wheeler.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Caleb Suarez.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Alejandro Rua.`
                ];
            } else if (recruit.Position === 'P') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks David Ross punts mid.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he will be better than David Ross.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he is better than David Ross.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks punting is an expressive form of kicking.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that no one will be able to block his punts once he starts in college.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that teams in the ${recruit.College}'s conference won't be ready for him.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite Punter in the NFL is no one, because David Ross isn't in the league yet.`
                ];
            } else if (recruit.Position === 'CB') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he wants to be in the SimNFL so he can pick off Matt Howard.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he would be better at WR.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his zone coverage is a danger zone.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that like his favorite position in football, his favorite band is Nickelback.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that switching him from WR to CB was a mistake.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that teams in the ${team.Conference} won't be ready for him.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he does not like ${team.TeamName}'s corner depth and how they develop defensive back talent.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he's happy he signed with ${team.TeamName}.`
                ];
            }
        } else if (recruit !== undefined && recruit.College.length === 0) {
            recruitArr = [
                `Breaking news! Coach ${user.username} reportedly attempted to DDOS the server as a means of preventing others from recruiting ${recruit.Stars} star ${recruit.Position} ${recruit.FirstName} ${recruit.LastName}!.`,
                `A recruiting watch dog warns against recruiting ${recruit.FirstName} ${recruit.LastName} after it was discovered he de-committed after receiving NIL money from the same institution and has re-opened his recruiting.`,
                `${recruit.FirstName} ${recruit.LastName} reported had a scholarship revoked from them due to their level of activity while playing Call of Duty.`,
                `${recruit.FirstName} ${recruit.LastName} reported had a scholarship revoked from them due to their level of activity while playing Madden 24.`,
                `${recruit.FirstName} ${recruit.LastName} reported had a scholarship revoked from them due to their level of activity while playing Fortnite.`,
                `${recruit.FirstName} ${recruit.LastName} reported had a scholarship offered to them due to their level of activity while playing Backyard Football (tm).`,
                `${recruit.FirstName} ${recruit.LastName} reported had a scholarship offered to them due to their level of activity while playing a DnD football variant called Locker Rooms and Quarterbacks.`,
                `${recruit.FirstName} ${recruit.LastName} reported had a scholarship offered to them due to their level of activity while playing NCAA 14.`,
                `A reporter from ${recruit.State} reported that ${recruit.Stars} star ${recruit.Position} ${recruit.FirstName} ${recruit.LastName} was illegally betting on hedgehog races. Their biggest bet did not win the race.`,
                `A reporter from ${recruit.State} reported that ${recruit.Stars} star ${recruit.Position} ${recruit.FirstName} ${recruit.LastName} was illegally betting on turtle races. Their biggest bet did not win the race.`,
                `A reporter from ${recruit.State} reported that ${recruit.Stars} star ${recruit.Position} ${recruit.FirstName} ${recruit.LastName} was illegal betting on squirrel obstacle courses. Their biggest bet did not win the race.`,
                `A reporter from ${recruit.State} reported that ${recruit.Stars} star ${recruit.Position} ${recruit.FirstName} ${recruit.LastName} was illegally betting on simulated sports matches. They reportedly did not get any money back.`,
                `${recruit.FirstName} ${recruit.LastName} alleges that a university in ${team.State} rescinded a scholarship after a false rumor went viral on Social Media.`,
                `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} has allegedly stated he plans on shopping around NIL deals before he makes a commitment.`,
                `A university in ${team.State} has reportedly rescinded a scholarship offer for ${recruit.FirstName} ${recruit.LastName} after it was discovered the recruit accepted an NIL deal from a rival institution.`,
                `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} has recently threaded that he is interested in playing for ${team.TeamName}.`,
                `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} has recently threaded that he thinks ${team.TeamName} is a scrub-squad.`,
                `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} has threaded that he wants ${team.TeamName} to stop sliding into their DMs and to look elsewhere.`,
                `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} announced that he is not considering ${team.TeamName} after a rival institution allegedly left them a bag on money on his parent's porch.`,
                `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks this is real life.`,
                `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he wonders if people read his tweets after all.`,
                `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks this is all just a simulation.`
            ];
            if (recruit.Position == 'QB') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he is better than Matt Howard at throwing the ball.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Matt Howard.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Dean Hammonds.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Steven Connolly.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Peter London.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Philip Avila.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Patrick Johnson.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Jose Padilla.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite QB in the NFL is Jessie Noel.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he does not like ${team.TeamName}'s QB depth and how they develop their QBs.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he sees opportunity for him to play at ${team.TeamName}.`
                ];
            } else if (recruit.Position == 'RB') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Stanley Piper.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Dario Tamayo.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Juan Mora.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Max Smith.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Stephen Tabbert.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is James Carter.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is David Taylor.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite RB in the NFL is Ryan Johnson.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he does not like ${team.TeamName}'s RB depth and how they develop their RBs.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he sees opportunity for him to play at ${team.TeamName}.`
                ];
            } else if (
                recruit.Position === 'OG' ||
                recruit.Position === 'OT' ||
                recruit.Position === 'C'
            ) {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} prefers a school close to an IHOP because he plans on making plenty of pancakes during his collegiate career.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite plate of pancakes is Chocolate Chip, and wants OL coaches to take note.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite plate of pancakes is Blueberry Wheat, and wants OL coaches to take note.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he prefers waffles and would rather play at a school that's close to a Waffle House.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} prefers a school where the QB will reward his linemen for excellent play in New York Prime Steaks.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is Haim Costa.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is Jason Naylor.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is Sung Liu.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is David Mcneal.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is William Chittum.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is Walter Arrasmith.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite lineman in the NFL is Nelson Garcia.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he does not like ${team.TeamName}'s OL depth and how they develop their linemen.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he sees opportunity for him to play at ${team.TeamName}.`
                ];
            } else if (recruit.Position === 'WR') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} prefers a school close to an airport because he intends fly high on the football field.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} prefers a school with a fountain because he plans on catching dimes thrown across the football field.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he prefers to start early, and intends to have plenty of targets his way when he plays.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he hopes cornerbacks in the ${team.Conference} are familiar with the ground, because they're going to eat dirt once he hits the field.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Mathew Madden.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Charles Grady.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Hector Covarrubias, even though his last name can be difficult to spell.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Daniel Elswick.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Kevin Lund.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Scott Baldwin.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is James Blanck.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Tracey Borders.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Fernando Ownes.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite wide receiver in the NFL is Richard Maguire.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he does not like ${team.TeamName}'s WR depth and how they develop their wide receivers.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he sees opportunity for him to play at ${team.TeamName}.`
                ];
            } else if (recruit.Position === 'TE') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} prefers running routes over blocking on the line of scrimmage`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} is confident that he's a Tight End, with the speed of a wide receiver.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he considers himself a dual-threat Tight End.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he intends to be an All American Tight End in the ${team.Conference}.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Sebastian Moore.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Carmine Rhodes.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Jose Sobrevilla.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Jin Zhong.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Kevin Black.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is George Devoe.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Michael Vega.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Jan Summers.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Charles Tice.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite TE in the NFL is Jaime Perez.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he does not like ${team.TeamName}'s TE depth and how they develop their wide receivers.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he sees opportunity for him to play at ${team.TeamName}.`
                ];
            } else if (recruit.Position === 'FB') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} prefers running the ball over blocking the quarterback.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} is confident that he's a fullback, with the speed of a runningback.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that fullbacks are people too.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he intends to be an All American Fullback in the ${team.Conference}.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite FB in the NFL is Ryan Johnson.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he will be a better fullback than Ryan Johnson.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he does not like ${team.TeamName}'s FB depth and how they develop them.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he sees opportunity for him to play at ${team.TeamName}.`
                ];
            } else if (recruit.Position === 'DE') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} prefers playing in a conference where the offensive lines are like wet paper, and thought that the ${team.Conference} would be an ideal place to play.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} is confident linemen won't be getting pancakes when they play against him.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite activity is sacking the quarterback.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that teams in the ${team.Conference} won't be ready for him.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Andrew Rahi.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is David Cunningham.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Jeremy Pruitt.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Ryan Ludi.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Ray Jackson.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Jeffrey Amend.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Stephen Dinardo.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is James Wood.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Gerald Javed.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite DE in the NFL is Vaughn Johnson.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he does not like ${team.TeamName}'s DE depth and how they develop defensive line talent.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he sees opportunity for him to play at ${team.TeamName}.`
                ];
            } else if (recruit.Position === 'P') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks David Ross punts mid.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he will be better than David Ross.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he is better than David Ross.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks punting is an expressive form of kicking.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that no one will be able to block his punts once he starts in college.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that teams in the ${team.Conference} won't be ready for him.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his favorite Punter in the NFL is no one, because David Ross isn't in the league yet.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he does not like ${team.TeamName}'s Punter depth and how they develop defensive line talent.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he sees opportunity for him to play at ${team.TeamName}.`
                ];
            } else if (recruit.Position === 'CB') {
                positionArr = [
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he wants to be in the SimNFL so he can pick off Matt Howard.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he would be better at WR.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that his zone coverage is a danger zone.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that like his favorite position in football, his favorite band is Nickelback.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that switching him from WR to CB was a mistake.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that teams in the ${team.Conference} won't be ready for him.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he does not like ${team.TeamName}'s corner depth and how they develop defensive back talent.`,
                    `${recruit.Stars} star ${recruit.Position} recruit ${recruit.FirstName} ${recruit.LastName} threaded that he sees opportunity for him to play at ${team.TeamName}.`
                ];
            }
        }

        recruitArr = recruitArr.concat([...positionArr]);
    }

    arr = arr.concat([...recruitArr]);
    const limit = arr.length - 1;
    let pick = arr[Math.floor(Math.random() * limit)];

    return pick;
};

export const GetBBallCollusionStatements = (user, team, recruit) => {
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
        `A high school basketball athlete threaded out recently to ${team.Team} fans to leave him alone and stop telling him to sign with ${team.Team}`,
        `An athlete on the ${team.Team}'s basketball roster reported that an assistant from a team they played earlier in the season reached out for a potential transfer interest.`,
        `${user.username} would like everyone to know that they listen to Nickelback while they croot.`,
        `${user.username} was seen last week attempting to recruit a TE from the ${team.Team} football team to play basketball.`,
        `A recruit has announced they are no longer considering ${team.Team} after allegedly not receiving a Rice Krispies Treat that he was promised during a visit on campus.`
    ];
    let recruitArr = [];
    if (recruit !== undefined && recruit.College.length > 0) {
        recruitArr = [
            `${recruit.College} signee ${recruit.FirstName} ${recruit.LastName} was reportedly found on an off-campus party after a recruiting visit this past weekend.`,
            `A rumor has floated on social media alleging that ${recruit.College} ${recruit.Stars} signee ${recruit.FirstName} ${recruit.LastName} only committed for the NIL money.`,
            `${recruit.College} ${recruit.Stars} signee ${recruit.FirstName} ${recruit.LastName} was reportedly seen volunteering at a homeless shelter near campus and helping the community. <3`,
            `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has promised ${recruit.College} fans that they will be winning a conference championship during his tenure.`,
            `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has promised ${recruit.College} fans that they will be winning the national championship during his tenure.`,
            `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has announced that they do not like the city of Cleveland.`,
            `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has announced that they would love to go to a winning team like Vancouver.`,
            `${recruit.Stars} star ${recruit.College} commit ${recruit.FirstName} ${recruit.LastName} threaded that another institution has been DMing him to reconsider his decision.`,
            `${recruit.Stars} star ${recruit.College} commit ${recruit.FirstName} ${recruit.LastName} threaded that he does not believe in recruiting rankings and that they are a human made construct.`,
            `${recruit.Stars} star ${recruit.FirstName} ${recruit.LastName} announced his commitment to ${recruit.College} via a Tiktok dance video.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded last night that he's not doing it for the NIL money, he's doing it for the chance to make history.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded last night that he wants ${user.username} to stop sliding into his DMs.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he prefers Wendy's over McDonald's.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he prefers Whataburger over Five Guys.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he prefers Five Guys over Whataburger.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he prefers McDonald's over Whataburger.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he prefers Shake Shack over In-N-Out.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he believes McDonald's McFlurries are a myth.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} announced on Instagram that he believes Burger King doesn't serve real burgers.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNBA All Star Jamel Bacon in a One-on-One matchup.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded his excitement over a potential relocation of the Vancouver Sea Lions to Las Vegas.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded that he'd rather see Vancouver not move their franchise to Las Vegas.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he could be SimNFL QB Matt Howard in a 1x1 match up.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he could be SimNBA PG Jesus Lloyd in a 1x1 match up.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he could be SimNBA PG Larry Jenkins in a 1x1 match up.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he could be SimNBA SG Saul Hunter in a 1x1 match up.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} is rumored to be working on an NIL shoe deal with Big Baller Brand.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName}'s dad announced that he's proud of his son's commitment and that he wants to be involved in his son's collegiate development during his tenure.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} rethreaded a viral fan request that SimFBA needs a college hockey sim.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} rethreaded a viral fan request that SimFBA needs an Aussie Football sim.`,
            `${recruit.College} ${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} told news outlets last night that rival insitutions were attempting to sway him away from his commitment.`,
            `${recruit.Stars} star commit ${recruit.FirstName} ${recruit.LastName} has promised ${recruit.College} fans that they will never lose a game while he plays at ${recruit.College}.`
        ];
    } else if (recruit !== undefined && recruit.College.length === 0) {
        recruitArr = [
            `A recruiting watch dog warns against recruiting ${recruit.FirstName} ${recruit.LastName} after it was discovered he de-committed after receiving NIL money from the same institution and has re-opened his recruiting.`,
            `${recruit.FirstName} ${recruit.LastName} reported had a scholarship revoked from them due to their level of activity while playing Call of Duty.`,
            `A reporter from ${
                recruit.State.length === 0 ? recruit.Country : recruit.State
            } reported that ${recruit.Stars} ${recruit.Position} ${
                recruit.FirstName
            } ${
                recruit.LastName
            } was found betting on hedgehog races. Their biggest bet did not win the race.`,
            `${recruit.FirstName} ${recruit.LastName} alleges that a university in ${team.State} rescinded a scholarship after a false rumor went viral on Social Media.`,
            `${recruit.Stars} Star Recruit ${recruit.FirstName} ${recruit.LastName} has allegedly stated he plans on shopping around NIL deals before he makes a commitment.`,
            `A university in ${team.State} has reportedly rescinded a scholarship offer for ${recruit.FirstName} ${recruit.LastName} after it was discovered the recruit accepted an NIL deal from a rival institution.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} has recently threaded that he is interested in playing for ${team.Team}.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} has threaded that he wants ${team.Team} to stop sliding into their DMs and to look elsewhere.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} announced that he is not considering ${team.Team} after a rival institution allegedly left them a bag on money on his parent's porch.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNBA player Philip Taylor in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNBA player Jamel Bacon in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNFL player Matt Howard in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can out-punt SimCFB punter David Ross in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNBA player Dennis Thomas in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNBA player Elmer Barton in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNBA player Russell Garcia in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNBA player Stephen Williams in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNBA player Jose Foster in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNBA player Moises Farr in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks he can beat SimNBA player Benjamin Morris in a 1x1 matchup.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks the SimNBA refs want the Vancouver Sea Lions to win the Finals next season.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that he thinks this is all just a simulation.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that his SimNBA role model is SG Charles Bailey.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that his SimNBA role model is SG Kent Alvarado.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that his SimNBA role model is PG Blake Watts and that his play-style is based on his.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that his SimNBA role model is PG Mitchell Weber and that his play-style is based on his.`,
            `${recruit.Stars} star recruit ${recruit.FirstName} ${recruit.LastName} threaded that his SimNBA role model is SF Peter Thompson and that his play-style is based on his.`
        ];
    }
    arr = arr.concat([...recruitArr]);
    let pick = arr[Math.floor(Math.random() * arr.length)];

    return pick;
};
