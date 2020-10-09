import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public datamapp = new Object();
  public datalabels = [];
  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
              '#ffcd56',
              '#ff6384',
              '#36a2eb',
              '#fd6b19',
              'green',
              'violet',
              'black',
              'brown',
              'pink',
              'gray',
            ]
        }
    ],
    labels: []
};

  constructor(private http: HttpClient) {

  }
  public fetchData()
  {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.datalabels[i] = res.myBudget[i].title;
        this.datamapp[res.myBudget[i].title] = res.myBudget[i].budget;
    }
    });
  }
}
