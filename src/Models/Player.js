class Player {
  constructor(data) {
    //
    this.oid = data.oid || null;
    this.First_Name = data.First_Name || '';
    this.Last_Name = data.Last_Name || '';
    this.Team = data.Team || '';
    this.Stars = data.Stars || null;
    this.Position = data.Position || '';
    this.Archetype = data.Archetype || '';
    this.Overall = data.Overall || null;
    this.Height = data.Height || '';
    this.Weight = data.Weight || '';
    this.School = data.School || '';
    this.Hometown = data.Hometown || '';
    this.State = data.State || '';
    this.Carrying = data.Carrying || null;
    this.Agility = data.Agility || null;
    this.Catching = data.Catching || null;
    this.Zone_Coverage = data.Zone_Coverage || null;
    this.Man_Coverage = data.Man_Coverage || null;
    this.Football_IQ = data.Football_IQ || null;
    this.Kick_Accuracy = data.Kick_Accuracy || null;
    this.Kick_Power = data.Kick_Power || null;
    this.Pass_Block = data.Pass_Block || null;
    this.Pass_Rush = data.Pass_Rush || null;
    this.Punt_Accuracy = data.Punt_Accuracy || null;
    this.Punt_Power = data.Punt_Power || null;
    this.Route_Running = data.Route_Running || null;
    this.Run_Block = data.Run_Block || null;
    this.Run_Defense = data.Run_Defense || null;
    this.Speed = data.Speed || null;
    this.Strength = data.Strength || null;
    this.Tackle = data.Tackle || null;
    this.Throw_Power = data.Throw_Power || null;
    this.Throw_Accuracy = data.Throw_Accuracy || null;
    this.Injury = data.Injury || null;
    this.Stamina = data.Stamina || null;
    this.Discipline = data.Discipline || null;
    this.Academic = data.Academic || '';
    this.Free_Agency = data.Free_Agency || '';
    this.Personality = data.Personality || '';
    this.Recruiting = data.Recruiting || '';
    this.Work_Ethic = data.Work_Ethic || '';
    this.Progression = data.Progression || null;
    this.Potential = data.Potential || '';
    this.Year = data.Year || null;
    this.JerseyNum = data.JerseyNum || null;
    this.priorityAttributes = [];
  }
}

export default Player;
