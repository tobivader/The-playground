 google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawingVisualization);

        var options = {
            'title': 'Distribution of Host Build with Waterflow Death in Phase 1 and 2',
            'width': 900,
            'height': 400,
            'colors': ['#e0440e', '#e6693e', '#f3b400', '#33b679', '#0288d1'], // Added more colors to accommodate potential multiple Host_Build values
            'legend': 'bottom'
        };

        function drawingVisualization() {
            var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1BPp_atEq1RNzbnFtXv-0cFUYrg95GP6N1QQfQKnKmGI/edit#gid=707543460');
            // Adjusted the query to consider Host_Build column
            query.setQuery("SELECT B, COUNT(B) WHERE E = TRUE AND (D = 1 OR D = 2) GROUP BY B");
            
            query.send(handleQueryResponse);
        }

        function handleQueryResponse(response) {
            if (response.isError()) {
                alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                return;
            }

            var data = response.getDataTable();
            var visualization = new google.visualization.PieChart(document.getElementById('chart_div'));
            visualization.draw(data, options);
        }