<?php

namespace App\Http\Controllers;

use App\Models\Activities;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $activity = Activities::all();
        $data = json_encode([
            "data" => $activity 
        ]);
        return response($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     public function store(Request $request)
     {
         $activity = new Activities();
         $activity->descripcion = $request->input('descripcion');
         $activity->nota = $request->input('nota');
         $activity->codigoEstudiante = $request->input('codigoEstudiante');
         $activity->save();
         return response(json_encode([
             "data" => "Actividad registrada"
         ]));
     } 

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show($codigo)
    {
        $activity = Activities::all();
        $activity = Activities::where('codigoEstudiante', $codigo)->get();
        return response(json_encode([
            "data" => $activity
        ]));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function update(Request $request, $id)
    {
        $activity = Activities::find($id);
        $activity->descripcion = $request->input('descripcion');
        $activity->nota = $request->input('nota');
        $activity->save();
        return response(json_encode([
            "data" => "Actividad actualizada"
        ]));
    }    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function destroy($id)
     {
         $activity = Activities::find($id);
         if (empty($activity)) {
             return response(json_encode([
                 "data" => "La actividad no existe"
             ]), 404);
         }
         $activity->delete();
         return response(json_encode([
             "data" => "Actividad eliminada"
         ]));
     } 
}
