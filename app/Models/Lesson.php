<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Section;
class Lesson extends Model
{
    use HasFactory;


    public function section(){
        return $this->belongsTo(Section::class);
    }
}
