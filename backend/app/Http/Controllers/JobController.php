<?php

namespace App\Http\Controllers;

use App\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    
    public function allJobs()
    {
        return response()->json(Job::all());
    }

    public function singleJob($id)
    {
        return response()->json(Job::find($id));
    }

    public function createJob(Request $request)
    {
        $newJob = Job::create($request->all());

        return response()->json($newJob,201);
    }

    public function deleteJob($id)
    {
        Job::findOrFail($id)->delete();
        
        return response('Job Deleted Successfully', 200);
    }

}
