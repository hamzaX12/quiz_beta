<?php

namespace App\Http\Controllers;

use App\Models\answer;
use App\Models\question;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function quiz()
    {
        $answers = answer::get()->groupBy('section_id');
        $questions = question::orderBy('position')->get();
        return view('quiz', compact('answers','questions'));
    }
    
    public function store(Request $request)
    {
        $lessonName = $request->input('lessonName');
        $sectionId = $request->input('sectionId');
        $position = $request->input('position');
        // $correct=$request->input('correct') ? 1 : 0 ;
        // Create a new lesson
        $answer = new answer();
        $answer->name = $lessonName;
        // $answer->question()->associate($sectionId); // Assuming the relationship is defined in the Answer model
        $answer->question_id = $sectionId; // Assuming the column name in the lessons table is 'section_id'
        $answer->position=$position;
        $answer->correct=0;
        $answer->save();
        // Return a success response
        return response()->json(['lessonId' => $answer->id]);
    }

    public function update(Request $request, answer $answer)
    {
        $answer->name = $request->input('name');    
        $answer->correct = $request->input('correct') ? 1 : 0 ;                             
        $answer->save();
        return response()->json(['message' => 'answer updated successfully']);
    }


    public function updatePosition(Request $request)
    {
        $answerPositions = $request->all();
        // return response()->json(['message' => $lessonPositions[0]['lessonId']]);
        
        // Loop through the received lessonPositions
        
        foreach ($answerPositions as $answerPosition) {
            $answer = answer::findOrFail($answerPosition['lessonId']);
            // dd($lesson->id);

            $answer->position = $answerPosition['position'];
            $answer->section_id = $answerPosition['sectionId'];
            $answer->save();
        }

        return response()->json(['message' => 'answer positions updated hssd successfully']);
  
    }


    public function destroy($id){
        $answer=answer::findOrFail($id);
        $answer->delete();
        return response()->json(['message' => 'answer deleted successfully']);
    }




}
