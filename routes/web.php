<?php

use App\Http\Controllers\AnswerController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\QuestionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/',[ LessonController::class,'index'])->name('home');
Route::post('/saveSection',[ SectionController::class,'store']);
Route::post('/saveLesson',[ LessonController::class,'store']);

Route::put('/updateSectionPosition',[ SectionController::class,'updatePosition']);
Route::put('/updateLessonPosition',[ LessonController::class,'updatePosition']);

// Route::delete('/sections/destroy/{id}',[ SectionController::class,'destroy']);

// Route::delete('/deleteSection/{id}',[ SectionController::class,'delete'])   ;
// Route::get('/deleteLesson',[ LessonController::class,'delete']);
///////************************************************** */



Route::get('/quiz',[ AnswerController::class,'quiz'])->name('home2');
Route::post('/saveQuestion',[ QuestionController::class,'store']);

Route::post('/saveAnswer',[ AnswerController::class,'store']);

Route::put('/updateQuestionPosition',[ QuestionController::class,'updatePosition']);


