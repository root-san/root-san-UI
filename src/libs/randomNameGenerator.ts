const names = [
  'いぬ',
  'うし',
  'うま',
  'かば',
  'くま',
  'さい',
  'さる',
  'しか',
  'いるか',
  'うさぎ',
  'きつね',
  'きりん',
  'くじら',
  'ごりら',
  'しゃち',
  'たぬき',
  'ねずみ',
  'あざらし',
  'えぞりす',
  'おおかみ',
  'かわうそ',
  'きたりす',
  'らすかる',
  'とらすた',
  'たら',
  'とらっぷ',
]

export const randomNameGenerator = () => {
  const name = names[Math.floor(Math.random() * names.length)]
  return name
}
