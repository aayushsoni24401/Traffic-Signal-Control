<?php
require 'dbconn.php';

$sequence = $_POST['sequence'];
$greenInterval = $_POST['greenInterval'];
$yellowInterval = $_POST['yellowInterval'];

$signals = explode(',', $sequence);

//Insert signals into database
$stmt = $conn->prepare("insert into signals (name, sequence) values (?, ?)");
if($stmt === false){
    die("Prepare Failed: " . $conn->error);
}

foreach ($signals as $index => $signal) {
    $name = trim($signal);
    $seq = $index + 1;
    $stmt->bind_param("si", $name, $seq);
    if(!$stmt->execute())
    {
        die("Execute Failed: " . $stmt->error);
    }
}

$stmt->close();


//Insert configurations into database
$stmt = $conn->prepare("insert into configuration (green_interval, yellow_interval) values (?, ?)");
if($stmt === false){
    die("Prepare Failed: " . $conn->error);
}

$stmt->bind_param("ii", $greenInterval, $yellowInterval);

if(!$stmt->execute())
{
    die("Execute Failed: " . $stmt->error);
}

$stmt->close();

echo "Signals are running with sequence: $sequence, Green Interval: $greenInterval seconds, Yellow Interval: $yellowInterval seconds";
$conn->close();
?>