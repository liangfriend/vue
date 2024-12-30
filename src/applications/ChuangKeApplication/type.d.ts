//定义全局类型，无需导入即可使用
declare global {
    type Note = {
        chronaxie:number //时值   1全音符 2二分音符 4 8 16 32
        musicalAlphabet:string //音名
    }
    type MusicScore = {

        multipleStavesArray: Array<{ //复谱表
            singleStaffArray: Array<{ //单谱表
                measureArray: Array<{ //小节表
                            clef:string, //谱号
                            timeSignature: string;  //拍号
                            keySignature:string //调号
                            noteArray: Array<{ //音符列表
                                note:Note    //音符
                                sort: number;  //这个不太对,重新思考  音符顺序。 这个应该通过算法生成。并且如果有和弦或音程，会出现多个音符sort相同的情况
                            }>
                }>;
            }>;
        }>;
    };
}

export {};