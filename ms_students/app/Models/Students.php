<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Students extends Model
{
    protected $table = "estudiantes";
    protected $primaryKey = "codigo";
}

class Activities extends Model
{
    protected $table = "actividades";
}

