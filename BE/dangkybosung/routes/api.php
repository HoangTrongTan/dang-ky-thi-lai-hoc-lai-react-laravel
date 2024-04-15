<?php

use App\Customer;
use App\Http\Controllers\AcountController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\HocController;
use App\Http\Controllers\HoSoController;
use App\Http\Controllers\ThiController;
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
Route::apiResource('/customer' , CustomerController::class);
Route::apiResource('/acount' , AcountController::class);
Route::apiResource('/thi' , ThiController::class);
Route::apiResource('/hoc' , HocController::class);
Route::apiResource('/upload' , FileController::class);
Route::apiResource('/hoso' , HoSoController::class);