<?php

class Users_sign
{
    private $conn;
    private $table = "users";

    public $name;
    public $email;
    public $password;
    // public $avatar;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function signUp()
    {
        $query = "INSERT INTO {$this->table} (name,email,password) VALUES (:name, :email, :password)";
        $stmt = $this->conn->prepare($query);

        $get_query = "SELECT id FROM {$this->table} WHERE LOWER(name) = LOWER(:name)";
        $get_stmt = $this->conn->prepare($get_query);
        $get_stmt->bindParam(":name", $this->name);
        $get_stmt->execute();

        if ($get_stmt->rowCount() > 0) {
            http_response_code(409); // Conflict
            return [
                "status" => "failed",
                "message" => "The name's already exists"
            ];
        }

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);

        if ($stmt->execute()) {
            http_response_code(201); // Created
            return [
                "status" => "success",
                "name" => $this->name,
                "email" => $this->email,
                "message" => "Account created successfully"
            ];
        }

        http_response_code(500); // Server error
        return [
            "status" => "failed",
            "message" => "Something went wrong on server"
        ];
    }


    public function signIn()
    {
        $query = "SELECT name,password FROM {$this->table} WHERE LOWER(name)=LOWER(:name)";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->password = htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(":name", $this->name);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $hash = $row["password"];

            if (password_verify($this->password, $hash)) {
                http_response_code(200); // OK
                return [
                    "status" => "success",
                    "message" => "Sign In success"
                ];
            } else {
                http_response_code(401); // Unauthorized
                return [
                    "status" => "failed",
                    "message" => "Password incorrect"
                ];
            }
        } else {
            http_response_code(404); // Not Found
            return [
                "status" => "failed",
                "message" => "Account not found"
            ];
        }
    }
}
