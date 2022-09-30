import { Component, OnInit } from '@angular/core';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  scroll$ = fromEvent(document, 'scroll');
  protected onDestroy$ = new Subject<void>();

  ngOnInit(): void {

    const progressBarElement = document.querySelector(".progress-bar") as HTMLElement;

    const progress$ = this.scroll$.pipe
    (map((event: Event) => this.calcScrollPercent((event.target as Document).documentElement)))

    progress$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(percent => { progressBarElement.style.width = `${percent}%` })

  }

  calcScrollPercent(element: HTMLElement) {
    const { scrollTop, scrollHeight, clientHeight } = element;
    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }


}
