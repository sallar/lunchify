var React = require('react-native');
var {
        PixelRatio,
        NavigatorIOS,
        StyleSheet,
        View,
        } = React;

var cssVar = require('cssVar');
var MapView = require('./Map');
var {Stylesheet, Variables} = require('../utils/Styles');

var Navigation = React.createClass({

    render: function() {
        return (
            <NavigatorIOS
                style={Stylesheet.flex}
                initialRoute={{
                    component: this.props.component,
                    title: this.props.title
                }}
                barTintColor={Variables.brandColor}
                />
        );
    },

});

var styles = StyleSheet.create({
    messageText: {
        fontSize: 17,
        fontWeight: '500',
        padding: 15,
        marginTop: 50,
        marginLeft: 15,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#CDCDCD',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
    navBar: {
        backgroundColor: Variables.brandColor,
    },
    navBarText: {
        fontSize: 16,
        marginVertical: 10,
        fontFamily: Variables.fontFamily
    },
    navBarTitleText: {
        //color: cssVar('fbui-bluegray-60'),
        fontWeight: '500',
        marginVertical: 9,
        color: 'white'
    },
    navBarLeftButton: {
        paddingLeft: 10,
    },
    navBarRightButton: {
        paddingRight: 10,
    },
    navBarButtonText: {
        //color: cssVar('fbui-accent-blue'),
        color: 'white'
    },
    scene: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#EAEAEA',
    },
});

module.exports = Navigation;
