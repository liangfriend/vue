
//通过五线谱谱号，调号，钢琴音名信息计算出音符的位于第几线或第几间。
function calculateNotePosition(clef:ClefEnum, keySignature:KeySignatureEnum, musicalAlphabet:MusicalAlphabetEnum):{
  position: MuseScoreRegionEnum;
  accidental: string
}[] {
  const map: Record<string, MuseScoreRegionEnum> = {
    'g-c-C1': MuseScoreRegionEnum.space_3,
    'g-c-D1': MuseScoreRegionEnum.line_4
  };
  const position = map[`${clef}-${keySignature}-${musicalAlphabet}`];

  if (position) {
    return [{position,accidental:'none'}];  // 返回找到的音符位置,是一个数组，因为不同升降还原号会导致不同的position
  }
  console.error('找不到对位置');
  return [{position:MuseScoreRegionEnum.space_3,accidental:'none'}];

}

//通过升降还原符号，音符所在五线谱位置，五线谱谱号，调号，计算出音符对应的钢琴音名