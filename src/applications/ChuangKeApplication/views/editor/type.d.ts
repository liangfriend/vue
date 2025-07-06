import {
    measureFunctionEnum,
    multipleStavesFunctionEnum,
    singleStaffFunctionEnum
} from "@/applications/ChuangKeApplication/views/editor/enum.ts";

type FunctionListItem = {
    name: string,
    key: measureFunctionEnum | singleStaffFunctionEnum | multipleStavesFunctionEnum
}