import {MusicScoreRegionEnum} from "@/applications/ChuangKeApplication/components/musicScore/musicScoreEnum.ts";
import {msType} from "@/applications/ChuangKeApplication/components/musicScore/types";


// 采用发布订阅者模式实现编辑模式的数据操作
export const subscriberMap = new Map()

// 添加发布者
export function addSubscriber(key: string, value: msType) {
    console.log('chicken添加订阅', value)
    subscriberMap.set(key, value)
}

export function getSubscriber(key: string): msType {
    return subscriberMap.get(key)
}

export const eventConstant = {
    startX: 0, //鼠标按下时相对视口坐标
    startY: 0,
}


export function msSymbolSelected(e: MouseEvent, measureHeight: number) {
    if (!subscriberMap.has('msSymbol')) return
    const msSymbol = subscriberMap.get('msSymbol')
    const dx = e.clientX - eventConstant.startX;
    const dy = e.clientY - eventConstant.startY;
    if (Math.abs(dy) > measureHeight / 8 && msSymbol) {
        const index = Math.floor(dy / measureHeight * 8);
        const targetIndex = msSymbol.region - index;
        if (targetIndex in MusicScoreRegionEnum) {
            msSymbol.region = targetIndex as MusicScoreRegionEnum;
            eventConstant.startY = e.clientY;
        }
    }
}

export function measureSelected(e: MouseEvent) {
    if (!subscriberMap.has('measure')) return

}

export function cancelMsSymbolSelected(e: MouseEvent) {
    if (!subscriberMap.has('msSymbol')) return
    const msSymbol = subscriberMap.get('msSymbol')
    msSymbol.options.hightlight = false
    subscriberMap.delete('msSymbol')
}

export function cancelMeasureSelected(e: MouseEvent) {
    if (!subscriberMap.has('measure')) return
    const measure = subscriberMap.get('measure')
    measure.options.hightlight = false
    subscriberMap.delete('measure')
}