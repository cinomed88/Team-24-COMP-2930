$(document).ready(function() {

    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;

    // Create connection to database
    var config =
    {
        authentication: {
            options: {
                userName: 'kobebryant', 
                password: '123Cats$' 
            },
            type: 'default'
        },
        server: 'gotnextdb.database.windows.net',
        options:
        {
            database: 'GotNextDB',
            encrypt: true
        }
    }

    var connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function(err)
        {
            if (err)
            {
                console.log(err)
            }
            else
            {
                // queryDatabase();
                dataload();
                console.log('--------------succeess--------------------');
            }
        }
    );

    function dataload(){
        $.ajax({
            url: "/ajax-GET-Name",
            dataType: "json",
            type: "GET",
            success: function(data) {
                $("#p1").text(data['msg']);
                console.log("SUCCESS:", data);
    
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $("#p1").text(jqXHR.statusText);
                console.log("ERROR:", jqXHR, textStatus, errorThrown);
            }
    
        });
    }




    function queryDatabase()
    {
        
        console.log('Reading rows from the Table...');

        // Read all rows from table
        var request = new Request(
            //"SELECT * FROM users",
            "SELECT user_name FROM users WHERE user_id = 2",
            function(err, rowCount, rows)
            {
                console.log(rowCount + ' row(s) returned');
                process.exit();
            }

            );

        request.on('row', function(columns) {
            columns.forEach(function(column) {
                var userName = column.value;
                //$("#abc").html("<b>" + userName + "</b>");
                //document.getElementById("user_name").innerHTML = userName;
                console.log("%s", userName);
                //console.log("%s\t%s", column.metadata.colName, userName);
                console.log("-----");
            });
        });
        connection.execSql(request);
    }

}