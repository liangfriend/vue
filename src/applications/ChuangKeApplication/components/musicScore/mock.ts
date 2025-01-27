import {
  ChronaxieEnum,
  ClefEnum, KeySignatureEnum,
  MusicalAlphabetEnum, TimeSignatureEnum
} from './musicScoreEnum.ts';
const data:MusicScore = {
  multipleStavesArray:[{
    singleStaffArray:[{
      measureArray:[{
        timeSignature: TimeSignatureEnum['4/4'],  //拍号
        keySignature:KeySignatureEnum.c, //调号
        noteArray:[{
          clef:ClefEnum.g,
          musicalAlphabet:MusicalAlphabetEnum.C1,
          chronaxie:ChronaxieEnum.eighth,
          sort:1
        }]
      },{
        timeSignature: TimeSignatureEnum['4/4'],  //拍号
        keySignature:KeySignatureEnum.c, //调号
        noteArray:[{
          clef:ClefEnum.g,
          musicalAlphabet:MusicalAlphabetEnum.C1,
          chronaxie:ChronaxieEnum.sixteenth,
          sort:2
        },{
          clef:ClefEnum.none,
          musicalAlphabet:MusicalAlphabetEnum.C1,
          chronaxie:ChronaxieEnum.sixteenth,
          sort:2
        },{
          clef:ClefEnum.none,
          musicalAlphabet:MusicalAlphabetEnum.C1,
          chronaxie:ChronaxieEnum.sixteenth,
          sort:2
        },{
          clef:ClefEnum.none,
          musicalAlphabet:MusicalAlphabetEnum.C1,
          chronaxie:ChronaxieEnum.sixteenth,
          sort:2
        }]
      }]
    }]
  },{
    singleStaffArray:[{
      measureArray:[{
        timeSignature: TimeSignatureEnum['4/4'],  //拍号
        keySignature:KeySignatureEnum.c, //调号
        noteArray:[{
          clef:ClefEnum.g,
          musicalAlphabet:MusicalAlphabetEnum.C1,
          chronaxie:ChronaxieEnum.quarter,
          sort:1
        }]
      },{
        timeSignature: TimeSignatureEnum['4/4'],  //拍号
        keySignature:KeySignatureEnum.c, //调号
        noteArray:[{
          clef:ClefEnum.none,
          musicalAlphabet:MusicalAlphabetEnum.C1,
          chronaxie:ChronaxieEnum.quarter,
          sort:2
        }]
      }]
    },{
      measureArray:[{
        timeSignature: TimeSignatureEnum['4/4'],  //拍号
        keySignature:KeySignatureEnum.c, //调号
        noteArray:[{
          clef:ClefEnum.g,
          musicalAlphabet:MusicalAlphabetEnum.C1,
          chronaxie:ChronaxieEnum.eighth,
          sort:1
        }]
      },{
        timeSignature: TimeSignatureEnum['4/4'],  //拍号
        keySignature:KeySignatureEnum.c, //调号
        noteArray:[{
          clef:ClefEnum.g,
          musicalAlphabet:MusicalAlphabetEnum.C1,
          chronaxie:ChronaxieEnum.quarter,
          sort:2
        }]
      }]
    }]
  }]
};
export default data;