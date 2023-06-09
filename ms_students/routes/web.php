<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    echo '<h1>Hola mundo!!!</h1>';
    return $router->app->version();
});

//End points de estudiantes

$router->get('estudiantes', 'StudentController@index');
$router->get('estudiante/{codigo}', 'StudentController@show');
$router->post('estudiante', 'StudentController@store');
$router->put('estudiante/{codigo}', 'StudentController@update');
$router->delete('estudiante/{codigo}', 'StudentController@destroy');  

//End points de actividades

$router->get('actividades', 'ActivityController@index');
$router->get('actividad/{codigo}', 'ActivityController@show');
$router->post('actividad', 'ActivityController@store');
$router->put('actividad/{id}', 'ActivityController@update');
$router->delete('actividad/{id}', 'ActivityController@destroy');  


