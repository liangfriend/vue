import {
  ChronaxieEnum,
  ClefEnum, KeySignatureEnum, MuseScoreRegionEnum,
  MusicalAlphabetEnum, TimeSignatureEnum
} from '../musicScoreEnum.ts';
//通过五线谱谱号，调号，钢琴音名信息计算出音符的位于第几线或第几间。

function calculateNotePosition(clef:ClefEnum, keySignature:KeySignatureEnum, musicalAlphabet:MusicalAlphabetEnum):{
  position: MuseScoreRegionEnum;
  accidental: string   //这个后续可能要去掉，不需要数组，确定唯一position
}[] {
  const map: Record<string, MuseScoreRegionEnum> = {
    'g-c-C4': MuseScoreRegionEnum.space_3,
    'g-c-D4': MuseScoreRegionEnum.line_4,
    'g-c-E4': MuseScoreRegionEnum.space_4,
    'g-c-F4': MuseScoreRegionEnum.line_5,
    'g-c-G4': MuseScoreRegionEnum.upper_space_1,
    'g-c-A4': MuseScoreRegionEnum.upper_line_1,
    'g-c-B4': MuseScoreRegionEnum.upper_space_2,
    'g-c-C5': MuseScoreRegionEnum.upper_line_2,
    'g-c-D5': MuseScoreRegionEnum.upper_space_3,
    'g-c-E5': MuseScoreRegionEnum.upper_line_3,
    'g-c-F5': MuseScoreRegionEnum.upper_space_4,
    'g-c-G5': MuseScoreRegionEnum.upper_line_4,
    'g-c-A5': MuseScoreRegionEnum.upper_space_5,
    'g-c-B5': MuseScoreRegionEnum.upper_line_5,
  };
  const position = map[`${clef}-${keySignature}-${musicalAlphabet}`];

  if (position) {
    return [{position,accidental:''}];  // 返回找到的音符位置,是一个数组，因为不同升降还原号会导致不同的position
  }
  console.error('找不到对位置',`${clef}-${keySignature}-${musicalAlphabet}`);
  return [{position:MuseScoreRegionEnum.space_3,accidental:''}];

}
export {calculateNotePosition};
//通过升降还原符号，音符所在五线谱位置，五线谱谱号，调号，计算出音符对应的钢琴音名