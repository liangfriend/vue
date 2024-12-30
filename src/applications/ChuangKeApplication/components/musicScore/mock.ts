import {musicalAlphabetMap} from '@/applications/ChuangKeApplication/components/musicScore/dataMap.ts';

const data:MusicScore = {
  multipleStavesArray:[{
    singleStaffArray:[{
      measureArray:[{
        clef:'g', //谱号
        timeSignature: '4/4',  //拍号
        keySignature:'c', //调号
        noteArray:[{
          note:{
            musicalAlphabet:'c1',
            chronaxie:4
          },
          sort:1
        }]
      },{
        clef:'g', //谱号
        timeSignature: '4/4',  //拍号
        keySignature:'c', //调号
        noteArray:[{
          note:{
            musicalAlphabet:'c1',
            chronaxie:4
          },
          sort:1
        }]
      }]
    },{
      measureArray:[{
        clef:'g', //谱号
        timeSignature: '4/4',  //拍号
        keySignature:'c', //调号
        noteArray:[{
          note:{
            musicalAlphabet:'c1',
            chronaxie:4
          },
          sort:1
        }]
      },{
        clef:'g', //谱号
        timeSignature: '4/4',  //拍号
        keySignature:'c', //调号
        noteArray:[{
          note:{
            musicalAlphabet:'c1',
            chronaxie:4
          },
          sort:1
        }]
      }]
    }]
  }]
};
export default data;