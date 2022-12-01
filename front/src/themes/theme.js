
export const lightTheme = {
    containerBg: '#F0F0F0',
    backgroundColor: '#fff',
    bgsecondary: '#F8F8F8',
    textColor: '#000000',
    primaryColor: '#2E4E3F',
    secondaryColor: '#50A657',
    numButtonTextColor: '#fff',
    transparent: 'transparent',
    editorLight: 'light',
    editorDark: 'vs-dark'
};

export const darkTheme = {
    containerBg: '#48566A',
    backgroundColor: '#22242d',
    bgsecondary: '#1b1b23',
    textColor: '#fff',
    primaryColor: '#ffe246',
    secondaryColor: '#3376F6',
    numButtonTextColor: '#000000',
    transparent: 'transparent',
    editorLight: 'light',
    editorDark: 'vs-dark'
};

export const programmersTheme = {
//     헤더 : R14 G21 B27 / #0E151B
//     dark body : R41 G54 B69 / #293645
// white body  - 제목 : R241 G243 B246 / #F1F3F6, 본문 : R255 G255 B255 / #FFFFFF
// 버튼 - 제출 : R51 G188 B246 / #3376F6, 나머지 : R72 G86 B106 / #48566A
    headerbg : '#0E151B',
    bodyDarkbg : '#293645',
    txt: '#FFFFFF',
    bodyWhite : '#F1F3F6',
    submitButton : '#3376F6',
    button: '#48566A',
    transparent: 'transparent',
    editorLight: 'light',
    editorDark: 'vs-dark'
}

export const hackerRankTheme = {
//     헤더 : R59 G66 B77 / #3B424D
//     body - 제목 : R243 G246 B246 / #F3F6F6, 본문 : R255 G255 B254 / #FFFFFE
// 버튼 - run : R255 G255 B255 / #FFFFFF, 제출 : R80 G166 B87 / #50A657
    headerbg : '#3B424D',
    headertxt : '',
    bodyDark : '#F3F6F6',
    bodyWhite : '#FFFFFE',
    submitButton : '#50A657',
    button: '#FFFFFE'
}

export const leetCodeTheme = {
//     다크모드 - 본문(헤더 포함) : R40 G40 B40 / #282828, 제목(배경) : R26 G26 B26 / #1A1A1A
// 화이트모드 - 본문 : R255 G255 B254 / #FFFFFE, 제목(배경) : R247 G248 B249 / #F7F8F9
// 버튼 - run : R242 G242 B243 / #F2F2F3, submit : R90 G178 B102 / #5AB266
    headerbg : '#282828',
    headertxt : '',
    bodyDark : '#1A1A1A',
    bodyWhite : '',
    submitButton : '#5AB266',
    button: '#F2F2F3'
}

export const theme = {
    lightTheme,
    darkTheme,
    programmersTheme,
    hackerRankTheme,
    leetCodeTheme
};

export default theme;