let dailyStats;
let chartoptions = {
    plugins: {
        legend: {
            onHover: function(event, legendItem) {
                document.getElementById("chart").style.cursor = 'pointer';
            },
            onLeave: function(event, legendItem){
                document.getElementById("chart").style.cursor = 'default';
            },
            onClick: function(e, legendItem) {
                // simplification of a function from this codepen:
                // https://codepen.io/jordanwillis/pen/BWKKKo
                var index = legendItem.datasetIndex;
                var chart = this.chart;
                chart.data.datasets.forEach(function(e, i) {
                    var meta = chart.getDatasetMeta(i);
                    if (i !== index) {
                        meta.hidden = true;
                    }
                    else if (i === index) {
                        meta.hidden = null;
                    }
                });
                chart.update();
            },
        },
    }
}
const setupGraph = function(dailyStatsData){
    if(dailyStats == null){
        dailyStats = dailyStatsData;
    }
    let labels = [];
    let waterData = [];
    let caloriesBurntData = [];
    let caloriesNetData = [];
    let stepsData = [];
    dailyStats.forEach(obj => {
        labels.push(obj.date);
        // water
        waterData.push((obj.waterConsumed == null) ? 0: obj.waterConsumed);
        // burnt calories
        let totalBurnt = 0;
        if(obj.dailyActivities){
            obj.dailyActivities.forEach(activity => {
                if(activity.caloriesBurnt){
                    totalBurnt += activity.caloriesBurnt;
                }
            });
        }
        caloriesBurntData.push(totalBurnt);
        // net calories
        caloriesNetData.push((obj.caloriesConsumed == null) ? 0: obj.caloriesConsumed - totalBurnt);
        // steps
        stepsData.push((obj.stepsTaken == null) ? 0: obj.stepsTaken);
    });
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Water',
                data: waterData,
                borderColor: '#00ffff',
                backgroundColor: '#00ffff',
                tension: 0.1
            },
            {
                label: 'Calories Burnt',
                data: caloriesBurntData,
                borderColor: '#ff575e',
                backgroundColor: '#ff575e',
                tension: 0.1,
            },
            {
                label: 'Net Calories',
                data: caloriesNetData,
                borderColor: '#ff9812',
                backgroundColor: '#ff9812',
                tension: 0.1,
            },
            {
                label: 'Steps',
                data: stepsData,
                borderColor: '#349c00',
                backgroundColor: '#349c00',
                tension: 0.1
            }
        ]
    }
    const config = {
        type: 'line',
        data,
        options: chartoptions
    };
    var chart = new Chart($('#chart'), config);
    chart.data.datasets.forEach((dataSet, i) => {
        var meta = chart.getDatasetMeta(i);
        if(meta.label == 'Water'){
            meta.hidden = null;
        }
        else{
            meta.hidden = true;
        }
    });
    chart.update();
}

const showGraph = function(){
    if(dailyStats == null){
        console.log("only here once");
        let statsDeferral = $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: `${window.location.pathname}/data`,
            method: 'get',
            dataType: 'json',
        });
        statsDeferral.done(setupGraph);
    }
    $('#chart-div').show();
    $('#chart').show();
}

$(document).ready(function(){
    let chart = $('#chart');
    chart.hide();
    $('#chart-div').hide();
    let logDiv = $('#log-div');
    $('#graph-button').click(function(){
        if(chart.is(":hidden")){
            logDiv.hide();
            showGraph();
        }
        else {
            chart.hide();
            $('#chart-div').hide();
            logDiv.show();
        }
    });
});
