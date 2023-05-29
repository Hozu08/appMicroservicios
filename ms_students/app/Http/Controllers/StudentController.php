<?php

namespace App\Http\Controllers;

use App\Models\Students;
use App\Models\Activities;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = Students::all();
        $data = json_encode([
            "data" => $students
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
         $student = new Students();
         $student->codigo = $request->input('codigo');
         $student->nombres = $request->input('nombres');
         $student->apellidos = $request->input('apellidos');
         $student->save();
         return response(json_encode([
             "data" => "Estudiante registrado"
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
        $students = Students::find($codigo);
        return response(json_encode([
            "data" => $students
        ]));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
}
