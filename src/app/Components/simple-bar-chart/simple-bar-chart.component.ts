import { Component, OnInit, Input } from '@angular/core';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData,
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

/**
 * @param mainData => "Models data comes from parent component(Chartist-bar)."
 * @param txData => "To store transpose data."
 * @param newLabels => "To store all labels."
 * @param stickValues=> "to store all stickList values."
 * @param displayLabelAndValues => " To store both labels and values."
 * @param displayLabelValuesPercentage=>" Calculates sum of stickList values and display percentage."
 * @param labelsAndValue=>"It store all labels,StickList values and percentage and pass it to labels. "
 */
@Component({
  selector: 'simple-bar-chart',
  templateUrl: './simple-bar-chart.component.html',
  styleUrls: ['./simple-bar-chart.component.scss'],
})
export class SimpleBarChartComponent implements OnInit {
  //get data from parent to child compoenent.
  @Input() mainData: any;
  
  txData: Array<any> = new Array<any>();

  newLabels: Array<any> = new Array<any>();
  stickValues: Array<any> = new Array<any>();
  displayLabelAndValues: Array<any> = new Array<any>();
  displayLabelValuesPercentage: any;
  labelsAndValue: Array<any> = new Array<any>();
  constructor() {}

  ngOnInit(): void {

    //get all sticklist data.
    const AllStickListValue = this.mainData.map((key) =>
      key.stickList.map((x) => x.value)
    );

    this.transpose(AllStickListValue);

    //get Labels
    this.mainData.forEach((getLabel) => {
      this.newLabels.push(getLabel.label);
      {
        console.log(getLabel.label, 'labels');
      }
    });

    //get StickValues
    this.mainData.forEach((getLabel) => {
      getLabel.stickList.forEach((getValue) => {
        this.stickValues.push(getValue.value);
        {
          console.log(getValue.value, 'values');
        }
      });
    });

    //get both labels and values.
    this.mainData.forEach((getLabel) => {
      getLabel.stickList.forEach((getValue) => {
        this.displayLabelAndValues.push({
          label: getLabel.label,
          data: getValue.value,
        });
      });
    });

    //To calculate percentage and show all labels,sticklist value.
    for (let i = 0; i < this.mainData.length; i++) {
      let sumOfStickValue = 0;
      for (let j = 0; j < this.stickValues.length; j++) {
        sumOfStickValue = sumOfStickValue + this.stickValues[j];
      }
      let percentage = ((this.stickValues[i] / sumOfStickValue) * 100).toFixed(2);

        if(this.newLabels[i] !== null || this.newLabels[i] !== undefined){
            this.displayLabelValuesPercentage =
            this.newLabels[i] + '\n' + this.stickValues[i] +'('+percentage+'%) ';
            this.labelsAndValue[i] = this.displayLabelValuesPercentage;
        }
    }
  }

  //To transpose stickList value and store in one array.
  transpose(data): any {
    const width = data.length || 0;
    const height = data[0] instanceof Array ? data[0].length : 0;
    if (height === 0 || height === 0) {
      return [];
    }
    let i: number;
    let j: number;
    for (i = 0; i < height; i++) {
      this.txData[i] = [];
      for (j = 0; j < width; j++) {
        this.txData[i][j] = data[j][i];
      }
    }
    return this.txData;
  }

  //To convert it into a graph.
  type: ChartType = 'Bar';

  data: IChartistData = {
    labels: this.labelsAndValue,
    series: this.txData,
  };

  options: IBarChartOptions = {
    axisX: {
      showGrid: false,
    },
    axisY: {
      showLabel: false,
      showGrid: false,
    },
    height: 300,
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
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
