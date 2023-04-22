import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceStr'
})
export class ReplaceStrPipe implements PipeTransform {

  transform(str: any): string{
    let newStr = str.toString().replace(new RegExp(/_\d+/), '');
    return newStr;
  }

}
