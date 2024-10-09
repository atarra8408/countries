import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>;
  private debouncesSuscription?: Subscription;

  @Input()
  public placeHolder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncesSuscription = this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value =>{
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debouncesSuscription?.unsubscribe();
  }
  emitValue(value: string):void{
    this.onValue.emit(value)
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm);
  }
}
