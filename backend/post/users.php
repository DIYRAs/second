<?php
class Users
{
    private $conn;
    private $table = "post";

    public $id;
    public $name;
    public $comment;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = "SELECT id,name, comment FROM {$this->table} ORDER BY id ASC";
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $comments;
        }
    }

    public function create()
    {
        $query = "INSERT INTO {$this->table} (name, comment) VALUES (:name, :comment)";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->comment = htmlspecialchars(strip_tags($this->comment));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":comment", $this->comment);

        if ($stmt->execute()) {
            return [
                "status create" => "Success",
                "id" => $this->id,
                "name" => $this->name,
                "comment" => $this->comment,
                "message" => "Post Success"
            ];
        }
        return false;
    }

    public function update()
    {
        $query = "UPDATE {$this->table} SET comment=:comment WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $this->comment = htmlspecialchars(strip_tags($this->comment));
        $stmt->bindParam(":comment", $this->comment);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return [
                "status edit" => "Success",
                "id" => $this->id,
                "name" => $this->name,
                "comment" => $this->comment,
                "message" => "Edit Success"
            ];
        }
        return false;
    }

    public function delete()
    {
        $query = "DELETE FROM {$this->table} WHERE id=:id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return [
                "status delete" => "Success",
                "message" => "Delete Success"
            ];
        }
        return false;
    }
}
