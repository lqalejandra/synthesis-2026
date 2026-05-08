import teamsBundle from '../data/teams.json'

export type Team = (typeof teamsBundle.teams)[number]

export const teams: Team[] = teamsBundle.teams
