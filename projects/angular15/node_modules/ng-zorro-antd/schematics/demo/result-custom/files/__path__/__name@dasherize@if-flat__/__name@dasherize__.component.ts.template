import { Component } from '@angular/core';

@Component({
  selector: '<%= selector %>',
  <% if(inlineTemplate) { %>template: `
    <nz-result [nzIcon]="'smile-twotone'" [nzTitle]="'Great, we have done all the operators!'">
      <div nz-result-extra>
        <button nz-button nzType="primary">Next</button>
      </div>
    </nz-result>
  `<% } else { %>templateUrl: './<%= dasherize(name) %>.component.html'<% } %>
})
export class <%= classify(name) %>Component {}
