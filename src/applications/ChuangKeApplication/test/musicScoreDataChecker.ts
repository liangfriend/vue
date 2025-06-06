import {
    calculationOfStaffRegion
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
    ClefEnum,
    MusicalAlphabetEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

const allNotes = Object.values(MusicalAlphabetEnum);
const clefList = Object.values(ClefEnum);

function testRegion() {
    for (const clef of clefList) {
        for (const note of allNotes) {
            const region = calculationOfStaffRegion(clef, note as MusicalAlphabetEnum);
            console.log(`[${clef}] ${note} => ${JSON.stringify(region)}`);
        }
    }
}

testRegion()