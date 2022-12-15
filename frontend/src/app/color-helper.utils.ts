export class ColorHelper {
  public static colorPalette: Array<any> = [
    '#ADA2FF',
    '#C0DEFF',
    '#FFE5F1',
    '#FFF8E1',
    '#C0EEE4',
    '#F8F988',
    '#FFCAC8',
    '#6E85B7',
  ];

  public static generateGradientBgStr(color: string): string {
    return `
          linear-gradient(to bottom right, ${color}, #bfe3f3)
        `;
  }

  public static getGenerateGradientStrings() {
    return ColorHelper.colorPalette.map((item) => {
      return ColorHelper.generateGradientBgStr(item);
    });
  }

  // #ref: https://stackoverflow.com/a/16348977/7444509
  public static stringToHexColor(str: string)  {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }
}