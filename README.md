This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

This repo builds a react widget, which integrates react-spring and reactstrap.

This widget could be used to introduce new feature, where an animation effect will be applied to the button leading to the new feature. 

Also, when the button is clicked, a popup window will show up to offer details of this new feature.

If the user clicks "I got it, do not show this again." inside the popup window, the animation and popup will not appear again.

## Tips

When using react-spring, it is always a good idea to use React.memo() to wrap the component in order to ensure the performance.