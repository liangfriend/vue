import {msType} from "@/applications/ChuangKeApplication/components/musicScore/types";

export declare interface mouseDownData {
    msData: msType
}

export declare interface MouseDownInject {
    msSymbolMouseDown: (e: MouseEvent, data: mouseDownData) => void
    measureMouseDown: (e: MouseEvent, data: mouseDownData) => void
    singleStaffMouseDown: (e: MouseEvent, data: mouseDownData) => void
    multipleStavesMouseDown: (e: MouseEvent, data: mouseDownData) => void
}
