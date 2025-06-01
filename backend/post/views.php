<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST,GET,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
// Include koneksi database dan class user
require_once "../config.php";
require_once "users.php";

// Cek GET request
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $db = (new Database())->connect();
    $users = new Users($db);
    echo json_encode($users->read());
};

// Cek POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $db = (new Database())->connect();
    $users = new Users($db);
    $users->name = $data["name"];
    $users->comment = $data["comment"];

    echo json_encode($users->create());
}

// CEK UPDATE request
if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);
    $db = (new Database())->connect();
    $users = new Users($db);

    $users->id = $data["id"];
    $users->comment = $data["comment"];

    echo json_encode($users->update());
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);

    $db = (new Database())->connect();
    $users = new Users($db);

    $users->id = $data["id"];

    echo json_encode($users->delete());
}
