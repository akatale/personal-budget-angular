// import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
import {pie, arc} from 'd3-shape';
import {select} from 'd3-selection';
import {scaleOrdinal} from 'd3-scale';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  // constructor(private http: HttpClient) { }
  constructor(public dataService: DataService) { }

  ngAfterViewInit(): void {
    // this.http.get('http://localhost:3000/budget')
    if(Object.entries(this.dataService.datamapp).length==0)
    {
    this.dataService.fetchData();
    }
    setTimeout(() => {
      this.createChart();
      this.created3();
    }, 1200);
  }

  // tslint:disable-next-line: typedef
  createChart() {
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataService.dataSource
    });
}
  created3()
  {
    var width = 700;
    var height = 700;
    var margin = 115;
    var radius = Math.min(width, height) / 2 - margin;

    var svg = d3.select('#d3chart')
          .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var color = scaleOrdinal()
          .domain([this.dataService.datalabels])
          .range(['#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          'green',
          'violet',
          'black',
          'brown',
          'pink',
          'gray']);

    var Pie = pie()
          .sort(null)
          .value(function(d) {return d.value; });
    var data_ready = Pie(d3.entries(this.dataService.datamapp));

    var aro = arc()
          .innerRadius(radius * 0.3)
          .outerRadius(radius * 0.8);

    var outerArc = arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);

    svg
          .selectAll('allSlices')
          .data(data_ready)
          .enter()
          .append('path')
          .attr('d', aro)
          .attr('fill', function(d){ return(color(d.data.key)); })
          .attr('stroke', 'white')
          .style('stroke-width', '2px')
          .style('opacity', 0.7);

    svg
          .selectAll('allPolylines')
          .data(data_ready)
          .enter()
          .append('polyline')
            .attr('stroke', 'black')
            .style('fill', 'none')
            .attr('stroke-width', 1)
            .attr('points', function(d) {
              var posA = aro.centroid(d);
              var posB = outerArc.centroid(d);
              var posC = outerArc.centroid(d);
              var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
              posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
              return [posA, posB, posC];
            });

    svg
          .selectAll('allLabels')
          .data(data_ready)
          .enter()
          .append('text')
            .text( function(d) { console.log(d.data.key) ; return d.data.key; } )
            .attr('transform', function(d) {
                var pos = outerArc.centroid(d);
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', function(d) {
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return (midangle < Math.PI ? 'start' : 'end');
            });
  }
}


