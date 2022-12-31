


const checkChallenge = async (initialStats: any, currentStats: any, requirements: any) =>{
let pointsDifference = 0;
const responseForPositiveLogic = async(requirement: Number, pointsDifference: Number) => {
    if (requirement == undefined){
        requirement = 0;
    }
    console.log({pointsDifference})
    console.log({requirement})
    if (pointsDifference >= requirement){
        return true;
    } else{
        return false
    }
}

if (requirements.top25 != 0) {
    
    pointsDifference += 
        (currentStats.wins - initialStats.wins) + 
        (currentStats.top3 - initialStats.top3) +
        (currentStats.top5 - initialStats.top5) +
        // (currentStats.top6 - initialStats.top6) + smh top 5 and top3 update top6?!
        (currentStats.top10 - initialStats.top10) +
        (currentStats.top12 - initialStats.top12) +
        (currentStats.top25 - initialStats.top25);
    
    let res = await responseForPositiveLogic(requirements.top25, pointsDifference);
    return res;
        
}

if (requirements.top12 != 0) {
    pointsDifference += 
        (currentStats.wins - initialStats.wins) + 
        (currentStats.top3 - initialStats.top3) +
        (currentStats.top5 - initialStats.top5) +
        //(currentStats.top6 - initialStats.top6) +
        (currentStats.top10 - initialStats.top10) +
        (currentStats.top12 - initialStats.top12);
    
    let res = await responseForPositiveLogic(requirements.top12, pointsDifference);
    return res;
}
if (requirements.top10 != 0) {
    pointsDifference += 
        (currentStats.wins - initialStats.wins) + 
        (currentStats.top3 - initialStats.top3) +
        (currentStats.top5 - initialStats.top5) +
        //(currentStats.top6 - initialStats.top6) +
        (currentStats.top10 - initialStats.top10);
    
    let res = await responseForPositiveLogic(requirements.top10, pointsDifference);
    return res;
}

if (requirements.top6 != 0) {
    pointsDifference += 
        (currentStats.wins - initialStats.wins) + 
        (currentStats.top3 - initialStats.top3) +
        (currentStats.top5 - initialStats.top5);
        // (currentStats.top6 - initialStats.top6);
    
    let res = await responseForPositiveLogic(requirements.top6, pointsDifference);
    return res;
}

if (requirements.top5 != 0) {
    pointsDifference += 
        (currentStats.wins - initialStats.wins) + 
        (currentStats.top3 - initialStats.top3) +
        (currentStats.top5 - initialStats.top5);
    
    let res = await responseForPositiveLogic(requirements.top5, pointsDifference);
    return res;
}

if (requirements.top3 != 0) {
    pointsDifference += 
        (currentStats.wins - initialStats.wins) + 
        (currentStats.top3 - initialStats.top3);
    
    let res = await responseForPositiveLogic(requirements.top3, pointsDifference);
    return res;
}

if (requirements.wins != 0) {
    pointsDifference += 
        (currentStats.wins - initialStats.wins);
    
    let res = await responseForPositiveLogic(requirements.wins, pointsDifference);
    return res;
}

if (requirements.score != 0) {
    pointsDifference += 
        (currentStats.score - initialStats.score);
    
    let res = await responseForPositiveLogic(requirements.score, pointsDifference);
    return res;
}
if (requirements.scorePerMin != 0) {
    pointsDifference += 
        (currentStats.scorePerMin - initialStats.scorePerMin);
    
    let res = await responseForPositiveLogic(requirements.scorePerMin, pointsDifference);
    return res;
}
if (requirements.scorePerMatch != 0) {
    pointsDifference += 
        (currentStats.scorePerMatch - initialStats.scorePerMatch);
    
    let res = await responseForPositiveLogic(requirements.scorePerMatch, pointsDifference);
    return res;
}
if (requirements.kills != 0) {
    pointsDifference += 
        (currentStats.kills - initialStats.kills);
    
    let res = await responseForPositiveLogic(requirements.kills, pointsDifference);
    return res;
}

if (requirements.killsPerMin != 0){
    pointsDifference += 
        (currentStats.killsPerMin - initialStats.killsPerMin);
    
    let res = await responseForPositiveLogic(requirements.killsPerMin, pointsDifference);
    return res;
}

if (requirements.killsPerMatch != 0){
    pointsDifference += 
        (currentStats.killsPerMatch - initialStats.killsPerMatch);
    
    let res = await responseForPositiveLogic(requirements.wins, pointsDifference);
    return res;
}
if (requirements.matches != 0){
    pointsDifference += 
        (currentStats.matches - initialStats.matches);
    
    let res = await responseForPositiveLogic(requirements.matches, pointsDifference);
    return res;
}
if (requirements.winRate != 0){
    pointsDifference += 
        (currentStats.winRate - initialStats.winRate);
    
    let res = await responseForPositiveLogic(requirements.winRate, pointsDifference);
    return res;
}
if (requirements.minutesPlayed != 0){
    pointsDifference += 
        (currentStats.minutesPlayed - initialStats.minutesPlayed);
    
    let res = await responseForPositiveLogic(requirements.minutesPlayed, pointsDifference);
    return res;
}
if (requirements.playersOutlived != 0){
    pointsDifference += 
        (currentStats.playersOutlived - initialStats.playersOutlived);
    
    let res = await responseForPositiveLogic(requirements.playersOutlived, pointsDifference);
    return res;
}


}
export { checkChallenge };