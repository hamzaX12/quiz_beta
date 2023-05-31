<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class answer extends Model
{
    use HasFactory;
    // protected $fillable = [
    //     'answer', 
    //     'correct',
    //     'question_id',
    // ];
    protected $fillable = [
        'name', 
        'correct',
        'question_id',
    ];

    public function question(){
        return $this->belongsTo(question::class);
    }


}
