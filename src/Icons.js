const Ionicons = require('react-native-vector-icons/Ionicons');

import GlobalStyles from "./Styles"

let iconsMap = {};

export default class Icons {

  static instance = null;

  static get() {
    if (this.instance == null) {
      this.instance = new Icons();
    }

    return this.instance;
  }

  static getIcon(name) {
    return iconsMap[name];
  }

  constructor() {
    this.loadIcons();
  }

  async loadIcons(callback) {
    var color = GlobalStyles.constants().mainBackgroundColor; //#FFFFFF

    let icons = {
      "ios-menu-outline": [Ionicons, 25, color],
      "ios-contact-outline": [Ionicons, 25, color],
      "ios-flag": [Ionicons, 25, color],

      "md-add" : [Ionicons, 25, color],
      "md-bookmark" : [Ionicons, 25, color],
      "md-pricetag" : [Ionicons, 25, color],
      "md-menu" : [Ionicons, 25, color],
      "md-more" : [Ionicons, 25, color],
      "md-settings" : [Ionicons, 25, color],
    };

    return new Promise((resolve, reject) => {
      new Promise.all(
        Object.keys(icons).map(iconName =>
          icons[iconName][0].getImageSource(
            iconName,
            icons[iconName][1],
            icons[iconName][2]
          ))
      ).then(sources => {
        Object.keys(icons).forEach((iconName, idx) => {
          iconsMap[iconName] = sources[idx]
        })
        resolve(true);
      })
    });
  }

}
