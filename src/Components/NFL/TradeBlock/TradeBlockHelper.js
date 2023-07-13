export const GetOptionList = (players, picks, options) => {
    const map = {};
    for (let i = 0; i < options.length; i++) {
        const key = options[i].OptionType + options[i].ID;
        map[key] = true;
    }
    const list = [];
    for (let i = 0; i < players.length; i++) {
        const item = players[i];
        if (map['Player' + item.ID]) continue;
        list.push({ ...item, OptionType: 'Player' });
    }
    for (let i = 0; i < picks.length; i++) {
        const item = picks[i];
        if (map['Draft Pick' + item.ID]) continue;
        list.push({ ...item, OptionType: 'Draft Pick' });
    }

    return list;
};

export const LoadTradeOptions = (options, teamID, forModal) => {
    const list = [];
    for (let i = 0; i < options.length; i++) {
        const item = options[i];
        let obj = {};
        if (item.OptionType === 'Player') {
            obj = {
                NFLTeamID: teamID,
                OptionType: item.OptionType,
                NFLPlayerID: item.ID,
                NFLDraftPickID: 0,
                SalaryPercentage: Number(item.SalaryPercentage) || 0
            };
            if (forModal) obj.Player = item;
        } else {
            obj = {
                NFLTeamID: teamID,
                OptionType: item.OptionType,
                NFLPlayerID: 0,
                NFLDraftPickID: item.ID
            };
            if (forModal) obj.Draftpick = item;
        }
        list.push(obj);
    }
    return list;
};

export const LoadNBATradeOptions = (options, teamID, forModal) => {
    const list = [];
    for (let i = 0; i < options.length; i++) {
        const item = options[i];
        let obj = {};
        if (item.OptionType === 'Player') {
            obj = {
                NFLTeamID: teamID,
                OptionType: item.OptionType,
                NFLPlayerID: item.ID,
                NFLDraftPickID: 0,
                CashTransfer: Number(item.CashTransfer) || 0
            };
            if (forModal) obj.Player = item;
        } else {
            obj = {
                NFLTeamID: teamID,
                OptionType: item.OptionType,
                NFLPlayerID: 0,
                NFLDraftPickID: item.ID,
                CashTransfer: Number(item.CashTransfer) || 0
            };
            if (forModal) obj.Draftpick = item;
        }
        list.push(obj);
    }
    return list;
};
