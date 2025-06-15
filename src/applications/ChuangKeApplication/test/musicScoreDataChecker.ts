import {
    getNoteMusicalAlphabet
} from "@/applications/ChuangKeApplication/components/musicScore/utils/musicScoreDataUtil.ts";
import {
    AccidentalEnum,
    ClefEnum,
    KeySignatureEnum,
    MusicalAlphabetEnum,
    MusicScoreRegionEnum
} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";

// const allNotes = Object.values(MusicalAlphabetEnum);
// const clefList = Object.values(ClefEnum);

const allNotes = [MusicalAlphabetEnum.C4]
const clefList = [ClefEnum.treble]

function testRegion() {

    const alphabet: MusicalAlphabetEnum = getNoteMusicalAlphabet(MusicScoreRegionEnum.lower_line_1, ClefEnum.alto, KeySignatureEnum['C#'], AccidentalEnum.nature);
    console.log('chicken', alphabet)
}

testRegion()