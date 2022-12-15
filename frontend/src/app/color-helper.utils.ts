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
}