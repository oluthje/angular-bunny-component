import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import Button from "antd/es/button";
import { Transactions } from "@bunnyapp/transactions-component";
import * as React from "react";
import * as ReactDOMClient from "react-dom/client";

import * as ReactDOM from "react-dom";

const containerElementName = "myReactComponentContainer";

@Component({
  selector: "app-my-component",
  template: `<span #${containerElementName}></span>`,
  //   styleUrls: ["./MyReactComponent.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MyComponentWrapperComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  @ViewChild(containerElementName, { static: false }) containerRef!: ElementRef;

  @Input() public counter = 10;
  @Output() public componentClick = new EventEmitter<void>();

  constructor() {
    this.handleDivClicked = this.handleDivClicked.bind(this);
  }

  public handleDivClicked() {
    if (this.componentClick) {
      this.componentClick.emit();
      this.render();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    const root = ReactDOMClient.createRoot(this.containerRef.nativeElement);
    root.render(
      <div
        style={{
          maxHeight: "100vh",
          overflowY: "auto",
          width: "50vw",
        }}
      >
        <Transactions
          token="eyJraWQiOiJNbTg5Nlh0eC16M3RoSVBqQmt1SFExbGxISUYxZGlmbzgwWHdyTElrMGk4IiwiYWxnIjoiSFM1MTIifQ.eyJpc3MiOiJDbGllbnQiLCJpYXQiOjE3MzM1MDUxNzEsImp0aSI6IjFkNTU5NTViLTU5NjAtNDAwZi05Mzg1LTI0OGVlMzVmMTg3NyIsImNsaWVudF9pZCI6Ik1tODk2WHR4LXozdGhJUGpCa3VIUTFsbEhJRjFkaWZvODBYd3JMSWswaTgiLCJhdWQiOiJodHRwczovL2J1bm55LmludGVybmFsIiwiZXhwIjoxNzMzNTQxMTcxLCJzY29wZSI6ImFkbWluOnJlYWQgYWRtaW46d3JpdGUgYW5hbHl0aWNzOnJlYWQgYW5hbHl0aWNzOndyaXRlIGJpbGxpbmc6cmVhZCBiaWxsaW5nOndyaXRlIGRldmVsb3BlcjpyZWFkIGRldmVsb3Blcjp3cml0ZSBsZWdlbmRhcnk6cmVhZCBsZWdlbmRhcnk6d3JpdGUgb3BlbmlkIG93bmVyOnJlYWQgb3duZXI6d3JpdGUgcGxhdGZvcm06cmVhZCBwbGF0Zm9ybTp3cml0ZSBwb3J0YWw6cmVhZCBwb3J0YWw6d3JpdGUgcHJvZHVjdDpyZWFkIHByb2R1Y3Q6d3JpdGUgcXVvdGluZzpyZWFkIHF1b3Rpbmc6d3JpdGUgc2VjdXJpdHk6cmVhZCBzZWN1cml0eTp3cml0ZSBzdGFuZGFyZDpyZWFkIHN0YW5kYXJkOndyaXRlIHdvcmtmbG93OnJlYWQgd29ya2Zsb3c6d3JpdGUiLCJzdWIiOiJjNjEwZDkxYS1kMGQ1LTQ0MTItYmUxNi1kMzVkMjY1Zjk0YWQiLCJzdWJfdHlwZSI6IlVzZXIiLCJhY3Rvcl9kaXNwbGF5X2FzIjp7ImlkIjoxLCJ0eXBlIjoiQXBpQ2xpZW50In19._ilkFeDsxSyP8HqYQVN06rfejf55vk_kz6Xtga-KvWSD-anhG_mng-YwG5npAfNHxO9ZXjnC1xR3bjkL1A-2Og"
          apiEndpoint="https://bunny.bunny.internal"
          isMobile={false}
          useModal={true}
        />
        <div>Hello</div>
        <Button onClick={this.handleDivClicked}>Click me</Button>
      </div>
    );
  }
}
