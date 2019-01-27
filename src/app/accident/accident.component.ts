import { ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/services/server.service';
import { Component, OnInit } from '@angular/core';
import { EventDTO } from '../models/event.model';

@Component({
  selector: 'app-accident',
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent implements OnInit {

  private accident: EventDTO;
  private id: number

  constructor(private route: ActivatedRoute,
    private serverService: ServerService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.serverService.getAccident(this.id).subscribe(result => {
      this.accident = result;
    });
  }

}
