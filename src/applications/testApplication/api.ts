export async function getPoems() {
    return new Promise(resolve => {
        resolve({
            data: [
                {
                    name: '静夜思',
                    author: '李白',
                    lyrics: ['窗前明月光啊實打實大蘇打', '疑是地上阿斯頓阿dasfasdf爱上对方撒大叔大叔大叔大叔的发生打斯啊大蘇打實打實的頓霜', '举头望啊是大颯颯明月', '低头思故乡', '低头思故乡', '低头思故乡', '低头思故乡', '低头啊實大蘇打實打實打實大蘇打思故乡', '低头思故乡'],
                },
                {
                    name: '春晓',
                    author: '孟浩然',
                    lyrics: ['春眠不觉晓', '处处闻啼鸟', '夜来风雨声', '花落知多少'],
                },
                {
                    name: '登鹳雀楼',
                    author: '王之涣',
                    lyrics: ['白日依山尽', '黄河入海流'],
                },
                {
                    name: '咏鹅',
                    author: '骆宾王',
                    lyrics: ['鹅，鹅，鹅', '曲项向天歌', '白毛浮绿水', '红掌拨清波'],
                },
                {
                    name: '悯农',
                    author: '李绅',
                    lyrics: ['锄禾日当午', '汗滴禾下土', '谁知盘中餐', '粒粒皆辛苦'],
                },
                {
                    name: '望庐山瀑布',
                    author: '李白',
                    lyrics: ['日照香炉生紫烟', '遥看瀑布挂前川', '飞流直下三千尺', '疑是银河落九天'],
                },
                {
                    name: '赠汪伦',
                    author: '李白',
                    lyrics: ['李白乘舟将欲行', '忽闻岸上踏歌声', '桃花潭水深千尺', '不及汪伦送我情'],
                },
                {
                    name: '早发白帝城',
                    author: '李白',
                    lyrics: ['朝辞白帝彩云间', '千里江陵一日还', '两岸猿声啼不住', '轻舟已过万重山'],
                },
                {
                    name: '黄鹤楼送孟浩然之广陵',
                    author: '李白',
                    lyrics: ['故人西辞黄鹤楼', '烟花三月下扬州', '孤帆远影碧空尽', '唯见长江天际流'],
                },
                {
                    name: '绝句',
                    author: '杜甫',
                    lyrics: ['两个黄鹂鸣翠柳', '一行白鹭上青天', '窗含西岭千秋雪', '门泊东吴万里船'],
                },
                {
                    name: '春夜喜雨',
                    author: '杜甫',
                    lyrics: ['好雨知时节', '当春乃发生', '随风潜入夜', '润物细无声'],
                },
                {
                    name: '游子吟',
                    author: '孟郊',
                    lyrics: ['慈母手中线', '游子身上衣', '临行密密缝', '意恐迟迟归', '谁言寸草心', '报得三春晖'],
                },
                {
                    name: '回乡偶书',
                    author: '贺知章',
                    lyrics: ['少小离家老大回', '乡音无改鬓毛衰', '儿童相见不相识', '笑问客从何处来'],
                },
                {
                    name: '咏柳',
                    author: '贺知章',
                    lyrics: ['碧玉妆成一树高', '万条垂下绿丝绦', '不知细叶谁裁出', '二月春风似剪刀'],
                },
                {
                    name: '江雪',
                    author: '柳宗元',
                    lyrics: ['千山鸟飞绝', '万径人踪灭', '孤舟蓑笠翁', '独钓寒江雪'],
                },
                {
                    name: '登幽州台歌',
                    author: '陈子昂',
                    lyrics: ['前不见古人', '后不见来者', '念天地之悠悠', '独怆然而涕下'],
                },
                {
                    name: '枫桥夜泊',
                    author: '张继',
                    lyrics: ['月落乌啼霜满天', '江枫渔火对愁眠', '姑苏城外寒山寺', '夜半钟声到客船'],
                },
                {
                    name: '出塞',
                    author: '王昌龄',
                    lyrics: ['秦时明月汉时关', '万里长征人未还', '但使龙城飞将在', '不教胡马度阴山'],
                },
                {
                    name: '凉州词',
                    author: '王翰',
                    lyrics: ['葡萄美酒夜光杯', '欲饮琵琶马上催', '醉卧沙场君莫笑', '古来征战几人回'],
                },
                {
                    name: '望月怀远',
                    author: '张九龄',
                    lyrics: ['海上生明月', '天涯共此时', '情人怨遥夜', '竟夕起相思'],
                },
            ]
        })
    })
}

const baseUrl = 'http://192.168.2.100:3000'

// 生成旋律
export async function generateMelody(payload: {
    text: string,
    seedMelody: { chronaxie: number, midi: number },
    length: number,
    params: any
}) {
    const response = await fetch(baseUrl + '/melody/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
    });
    const textBody = await response.text();
    let data = null;
    try {
        data = textBody ? JSON.parse(textBody) : null;
    } catch (err) {
        data = null;
    }
    return data
    if (!response.ok) {
        const message = (data && data.error) || response.statusText || 'Request failed';
        throw new Error(message);
    }
}
