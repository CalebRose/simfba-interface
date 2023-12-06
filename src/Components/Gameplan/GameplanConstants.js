export const FormationMap = {
    'Power Run': {
        Formations: [
            {
                name: 'I Formation',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            },
            {
                name: 'Singleback',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Double Tight',
                positions: ['RB1', 'TE1', 'TE2', 'WR1', 'WR2']
            },
            {
                name: 'I Formation Heavy',
                positions: ['RB1', 'FB1', 'TE1', 'TE2', 'WR1']
            },
            {
                name: 'Split Back Gun',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            }
        ],
        SchemeFits: [
            'Power RB',
            'Blocking FB',
            'Blocking TE',
            'Red Zone Threat WR',
            'Run Blocking OL'
        ],
        BadFits: [
            'Speed RB',
            'Receiving RB',
            'Receiving FB',
            'Receiving TE',
            'Vertical Threat TE',
            'Pass Blocking OL'
        ],
        Ranges: {
            TraditionalRun: { Min: 40, Max: 80 },
            OptionRun: { Min: 0, Max: 5 },
            RPO: { Min: 0, Max: 10 },
            Pass: { Min: 20, Max: 60 }
        },
        Notes: 'This scheme centers around using the run to set up the pass. Most run-heavy pro scheme, but still a good amount of passing will be available.'
    },
    Vertical: {
        Formations: [
            {
                name: 'I Formation',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            },
            {
                name: 'Singleback',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Double Tight',
                positions: ['RB1', 'TE1', 'TE2', 'WR1', 'WR2']
            },
            {
                name: 'Singleback Gun',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Spread Gun',
                positions: ['RB1', 'WR1', 'WR2', 'WR3', 'WR4']
            }
        ],
        SchemeFits: [
            'Pocket QB',
            'Receiving RB',
            'Receiving TE',
            'Vertical Threat TE',
            'Speed WR',
            'Route Runner WR',
            'Pass Blocking OL'
        ],
        BadFits: [
            'Balanced QB',
            'Scrambler QB',
            'Field General QB',
            'Power RB',
            'Blocking FB',
            'Rushing FB',
            'Blocking TE',
            'Red Zone Threat WR',
            'Run Blocking OL'
        ],
        Ranges: {
            TraditionalRun: { Min: 40, Max: 80 },
            OptionRun: { Min: 0, Max: 5 },
            RPO: { Min: 0, Max: 10 },
            Pass: { Min: 20, Max: 60 }
        },
        Notes: 'This scheme centers on the long pass, but still allows for quite a bit of running.'
    },
    'West Coast': {
        Formations: [
            {
                name: 'Near/Far',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            },
            {
                name: 'Singleback',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },

            {
                name: 'Spread',
                positions: ['RB1', 'WR1', 'WR2', 'WR3', 'WR4']
            },
            {
                name: 'Singleback Gun',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Split Back Gun',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            }
        ],
        SchemeFits: [
            'Field General QB',
            'Balanced FB',
            'Receiving FB',
            'Receiving TE',
            'Possession WR',
            'Route Runner WR',
            'Line Captain C'
        ],
        BadFits: ['Blocking FB', 'Red Zone Threat WR'],
        Ranges: {
            TraditionalRun: { Min: 20, Max: 60 },
            OptionRun: { Min: 0, Max: 0 },
            RPO: { Min: 0, Max: 10 },
            Pass: { Min: 40, Max: 80 }
        },
        Notes: 'This scheme centers on the short pass, but still allows for a bit of running.'
    },
    'I Option': {
        Formations: [
            {
                name: 'I Formation',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            },
            {
                name: 'Singleback',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Double Tight',
                positions: ['RB1', 'TE1', 'TE2', 'WR1', 'WR2']
            },
            {
                name: 'Singleback Gun',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Split Back Gun',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            }
        ],
        SchemeFits: [
            'Scrambler QB',
            'Power RB',
            'Rushing FB',
            'Blocking TE',
            'Possession WR'
        ],
        BadFits: [
            'Pocket QB',
            'Speed RB',
            'Receiving RB',
            'Receiving FB',
            'Receiving TE',
            'Vertical TE'
        ],
        Ranges: {
            TraditionalRun: { Min: 20, Max: 80 },
            OptionRun: { Min: 20, Max: 80 },
            RPO: { Min: 0, Max: 10 },
            Pass: { Min: 20, Max: 60 }
        },
        Notes: 'This scheme offers up the ability to run a lot more option-type plays, but still is mainly balanced in run vs. pass.'
    },
    'Run and Shoot': {
        Formations: [
            {
                name: 'Spread',
                positions: ['RB1', 'WR1', 'WR2', 'WR3', 'WR4']
            },
            {
                name: 'Singleback',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Spread Gun',
                positions: ['RB1', 'WR1', 'WR2', 'WR3', 'WR4']
            },
            {
                name: 'Singleback Gun',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Empty Gun',
                positions: ['WR1', 'WR2', 'WR3', 'WR4', 'WR5']
            }
        ],
        SchemeFits: [
            'Field General QB',
            'Speed RB',
            'Receiving RB',
            'Speed WR',
            'Line Captain C'
        ],
        BadFits: [
            'Balanced RB',
            'Power RB',
            'Blocking FB',
            'Rushing FB',
            'Blocking TE',
            'Possession WR'
        ],
        Ranges: {
            TraditionalRun: { Min: 20, Max: 60 },
            OptionRun: { Min: 0, Max: 5 },
            RPO: { Min: 5, Max: 10 },
            Pass: { Min: 40, Max: 80 }
        },
        Notes: 'This scheme focuses on short passes and passes far more often than it runs.'
    },
    'Air Raid': {
        Formations: [
            {
                name: 'Spread Gun',
                positions: ['RB1', 'WR1', 'WR2', 'WR3', 'WR4']
            },
            {
                name: 'Singleback Gun',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Empty Gun',
                positions: ['WR1', 'WR2', 'WR3', 'WR4', 'WR5']
            },
            {
                name: 'Big Spread Gun',
                positions: ['RB1', 'TE1', 'TE2', 'WR1', 'WR2']
            },
            {
                name: 'Pony Spread Gun',
                positions: ['RB1', 'RB2', 'WR1', 'WR2', 'WR3']
            }
        ],
        SchemeFits: [
            'Pocket QB',
            'Receiving RB',
            'Receiving FB',
            'Receiving TE',
            'Vertical Threat TE',
            'Speed WR',
            'Pass Blocking OL'
        ],
        BadFits: [
            'Balanced QB',
            'Scrambler QB',
            'Field General QB',
            'Power RB',
            'Blocking FB',
            'Rushing FB',
            'Blocking TE',
            'Run Blocking OL'
        ],
        Ranges: {
            TraditionalRun: { Min: 5, Max: 40 },
            OptionRun: { Min: 0, Max: 0 },
            RPO: { Min: 5, Max: 20 },
            Pass: { Min: 40, Max: 80 }
        },
        Notes: 'This scheme focuses on long passes and passes far more often than it runs.'
    },
    Pistol: {
        Formations: [
            {
                name: 'Pistol',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Power Pistol',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            },
            {
                name: 'Heavy Power Pistol',
                positions: ['RB1', 'FB1', 'TE1', 'TE2', 'WR1']
            },
            {
                name: 'Big Pistol',
                positions: ['RB1', 'TE1', 'TE2', 'WR1', 'WR2']
            },
            {
                name: 'Spread Pistol',
                positions: ['RB1', 'WR1', 'WR2', 'WR3', 'WR4']
            }
        ],
        SchemeFits: [
            'Balanced QB',
            'Pocket QB',
            'Balanced RB',
            'Rushing FB',
            'Vertical TE',
            'Route Runner WR',
            'Possession WR'
        ],
        BadFits: ['Balanced FB', 'Line Captain C'],
        Ranges: {
            TraditionalRun: { Min: 20, Max: 60 },
            OptionRun: { Min: 0, Max: 40 },
            RPO: { Min: 0, Max: 40 },
            Pass: { Min: 20, Max: 60 }
        },
        Notes: 'This scheme is the most balanced of the spread offenses and has limited access to option-type plays.'
    },
    'Spread Option': {
        Formations: [
            {
                name: 'Spread Gun',
                positions: ['RB1', 'WR1', 'WR2', 'WR3', 'WR4']
            },
            {
                name: 'Singleback Gun',
                positions: ['RB1', 'TE1', 'WR1', 'WR2', 'WR3']
            },
            {
                name: 'Split Back Gun',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            },
            {
                name: 'Big Spread Gun',
                positions: ['RB1', 'TE1', 'TE2', 'WR1', 'WR2']
            },
            {
                name: 'Pony Spread Gun',
                positions: ['RB1', 'RB2', 'WR1', 'WR2', 'WR3']
            }
        ],
        SchemeFits: [
            'Scrambler QB',
            'Speed RB',
            'Receiving FB',
            'Route Runner WR',
            'Possession WR'
        ],
        BadFits: ['Balanced RB', 'Balanced FB'],
        Ranges: {
            TraditionalRun: { Min: 20, Max: 60 },
            OptionRun: { Min: 10, Max: 60 },
            RPO: { Min: 0, Max: 60 },
            Pass: { Min: 20, Max: 60 }
        },
        Notes: 'This scheme offers up the ability to run a lot more option-type plays, but focuses on pass plays still.'
    },
    'Wing-T': {
        Formations: [
            {
                name: 'Wing-T',
                positions: ['RB1', 'RB2', 'FB1', 'TE1', 'WR1']
            },
            {
                name: 'T-Split',
                positions: ['RB1', 'FB11', 'TE1', 'WR1', 'WR2']
            },
            {
                name: 'Wing-T Double Tight',
                positions: ['RB1', 'RB2', 'FB1', 'TE1', 'TE2']
            },
            {
                name: 'Split Back Gun',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            },
            {
                name: 'Wing Split Back Gun',
                positions: ['RB1', 'RB2', 'FB1', 'TE1', 'WR1']
            }
        ],
        SchemeFits: ['Balanced QB', 'Balanced RB', 'Balanced FB', 'Speed WR'],
        BadFits: ['None'],
        Ranges: {
            TraditionalRun: { Min: 40, Max: 80 },
            OptionRun: { Min: 0, Max: 60 },
            RPO: { Min: 0, Max: 10 },
            Pass: { Min: 20, Max: 40 }
        },
        Notes: 'This scheme has the most balanced approach (run vs. pass) of the smashmouth scheme group.'
    },
    'Double Wing': {
        Formations: [
            {
                name: 'Double Wing',
                positions: ['RB1', 'RB2', 'FB1', 'TE1', 'TE2']
            },
            {
                name: 'Double Wing Strong',
                positions: ['RB1', 'RB2', 'FB1', 'TE1', 'WR1']
            },
            {
                name: 'Double Wing Wide',
                positions: ['RB1', 'RB2', 'FB1', 'WR1', 'WR2']
            },
            {
                name: 'Double Wing Spread',
                positions: ['FB1', 'WR1', 'WR2', 'WR3', 'WR4']
            },
            {
                name: 'Double Wing Split',
                positions: ['RB1', 'FB1', 'TE1', 'TE2', 'WR1']
            }
        ],
        SchemeFits: [
            'Power RB',
            'Blocking FB',
            'Rushing FB',
            'Blocking TE',
            'Red Zone Threat WR',
            'Run Blocking OL'
        ],
        BadFits: [
            'Pocket QB',
            'Speed RB',
            'Receiving RB',
            'Receiving FB',
            'Receiving TE',
            'Vertical TE',
            'Pass Blocking OL'
        ],
        Ranges: {
            TraditionalRun: { Min: 40, Max: 90 },
            OptionRun: { Min: 10, Max: 40 },
            RPO: { Min: 0, Max: 10 },
            Pass: { Min: 0, Max: 20 }
        },
        Notes: 'This scheme has barely any access to pass plays.'
    },
    Wishbone: {
        Formations: [
            {
                name: 'Wishbone',
                positions: ['RB1', 'RB2', 'FB1', 'TE1', 'TE2']
            },
            {
                name: 'Wishbone Strong',
                positions: ['RB1', 'RB2', 'FB1', 'TE1', 'WR1']
            },
            {
                name: 'Wishbone Wide',
                positions: ['RB1', 'RB2', 'FB1', 'WR1', 'WR2']
            },
            {
                name: 'I Formation Heavy',
                positions: ['RB1', 'FB1', 'TE1', 'TE2', 'WR1']
            },
            {
                name: 'I Formation',
                positions: ['RB1', 'FB1', 'TE1', 'WR1', 'WR2']
            }
        ],
        SchemeFits: [
            'Balanced QB',
            'Field General QB',
            'Balanced RB',
            'Red Zone Threat WR'
        ],
        BadFits: ['Balanced FB', 'Route Runner WR', 'Line Captain C'],
        Ranges: {
            TraditionalRun: { Min: 40, Max: 80 },
            OptionRun: { Min: 20, Max: 60 },
            RPO: { Min: 0, Max: 0 },
            Pass: { Min: 20, Max: 40 }
        },
        Notes: 'This scheme is also fairly balanced (run vs. pass) like the Wing-T, but it does not have access to any shotgun formations.'
    },
    Flexbone: {
        Formations: [
            {
                name: 'Flexbone',
                positions: ['RB1', 'RB2', 'FB1', 'TE1', 'TE2']
            },
            {
                name: 'Flexbone Strong',
                positions: ['RB1', 'RB2', 'FB1', 'TE1', 'WR1']
            },
            {
                name: 'Flexbone Wide',
                positions: ['RB1', 'RB2', 'FB1', 'WR1', 'WR2']
            },
            {
                name: 'Flexbone Gun',
                positions: ['RB1', 'RB2', 'FB1', 'TE1', 'TE2']
            },
            {
                name: 'Flexbone Gun Wide',
                positions: ['RB1', 'RB2', 'FB1', 'WR1', 'WR2']
            }
        ],
        SchemeFits: [
            'Scrambler QB',
            'Speed RB',
            'Balanced FB',
            'Red Zone Threat WR'
        ],
        BadFits: ['Balanced RB', 'Speed WR', 'Possession WR'],
        Ranges: {
            TraditionalRun: { Min: 20, Max: 80 },
            OptionRun: { Min: 20, Max: 80 },
            RPO: { Min: 0, Max: 5 },
            Pass: { Min: 10, Max: 40 }
        },
        Notes: 'This scheme offers up the ability to run a lot more option-type plays, but is almost entirely run-focused.'
    },
    'Front 7 Man': {
        Formations: [
            {
                name: '4-4 Base',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'LOLB1',
                    'MLB1',
                    'MLB2',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1'
                ]
            },
            {
                name: '4-4 Over',
                positions: [
                    'LOLB1',
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'MLB1',
                    'MLB2',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1'
                ]
            },
            {
                name: '4-4 Under',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    'ROLB1',
                    '\n',
                    'LOLB1',
                    'MLB1',
                    'MLB2',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1'
                ]
            },
            {
                name: '4-3 Light',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'LOLB1',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '4-2-5 Nickel',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1',
                    'SS1'
                ]
            }
        ],
        SchemeFits: [
            'Run Stopper DT',
            'Run Stopper OLB',
            'Field General ILB',
            'Run Stopper ILB',
            'Man Coverage DB'
        ],
        BadFits: [
            'Nose Tackle DT',
            'Coverage OLB',
            'Coverage ILB',
            'Zone Coverage DB'
        ],
        Notes: 'This scheme offers up the ability to run a lot more option-type plays, but is almost entirely run-focused.',
        Strengths: ['Flexbone', 'Wishbone'],
        Weaknesses: ['Vertical', 'West Coast']
    },
    '2-Gap Zone': {
        Formations: [
            {
                name: '3-4 Okie',
                positions: [
                    'LE1',
                    'DT1',
                    'RE1',
                    '\n',
                    'LOLB1',
                    'MLB1',
                    'MLB2',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1'
                ]
            },
            {
                name: '3-4 Bronco',
                positions: [
                    'LE1',
                    'DT1',
                    'RE1',
                    'ROLB1',
                    '\n',
                    'LOLB1',
                    'MLB1',
                    'MLB2',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '3-4 Eagle',
                positions: [
                    'LOLB1',
                    'LE1',
                    'DT1',
                    'RE1',
                    'ROLB1',
                    '\n',
                    'MLB1',
                    'MLB2',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '3-3-5 Nickel',
                positions: [
                    'LE1',
                    'RE1',
                    'ROLB1',
                    '\n',
                    'LOLB1',
                    'MLB1',
                    'MLB2',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '3-2-6 Dime',
                positions: [
                    'LE1',
                    'RE1',
                    'ROLB1',
                    '\n',
                    'MLB1',
                    'MLB2',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'CB4',
                    'FS1',
                    'SS1'
                ]
            }
        ],
        SchemeFits: [
            'Run Stopper DE',
            'Run Stopper DT',
            'Nose Tackle DT',
            'Pass Rush OLB',
            'Run Stopper OLB',
            'Run Stopper ILB',
            'Zone Coverage DB'
        ],
        BadFits: [
            'Speed Rusher DE',
            'Pass Rusher DT',
            'Speed OLB',
            'Speed ILB',
            'Zone Coverage DB'
        ],
        Notes: 'This scheme offers up the ability to run a lot more option-type plays, but is almost entirely run-focused.',
        Strengths: ['Wing-T', 'Double Wing'],
        Weaknesses: ['Spread Option', 'Pistol']
    },
    '4-man Front Spread Stopper Zone': {
        Formations: [
            {
                name: '4-2-5 Base',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '4-1-6 Dime',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'MLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'CB4',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '4-1-6 Big Dime',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'MLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB4',
                    'FS1',
                    'SS1',
                    'SS2'
                ]
            },
            {
                name: '4-3 Heavy',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'SS2',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '4-4 Jumbo',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'SS1',
                    'SS2',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1'
                ]
            }
        ],
        SchemeFits: [
            'Speed Rush DE',
            'Pass Rusher DT',
            'Coverage OLB',
            'Coverage ILB',
            'Zone Coverage DB'
        ],
        BadFits: [
            'Run Stopper DE',
            'Run Stopper DT',
            'Run Stopper OLB',
            'Run Stopper ILB',
            'Run Stopper FS',
            'Run Stopper SS',
            'Man Coverage DB'
        ],
        Notes: 'This scheme offers up the ability to run a lot more option-type plays, but is almost entirely run-focused.',
        Strengths: ['Air Raid', 'Pistol'],
        Weaknesses: ['Flexbone', 'Wishbone']
    },
    '3-man Front Spread Stopper Zone': {
        Formations: [
            {
                name: '3-3-5 Base',
                positions: [
                    'LE1',
                    'DT1',
                    'RE1',
                    '\n',
                    'LOLB1',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '3-3-5 Over',
                positions: [
                    'LOLB1',
                    'LE1',
                    'DT1',
                    'RE1',
                    '\n',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '3-2-6 Big Penny',
                positions: [
                    'LE1',
                    'DT1',
                    'RE1',
                    '\n',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1',
                    'SS1',
                    'SS2'
                ]
            },
            {
                name: '3-2-6 Penny',
                positions: [
                    'LE1',
                    'DT1',
                    'RE1',
                    '\n',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'CB4',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '3-4-4 Heavy',
                positions: [
                    'LE1',
                    'DT1',
                    'RE1',
                    '\n',
                    'SS1',
                    'LOLB1',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1'
                ]
            }
        ],
        SchemeFits: [
            'Nose Tackle DT',
            'Pass Rush OLB',
            'Coverage ILB',
            'Zone Coverage DB'
        ],
        BadFits: [
            'Run Stopper DT',
            'Run Stopper OLB',
            'Run Stopper ILB',
            'Run Stopper FS',
            'Run Stopper SS',
            'Speed OLB',
            'Speed ILB',
            'Field General ILB',
            'Man Coverage DB'
        ],
        Notes: 'This scheme offers up the ability to run a lot more option-type plays, but is almost entirely run-focused.',
        Strengths: ['Run and Shoot', 'Spread Option'],
        Weaknesses: ['Power Run', 'I-Option']
    },
    'Speed Man': {
        Formations: [
            {
                name: '4-3 Base',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'LOLB1',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '4-3 Over',
                positions: [
                    'LOLB1',
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '4-2-5 Nickel',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '4-1-6 Dime',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'MLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1',
                    'SS1',
                    'SS2'
                ]
            },
            {
                name: '4-4 Heavy',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'SS1',
                    'LOLB1',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1'
                ]
            }
        ],
        SchemeFits: [
            'Speed Rush DE',
            'Pass Rusher DT',
            'Speed OLB',
            'Coverage OLB',
            'Speed ILB',
            'Man Coverage DB'
        ],
        BadFits: [
            'Run Stopper DE',
            'Nose Tackle DT',
            'Pass Rush OLB',
            'Field General ILB',
            'Zone Coverage DB'
        ],
        Notes: 'This scheme offers up the ability to run a lot more option-type plays, but is almost entirely run-focused.',
        Strengths: ['Vertical', 'West Coast'],
        Weaknesses: ['Wing-T', 'Double Wing']
    },
    'Multiple Man': {
        Formations: [
            {
                name: '4-3 Base',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'LOLB1',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '4-3 Over',
                positions: [
                    'LOLB1',
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '3-4 Bronco',
                positions: [
                    'LE1',
                    'DT1',
                    'RE1',
                    'ROLB1',
                    '\n',
                    'LOLB1',
                    'MLB1',
                    'MLB2',
                    '\n',
                    'CB1',
                    'CB2',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '3-3-5 Nickel',
                positions: [
                    'LE1',
                    'DT1',
                    'RE1',
                    'ROLB1',
                    '\n',
                    'MLB1',
                    'MLB2',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1',
                    'SS1'
                ]
            },
            {
                name: '4-2-5 Nickel',
                positions: [
                    'LE1',
                    'DT1',
                    'DT2',
                    'RE1',
                    '\n',
                    'MLB1',
                    'ROLB1',
                    '\n',
                    'CB1',
                    'CB2',
                    'CB3',
                    'FS1',
                    'SS1'
                ]
            }
        ],
        SchemeFits: [
            'Run Stopper DE',
            'Speed OLB',
            'Speed ILB',
            'Field General ILB',
            'Man Coverage DB',
            'Run Stopper DB'
        ],
        BadFits: [
            'Speed Rush DE',
            'Pass Rusher DT',
            'Coverage OLB',
            'Coverage ILB',
            'Zone Coverage DB'
        ],
        Notes: 'This scheme offers up the ability to run a lot more option-type plays, but is almost entirely run-focused.',
        Strengths: ['Power Run', 'I-Option'],
        Weaknesses: ['Run and Shoot', 'Air Raid']
    }
};

export const OffensiveSchemeOptions = [
    'Power Run',
    'Vertical',
    'West Coast',
    'I Option',
    'Run and Shoot',
    'Air Raid',
    'Pistol',
    'Spread Option',
    'Wing-T',
    'Double Wing',
    'Wishbone',
    'Flexbone'
];
export const RunnerDistributionLabels = ['QB', 'BK1', 'BK2', 'BK3'];
export const RunPlayLabels = [
    'OutsideLeft',
    'OutsideRight',
    'InsideLeft',
    'InsideRight',
    'PowerLeft',
    'PowerRight',
    'DrawLeft',
    'DrawRight'
];
export const OptionPlayLabels = [
    'ReadOptionLeft',
    'ReadOptionRight',
    'SpeedOptionLeft',
    'SpeedOptionRight',
    'InvertedOptionLeft',
    'InvertedOptionRight',
    'TripleOptionLeft',
    'TripleOptionRight'
];
export const RPOLabels = [
    'LeftVsRight',
    'ChoiceOutside',
    'ChoiceInside',
    'ChoicePower',
    'PeekOutside',
    'PeekInside',
    'PeekPower'
];

export const PassPlayLabels = [
    'Quick',
    'Short',
    'Long',
    'Screen',
    'PAShort',
    'PALong'
];
export const TargetingLabels = [
    'WR1',
    'WR2',
    'WR3',
    'WR4',
    'WR5',
    'TE1',
    'TE2',
    'TE3',
    'RB1',
    'RB2',
    'FB1'
];

export const TargetDepthLabel = ['Quick', 'Short', 'Long', 'None'];
export const WRRunnerList = ['WR1', 'WR2', 'WR3', 'WR4', 'WR5'];

export const DefensiveSchemeOptions = [
    'Front 7 Man',
    '2-Gap Zone',
    '4-man Front Spread Stopper Zone',
    '3-man Front Spread Stopper Zone',
    'Speed Man',
    'Multiple Man'
];

export const Defense34Formations = ['Base 3-4', 'Nickel 3-3-5', 'Dime 3-2-6'];
export const Defense43Formations = ['Base 4-3', 'Nickel 4-2-5', 'Dime 4-1-6'];
export const BlitzAggressivenessOptions = [
    'Cautious',
    'Moderate',
    'Aggressive'
];

export const YesNoOptions = ['Yes', 'No'];
export const CoverageOptions = ['Man', 'Zone'];
