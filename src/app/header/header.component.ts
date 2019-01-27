import { flatMap } from 'rxjs/operators';
import { interval } from 'rxjs';
import { ServerService } from './../../services/server.service';
import { EventDTO } from './../models/event.model';
import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  private notificationsCount: number = 0;
  private isVisibleBadge: boolean = true;

  private sub;

  private events: EventDTO[] = [];

  constructor(private serverService: ServerService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.notificationsCount = 0;
    this.setVisibleNotificationBadge();

    this.initTimer();
  }

  initTimer() {
    interval(2000)
    .pipe(
        flatMap(() => this.serverService.getAllUnreadEvents())
    )
    .subscribe((result) => {
      for (let e of result) {
        this.events.push(e);
      }

      this.notificationsCount += result.length;
      this.setVisibleNotificationBadge();
    });
  }

  onMenuClosed() {
    this.notificationsCount = 0;
    this.setVisibleNotificationBadge();
    this.events = [];
  }

  setVisibleNotificationBadge() {
    if (this.notificationsCount == 0 || this.notificationsCount == null || this.notificationsCount == undefined) {
      this.isVisibleBadge = false;
    } else {
      this.isVisibleBadge = true;
    }
  }

  onEventClick(event: EventDTO) {
    this.router.navigate(['/accidents/' + event.id], {relativeTo:this.activatedRoute});
  }
}