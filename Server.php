<?php

@session_start();
if (!isset($_SESSION["tableRows"])) $_SESSION["tableRows"] = array();
date_default_timezone_set($_POST["timeZone"]);
$x = $_POST["x"];
$y = $_POST["y"];
$r = $_POST["r"];
if (checkData($x, $y, $r)) {
    $coordsStatus = checkCoordinates($x, $y, $r);
    $currentTime = date("H: i: s");
    $benchmarkTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
    array_push($_SESSION["tableRows"], "<tr>
<td>$x</td>
<td>$y</td>
<td>$r</td>
<td>$coordsStatus</td>
<td>$currentTime</td>
<td>$benchmarkTime</td>
</tr>");
    echo "<table id ='outputTable'>
<tr>
<th>x</th>
<th>y</th>
<th>r</th>
<th>Точка входит в ОДЗ</th>
<th>Текущее время</th>
<th>Время работы скрипта</th>
</tr>";
    foreach ($_SESSION["tableRows"] as $tableRow) echo $tableRow;
    echo "</table>";
}else{
    http_response_code(400);
    return;
}

function checkData($x, $y, $r) {
    return in_array($x, array(-4, -3, -2, -1, 0, 1, 2, 3, 4)) &&
        is_numeric($y) && ($y >= -3 && $y <= 5) &&
        is_numeric($r) && ($r >= 1 && $r <= 4);
}

function checkCoordinates($x, $y, $r) {
    if (((pow($x,2)+pow($y,2)<=(pow($r,2))) && ($x<0) && ($y<=0))||
        (((-$x/2+$r/2) <=$y) && ($x>=0) && ($x<=$r/2) && ($y<=0) && ($y<=$r/2)) ||
        (($x>=0) && ($x<=$r) && ($y>=0) && ($y<=$r/2))) return "да";
    else return "нет";
}


