export default class Utils {
  static stringCutter(string: string, to: number): string {
    return string.length >= 25 ? string.substring(0, 25) + '...' : string;
  }
  static splitter(date: string): string {
    let dateString: string;
    let data = date.split('T');
    dateString =
      data[1].split(':')[0] + ':' + data[1].split(':')[1] + ', ' + data[0];
    return dateString;
  }
}
