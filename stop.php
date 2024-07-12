<?php
require 'dbconn.php';

$conn->query("truncate table signals");
$conn->query("truncate table configuration");

echo "Signal Stopped!";

$conn->close();
?>