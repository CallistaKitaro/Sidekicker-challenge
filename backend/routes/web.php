<?php

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
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    
    // View job postings
    $router->get('jobs',  ['uses' => 'JobController@allJobs']);

    $router->get('job/{id}', ['uses' => 'JobController@singleJob']);
    
    // Create new job post
    $router->post('job', ['uses' => 'JobController@createJob']);
    
    // Remove job post
    $router->delete('job/{id}', ['uses' => 'JobController@deleteJob']);
});
