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
  private root: ReactDOMClient.Root | null = null;

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
    if (this.root) {
      this.root.unmount();
    }
  }

  private render() {
    if (!this.root) {
      this.root = ReactDOMClient.createRoot(this.containerRef.nativeElement);
    }
    this.root.render(
      <div
        style={{
          maxHeight: "100vh",
          overflowY: "auto",
          width: "50vw",
        }}
      >
        <Transactions
          token="eyJraWQiOiJiMnhhdnVLQ3VsNEV3WU1sYkY1RTRkc09URVZWTzRZNGt2TER5TnNBQTRnIiwiYWxnIjoiSFM1MTIifQ.eyJpc3MiOiJjbGllbnQiLCJpYXQiOjE3MzY1MjM0ODcsImp0aSI6IjNmMzRhOWI5LWU5YTAtNGI2Yi04OTJlLWM1MmFiZjQ1YjgzZCIsImNsaWVudF9pZCI6ImIyeGF2dUtDdWw0RXdZTWxiRjVFNGRzT1RFVlZPNFk0a3ZMRHlOc0FBNGciLCJhdWQiOiJodHRwczovL2J1bm55LmludGVybmFsIiwiZXhwIjoxNzQwMTIzNDg3LCJzY29wZSI6ImFkbWluOnJlYWQgYWRtaW46d3JpdGUgYW5hbHl0aWNzOnJlYWQgYW5hbHl0aWNzOndyaXRlIGJpbGxpbmc6cmVhZCBiaWxsaW5nOndyaXRlIGRldmVsb3BlcjpyZWFkIGRldmVsb3Blcjp3cml0ZSBsZWdlbmRhcnk6cmVhZCBsZWdlbmRhcnk6d3JpdGUgb3BlbmlkIG93bmVyOnJlYWQgb3duZXI6d3JpdGUgcGxhdGZvcm06cmVhZCBwbGF0Zm9ybTp3cml0ZSBwb3J0YWw6cmVhZCBwb3J0YWw6d3JpdGUgcHJvZHVjdDpyZWFkIHByb2R1Y3Q6d3JpdGUgcXVvdGluZzpyZWFkIHF1b3Rpbmc6d3JpdGUgc2VjdXJpdHk6cmVhZCBzZWN1cml0eTp3cml0ZSBzdGFuZGFyZDpyZWFkIHN0YW5kYXJkOndyaXRlIHdvcmtmbG93OnJlYWQgd29ya2Zsb3c6d3JpdGUiLCJzdWIiOiJjNjEwZDkxYS1kMGQ1LTQ0MTItYmUxNi1kMzVkMjY1Zjk0YWQiLCJzdWJfdHlwZSI6IlVzZXIiLCJhY3Rvcl9kaXNwbGF5X2FzIjp7ImlkIjoxLCJ0eXBlIjoiQXBpQ2xpZW50In19.g9Nla0QqYhvSLbk5aCduVbw3zVN-jWUme-DEPClEjHYvaw_souPVZpgsLfqmsEkr4SvDLm9CqDgOJdo3rDke8A"
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
