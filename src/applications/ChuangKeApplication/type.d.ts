//定义全局类型，无需导入即可使用
declare global {
    type Note = {
        clef:string, //谱号
        chronaxie:string //时值   2048全音符 1024二分音符 512四分音符 256八分音符 128十六分音符 64三十二分音符  32一百二十八分音符
        musicalAlphabet:string //音名
        sort: number;  //这个不太对,重新思考  音符顺序。 这个应该通过算法生成。并且如果有和弦或音程，会出现多个音符sort相同的情况
        //倚音，附点，震音，强弱，临时变化音
    }
    type MusicScore = {

        multipleStavesArray: Array<{ //复谱表
            singleStaffArray: Array<{ //单谱表
                measureArray: Array<{ //小节表
                            clef:string, //谱号
                            timeSignature: string;  //拍号
                            keySignature:string //调号
                            noteArray: Array<Note>
                }>;
            }>;
        }>;
    };
}

export {};