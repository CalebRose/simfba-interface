import { useMemo } from 'react';

export const GetRecentlyDraftedPlayer = (
    allDraftablePlayers,
    recentlyDraftedPlayerID
) => {
    const recentlyDraftedPlayer = useMemo(() => {
        if (allDraftablePlayers) {
            const idx = allDraftablePlayers.findIndex(
                (x) => x.ID === recentlyDraftedPlayerID
            );
            if (idx > -1) {
                const p = allDraftablePlayers[idx];
                return `${p.OverallGrade} ${p.FirstName} ${p.LastName}`;
            }
        }
        return 'P David Ross';
    }, [allDraftablePlayers, recentlyDraftedPlayerID]);
    return recentlyDraftedPlayer;
};

export const useDraftMap = (allDraftPicks) => {
    const draftMap = useMemo(() => {
        const draftMapObj = {};
        if (allDraftPicks) {
            for (let i = 0; i < allDraftPicks.length; i++) {
                const pick = allDraftPicks[i];
                if (pick.SelectedPlayerID > 0) {
                    draftMapObj[pick.SelectedPlayerID] = true;
                }
            }
        }
        return draftMapObj;
    }, [allDraftPicks]);

    return draftMap;
};

export const GetCurrentDraftPickIdx = (allDraftPicks, currentPick) => {
    const currentDraftPickIdx = useMemo(() => {
        if (allDraftPicks) {
            return allDraftPicks.findIndex(
                (x) => x.DraftNumber === currentPick
            );
        }
        return -1;
    }, [allDraftPicks, currentPick]);
    return currentDraftPickIdx;
};

export const GetCurrentDraftPick = (allDraftPicks, currentDraftPickIdx) => {
    const currentDraftPick = useMemo(() => {
        if (allDraftPicks && currentDraftPickIdx >= 0) {
            return allDraftPicks[currentDraftPickIdx];
        }
        return null;
    }, [allDraftPicks, currentDraftPickIdx]);
    return currentDraftPick;
};

export const GetNextDraftPickIdx = (allDraftPicks, nextPick) => {
    const nextDraftPickIdx = useMemo(() => {
        if (allDraftPicks) {
            return allDraftPicks.findIndex((x) => x.DraftNumber === nextPick);
        }
        return -1;
    }, [allDraftPicks, nextPick]);
    return nextDraftPickIdx;
};

export const GetNextDraftPickObj = (allDraftPicks, nextDraftPickIdx) => {
    const nextDraftPick = useMemo(() => {
        if (allDraftPicks && nextDraftPickIdx >= 0) {
            return allDraftPicks[nextDraftPickIdx];
        }
        return null;
    }, [allDraftPicks, nextDraftPickIdx]);
    return nextDraftPick;
};

export const GetPickTeamLogo = (draftPick, isRetro) => {
    const logo = useMemo(() => {
        if (draftPick) {
            return getLogo(draftPick.Team, isRetro);
        }
        return null;
    }, [draftPick]);

    return logo;
};

export const GetViewablePlayersList = (
    allDraftablePlayers,
    selectedPositions
) => {
    const viewablePlayers = useMemo(() => {
        let list = [];
        if (allDraftablePlayers) {
            list = [...allDraftablePlayers];
            if (selectedPositions.length > 0) {
                list = list.filter((x) =>
                    selectedPositions.includes(x.Position)
                );
            }
        }
        return list;
    }, [allDraftablePlayers, selectedPositions]);
    return viewablePlayers;
};
