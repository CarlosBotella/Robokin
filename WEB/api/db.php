<?php
    
    //-------------------------------------------------------------------------------------------------------
    //          db()
    //-------------------------------------------------------------------------------------------------------
    $mysql = new mysqli(
        "localhost",
        "root",
        "",
        "robokin2"
    );

    if($mysql->connect_error)
    {
        die("Failed to conection" . $mysql->connect_error);
    }