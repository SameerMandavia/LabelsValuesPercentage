import { Component, OnInit, Input } from '@angular/core';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData,
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

@Component({
  selector: 'app-chartist-bar',
  templateUrl: './chartist-bar.component.html',
  styleUrls: ['./chartist-bar.component.css'],
})
export class ChartistBarComponent implements OnInit {
  customData: Array<any> = new Array<any>();
  newArray: Array<any> = new Array<any>();
  mainData: Array<any>;
  //name = "sameer";

  constructor() {
    this.mainData = [
      {
        label: 'Positive',
        stickList: [
          {
            value: 15,
            color: 'green',
          },
        ],
      },
      {
        label: 'Neutral',
        stickList: [
          {
            value: 10,
            color: 'grey',
          },
        ],
      },
      {
        label: 'Negative',
        stickList: [
          {
            value: 9,
            color: 'red',
          },
        ],
      },
      
    ];
  }

  ngOnInit(): void {
    console.log(this.mainData, 'maindata');

    //get all Values
    const AllStickValues = this.mainData.map((key) =>
      key.stickList.map((x) => x.value)
    );
    console.log(AllStickValues);

    //get all colors
    const AllStickColors = this.mainData.map((key) =>
      key.stickList.map((c) => c.color)
    );
    console.log(AllStickColors);


    //To convert into a transpose (method 1 not working in series).
    this.newArray = [];
    AllStickValues[0].forEach((value, colindex) => {
      let row = [];
      AllStickValues.forEach((data) => {
        if (data[colindex]) {
          row.push(data[colindex]);
        }
      });
      this.newArray.push(row);
    });
    console.log(this.newArray, 'Updated');
  }


  //To create a bar.
  type: ChartType = 'Bar';

  data: IChartistData = {
    labels: ['Jan', 'Feb', 'Mar'],
    series: [
      // [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
      // [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4],
      // [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],

      [10, 10, 10],
      [22, 14, 14],
      [12, 15, 20],
      [18, 18, 18],
      [12, 15, 17],
    ],

    //series : [this.newArray]
  };

  options: IBarChartOptions = {
    axisX: {
      showGrid: false,
      //offset: 0
    },
    axisY: {
      //scaleMinSpace: 100
      // labelInterpolationFnc : (value)=>{(value)}
    },
    height: 300,
    //stackBars: true
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        // data.element.attr({
        //   style:'stroke : blue'
        // })

        // data.element.attr({
        //   style: 'stroke: hsl(' + Math.floor(Chartist.getMultiValue(data.value))*100 + ', 20%, 50%);'
        // })
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad',
          },
        });
      }
    },
  };
}
