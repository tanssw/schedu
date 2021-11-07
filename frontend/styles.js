import { StyleSheet } from "react-native"

const colorCode = {
    blue: '#001e6a',
    lightBlue: '#005295',
    lighterBlue: '#4f89c4',
    grey: 'grey',
    yellow: '#ffaa54'
}

const background = StyleSheet.create({
    blue: {
        backgroundColor: colorCode.blue
    }
})

const text = StyleSheet.create({
    blue: {
        color: colorCode.blue
    },
    lightBlue: {
        color: colorCode.lightBlue
    },
    lighterBlue: {
        color: colorCode.lighterBlue
    },
    white: {
        color: 'white'
    },
    grey: {
        color: 'grey'
    },
    lightGrey: {
        color: 'lightgrey'
    },
    bold: {
        fontWeight: 'bold'
    },
    yellow: {
        color: colorCode.yellow
    }
})

const shadow = StyleSheet.create({
    boxBottomSmall: {
        shadowColor: 'black',
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2
    },
    boxTopMedium: {
        shadowColor: 'black',
        shadowRadius: 16,
        shadowOffset: {width: 0, height: -8},
        shadowOpacity: 0.2
    }
})

export {
    colorCode,
    background,
    text,
    shadow
}