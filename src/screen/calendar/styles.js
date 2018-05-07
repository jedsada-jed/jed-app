import { StyleSheet } from 'react-native'

const cDayHeight = 44
const cTextHeadMargin = 11
const cHeaderMargin = 11
const cHeaderFontSize = 14
const cBodyPaddingHorizontal = 7
const cMainHeight = (cDayHeight * 5) + (cTextHeadMargin * 2) + (cHeaderMargin * 2) + cHeaderFontSize

export {
  cDayHeight,
  cTextHeadMargin,
  cHeaderMargin,
  cHeaderFontSize,
  cMainHeight,
  cBodyPaddingHorizontal,
}

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  dayMark: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  dayWrapperDisable: {
    flex: 1,
    height: cDayHeight,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayTextDisable: {
    fontSize: 16,
    textAlign: 'center',
    color: '#cccccc',
  },
  dayWrapper: {
    flex: 1,
    height: cDayHeight,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mark: {
    flex: 1,
    width: 43,
    backgroundColor: '#ff1654',
    borderRadius: 8,
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
  },
  fromToMark: {
    color: '#fff',
    position: 'absolute',
    top: 1,
    fontSize: 10,
  },
  dayName: {
    flex: 1,
    height: cDayHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayName: {
    height: cDayHeight,
    flexDirection: 'row',
    paddingHorizontal: cBodyPaddingHorizontal,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  dayNameText: {
    fontSize: 12,
    color: '#999999',
  },
})
