<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\QuestionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::delete('/sections/destroy/{id}',[ SectionController::class,'destroy']);

Route::put('/sections/{section}',[SectionController::class,'update']);
Route::put('/lessons/{lesson}',[LessonController::class,'update']);


Route::delete('/lessons/destroy/{id}',[LessonController::class,'destroy']);

// Route::delete('/lessons/destroy/{id}',[LessonController::class,'destroy']);
Route::put('/answers/{id}',[AnswerController::class,'update']);
Route::put('/questions/{id}',[QuestionController::class,'update']);
Route::delete('/question/destroy/{id}',[ QuestionController::class,'destroy']);
Route::put('/answer/destroy/{id}',[AnswerController::class,'destroy']);

