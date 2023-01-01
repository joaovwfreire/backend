
const checkChallenge = async (initialStats: any, currentStats: any, requirements: any) =>{

    for (const key in requirements) {
        if (requirements[key]  != undefined && typeof requirements[key] == 'number'){
            if (currentStats[key] - initialStats[key] >= requirements[key]){
                return true;
            }
            return false;
        }
    }

}
export { checkChallenge };