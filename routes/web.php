<?php

use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\IncomeController;
use App\Http\Controllers\Admin\IngredientController;
use App\Http\Controllers\Admin\OutcomeController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StoreController;
use App\Http\Controllers\Admin\UnitController;
use App\Http\Controllers\Admin\WalletController;
use Illuminate\Support\Facades\Route;

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


Route::controller(DashboardController::class)->group(function () {
    Route::get('/admin/dashboard', 'index');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/admin/product', 'index')->name('admin.product.index');
    Route::post('/admin/product', 'store');
    Route::put('/admin/product/', 'update');
    Route::delete('/admin/product/', 'destroy');
    Route::delete('/admin/product_variant/', 'destroyVariant');
});

Route::controller(OutcomeController::class)->group(function () {
    Route::get('/admin/outcome/buy', 'index')->name('admin.outcome.index.buy');
    Route::get('/admin/outcome/social', 'index')->name('admin.outcome.index.social');
    Route::post('/admin/outcome', 'store');
    Route::put('/admin/outcome/', 'update');
    Route::delete('/admin/outcome/', 'destroy');
});

Route::controller(IncomeController::class)->group(function () {
    Route::get('/admin/income', 'index');
    Route::post('/admin/income', 'store');
    Route::put('/admin/income/', 'update');
    Route::delete('/admin/income/', 'destroy');
});

Route::controller(StoreController::class)->group(function () {
    Route::get('/admin/store', 'index');
    Route::post('/admin/store', 'store');
    Route::put('/admin/store/', 'update');
    Route::delete('/admin/store/', 'destroy');
});

Route::controller(IngredientController::class)->group(function () {
    Route::get('/admin/ingredient', 'index');
    Route::post('/admin/ingredient', 'store');
    Route::put('/admin/ingredient/', 'update');
    Route::delete('/admin/ingredient/', 'destroy');
});

Route::controller(CustomerController::class)->group(function () {
    Route::get('/admin/customer', 'index');
    Route::post('/admin/customer', 'store');
    Route::put('/admin/customer/', 'update');
    Route::delete('/admin/customer/', 'destroy');
});

Route::controller(SettingController::class)->group(function () {
    Route::get('/admin/setting', 'index');
});

Route::controller(WalletController::class)->group(function () {
    Route::post('/admin/wallet', 'store');
});

Route::controller(UnitController::class)->group(function () {
    Route::post('/admin/unit', 'store');
    Route::delete('/admin/unit/', 'destroy');
});


// Route::post('/admin/income', function () {
//     return 'halo';
// });
