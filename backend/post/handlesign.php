<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once("../config.php");
require("signup.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mode = $_GET["mode"] ?? "";
    $data = json_decode(file_get_contents("php://input"), true);

    if ($mode == "signup") {
        $db = (new Database())->connect();
        $users_sign = new Users_sign($db);

        $users_sign->name = $data["name"];
        $users_sign->email = $data["email"];
        $users_sign->password = password_hash($data["password"], PASSWORD_DEFAULT);

        echo json_encode($users_sign->signUp());
    }

    if ($mode == "signin") {
        $db = (new Database())->connect();
        $users_sign = new Users_sign($db);

        $users_sign->name = $data["name"];
        $users_sign->password = $data["password"];

        echo json_encode($users_sign->signIn());
    }
}
