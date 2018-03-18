import './history.html';

import { Template } from 'meteor/templating';
import { History } from '../../../../api/history/history.js';

import { Chart } from 'chart.js';

Template.history.onCreated(function() {
  this.getListId = () => FlowRouter.getParam('code');
  this.renderChart = () => this.chart.update(0);
  const instance = this;

  this.autorun(() => {
    this.subscribe('History.code', { code: this.getListId() });
  });
  History.find({ code: FlowRouter.getParam('code') }).observeChanges({
    changed(id, fields) {
      instance.renderChart(instance);
    },
  });
});

Template.history.onRendered(function() {
  this.autorun(() => {
    if (this.subscriptionsReady()) {
      var ctx = document.getElementById('historyChart').getContext('2d');
      this.chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: History.findOne({ code: FlowRouter.getParam('code') })
            .dollarValues,
          datasets: [
            {
              label: 'Historique des taux',
              backgroundColor: 'rgb(84, 173, 200)',
              borderColor: 'rgb(70, 130, 150)',
              data: History.findOne({ code: FlowRouter.getParam('code') })
                .dollarValues,
              borderWidth: 3,
            },
          ],
        },

        // Configuration options go here
        options: {
          showXLabels: 10,
          responsive: true,
          events: [],
          showTooltips: true,
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                },
                ticks: {
                  // max: 10,
                  stepSize: 10,
                  autoSkip: true,
                  maxTicksLimit: 10,
                  fixedStepSize: 10,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  max: 10000,
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Taux ($)',
                },
              },
            ],
          },
        },
      });
      this.renderChart();
    }
  });
});
