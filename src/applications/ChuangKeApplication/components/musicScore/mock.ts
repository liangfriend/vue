import {Chronaxie, musicalAlphabetMap} from '@/applications/ChuangKeApplication/components/musicScore/dataMap.ts';

const data:MusicScore = {
  multipleStavesArray:[{
    singleStaffArray:[{
      measureArray:[{
        clef:'g', //谱号
        timeSignature: '4/4',  //拍号
        keySignature:'c', //调号
        noteArray:[{
          clef:'',
          musicalAlphabet:'c1',
          chronaxie:Chronaxie.EIGHTH,
          sort:1
        }]
      },{
        clef:'g', //谱号
        timeSignature: '4/4',  //拍号
        keySignature:'c', //调号
        noteArray:[{
          clef:'',
          musicalAlphabet:'c1',
          chronaxie:Chronaxie.SIXTH,
          sort:2
        },{
          clef:'',
          musicalAlphabet:'c1',
          chronaxie:Chronaxie.SIXTH,
          sort:2
        },{
          clef:'',
          musicalAlphabet:'c1',
          chronaxie:Chronaxie.SIXTH,
          sort:2
        },{
          clef:'',
          musicalAlphabet:'c1',
          chronaxie:Chronaxie.SIXTH,
          sort:2
        }]
      }]
    }]
  },{
    singleStaffArray:[{
      measureArray:[{
        clef:'g', //谱号
        timeSignature: '4/4',  //拍号
        keySignature:'c', //调号
        noteArray:[{
          clef:'',
          musicalAlphabet:'c1',
          chronaxie:Chronaxie.QUARTER,
          sort:1
        }]
      },{
        clef:'g', //谱号
        timeSignature: '4/4',  //拍号
        keySignature:'c', //调号
        noteArray:[{
          clef:'',
          musicalAlphabet:'c1',
          chronaxie:Chronaxie.QUARTER,
          sort:2
        }]
      }]
    },{
      measureArray:[{
        clef:'g', //谱号
        timeSignature: '4/4',  //拍号
        keySignature:'c', //调号
        noteArray:[{
          clef:'',
          musicalAlphabet:'c1',
          chronaxie:Chronaxie.EIGHTH,
          sort:1
        }]
      },{
        clef:'g', //谱号
        timeSignature: '4/4',  //拍号
        keySignature:'c', //调号
        noteArray:[{
          clef:'',
          musicalAlphabet:'c1',
          chronaxie:Chronaxie.QUARTER,
          sort:2
        }]
      }]
    }]
  }]
};
export default data;