<?php

namespace App\Http\Controllers;

use App\Models\question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    

    public function store(Request $request)
    {
        $sectionName = $request->input('sectionName');
        $position = $request->input('position');
        // Create a new section
        $question = new question();
        $question->name = $sectionName;
        $question->position=$position;
        $question->save();
        // Return the generated section ID
        return response()->json(['sectionId' => $question->id]);
    }

    public function update(Request $request, question $question)
    {
        $question->name = $request->input('name');
        $question->save();
        return response()->json(['message' => 'question updated successfully']);
    }



    public function updatePosition(Request $request)
    {
            $questionPositions = $request->all();
            // Loop through the received sectionPositions
            foreach ($questionPositions as $sectionPosition) {
                $question = question::findOrFail($sectionPosition['sectionId']);
                $question->position = $sectionPosition['position'];
                $question->save();
            }
            return response()->json(['message' => 'question positions updated successfully']);
    }

    public function destroy($id)
{
    // $sectionId = $request->route('id'); 
    // Find the section to be deleted
    $question = question::findOrFail($id);
    // Delete the section
    $question->delete();
    // Return a JSON response indicating success
    return response()->json(['sectionId' => 'hi']);
}
    

}
